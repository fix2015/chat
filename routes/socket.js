var userNames = (function () {
  var names = {};
  var locations = [];

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  // serialize claimed names as an array
  var getLocation = function () {
    var res = [];
    locations.forEach(function(location, key){
      res.push(location);
    })

    return res;
  };
  // set location for user
  var setLocation = function (data) {
    var flag = true;
    locations.forEach(function(location, key){
      if(location.user == data.name){
        flag=false;
      }
    })

    if(!flag){ return false; }
    locations.push({user: data.name, location: data.location});
    
    return locations;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName,
    getLocation: getLocation,
    setLocation: setLocation
  };
}());

module.exports = function (socket) {
  var name = userNames.getGuestName();
  var location =  {
      lat: '',
      lng: ''
    };

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get(),
    locations:  userNames.getLocation()
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.text
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('set:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);
      name = data.name;
      userNames.setLocation(data);
      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    userNames.free(name);
  });
};