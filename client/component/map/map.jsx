/**
 * Created by User on 12.01.2017.
 */
var React = require('react');
var markers = [];

var Map = React.createClass({

    componentDidMount(){

        this.componentDidUpdate();
    },

    componentDidUpdate(){
        var self = this;
        var bounds = [];

        var map = new GMaps({
            div: '#map',
            lat: this.props.lat,
            lng: this.props.lng,
            width: '100%',
            height: '325px',
            zoom: 5
        });
        this.removeMarkers(markers)
        this.props.locations.forEach(function(data, key){
            markers.push(map.addMarker({
                lat: data.location.lat,
                lng: data.location.lng
            }));
            bounds.push(new google.maps.LatLng(data.location.lat, data.location.lng));
        })

        if(this.props.active){
            this.props.locations.forEach(function(data, key){
                if(self.props.active==data.user) {
                    map.addMarker({
                        lat: data.location.lat,
                        lng: data.location.lng
                    }).setAnimation(google.maps.Animation.BOUNCE);
                }
            })
        }
        map.fitLatLngBounds(bounds);
    },

    disampleAnimationMarkers(markers){
        for(var i=0; i<markers.length; i++){
            if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
            }
        }
    },

    removeMarkers(markers){
        for(var i=0; i<markers.length; i++){
            markers[i].setMap(null);
        }
    },

    render(){

        return (
            <div className="map-holder">
                <div id="map"></div>
            </div>
        );
    }

});

module.exports = Map;