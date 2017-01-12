/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var MessageForm = React.createClass({

    getInitialState() {
        return {text: ''};
    },

    handleSubmit(e) {
        e.preventDefault();
        var message = {
            user : this.props.user,
            text : this.state.text
        }
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    },

    changeHandler(e) {
        this.setState({ text : e.target.value });
    },

    render() {
        return(
            <div className="panel-footer">
                <div className="input-group">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.changeHandler}
                            value={this.state.text}
                            placeholder="click Enter for sending msg"
                        />
                    </form>
                </div>
            </div>

        );
    }
});
module.exports = MessageForm;