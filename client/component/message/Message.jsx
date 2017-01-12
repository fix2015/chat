/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var Message = React.createClass({
    render() {
        return (
            <li className="media">
                <div className="media-body">
                    <div className="media">
                        <div className="media-body" >
                            {this.props.text}
                            <br />
                            <small className="text-muted">{this.props.user} :</small>
                            <hr />
                        </div>
                    </div>
                </div>
            </li>
    );
    }
});

module.exports = Message;