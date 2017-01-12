/**
 * Created by User on 12.01.2017.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var socket = io.connect();
var Map = require('./component/map/Map.jsx')
var MessageList = require('./component/message/MessageList.jsx')
var MessageForm = require('./component/message/MessageForm.jsx')
var SetNameForm = require('./component/message/SetNameForm.jsx')

var ChatApp = React.createClass({

	getInitialState() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}

		return {users: [],
			messages:[],
			login:false,
			text: '',
			locations:[],
			mapCoordinates: {
				lat: 48.856614,
				lng: 2.3522219
			}};
	},

	showPosition(position) {
		this.setState({
			mapCoordinates: {
				lat: position.coords.latitude,
				lng:position.coords.longitude
			}})
	},

	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageRecieve);
		var userName = localStorage.getItem('userName');
		if(userName){
			this.handleSetName(userName);
		}
	},

	_initialize(data) {
		var {users, name, locations} = data;
		this.setState({users, user: name});
		this.setState({locations : locations});
	},

	_messageRecieve(message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	},

	handleMessageSubmit(message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
		socket.emit('send:message', message);
	},

	handleSetName(newName){
		var oldName = this.state.user;
		socket.emit('set:name', { name : newName, location: this.state.mapCoordinates}, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			var {users} = this.state;
			var index = users.indexOf(oldName);
			users.splice(index, 1, newName);

			this.setState({
				users,
				user: newName,
				login: true
			});
			localStorage.setItem('userName', newName);
			socket.emit('send:message', {text: 'Welcome new user ' + newName});
		});
	},

	render() {
		return (

			<div className="row ">
				<h3 class="text-center" >BOOTSTRAP CHAT EXAMPLE </h3>
				<br /><br />
				<div className={ !this.state.login ? 'col-md-8' :  'col-md-8 hidden' }>
					<SetNameForm onSetName={this.handleSetName}/>
				</div>
				<div className={ this.state.login ? 'col-md-8' :  'col-md-8 hidden' }>
					<div className="panel panel-info">
						<div className="panel-heading">
							 CHAT 
						</div>
						<div className="panel-body">
							<MessageList
								messages={this.state.messages}
							/>
						</div>
						<MessageForm
							onMessageSubmit={this.handleMessageSubmit}
							user={this.state.user}
						/>

					</div>
				</div>
				<div className="col-md-4">
					<div className="panel panel-primary">
						<div className="panel-heading">
							ONLINE USERS
						</div>
						<div className="panel-body">
							<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} locations={this.state.locations} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<ChatApp />, document.getElementById('app'));
