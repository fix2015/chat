/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var Map = React.createClass({

    componentDidMount(){

        this.componentDidUpdate();
    },

    componentDidUpdate(){
        var self = this;
        var bounds = [];
        var markers = [];

        this.lastLat = this.props.lat;
        this.lastLng = this.props.lng

        var map = new GMaps({
            div: '#map',
            lat: this.props.lat,
            lng: this.props.lng,
            width: '100%',
            height: '325px',
            zoom: 5
        });




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
        }else{
            this.props.locations.forEach(function(data, key){
                if(self.props.active==data.user) {
                    map.addMarker({
                        lat: data.location.lat,
                        lng: data.location.lng
                    }).setAnimation(null);

                }
            })
        }
        map.fitLatLngBounds(bounds);
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