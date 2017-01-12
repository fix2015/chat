/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var Map = React.createClass({

    componentDidMount(){

        this.componentDidUpdate();
    },

    componentDidUpdate(){

        this.lastLat = this.props.lat;
        this.lastLng = this.props.lng

        var map = new GMaps({
            div: '#map',
            lat: this.props.lat,
            lng: this.props.lng,
            width: '100%',
            height: '325px',
        });

        var bounds = [];

        this.props.locations.forEach(function(data, key){
            map.addMarker({
                lat: data.location.lat,
                lng: data.location.lng
            });
            bounds.push(new google.maps.LatLng(data.location.lat, data.location.lng));
        })

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