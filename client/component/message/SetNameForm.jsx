/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var SetNameForm = React.createClass({
    getInitialState() {
        return {newName: ''};
    },

    onKey(e) {
        this.setState({ newName : e.target.value });
    },

    handleSubmit(e) {
        e.preventDefault();
        var newName = this.state.newName;
        this.props.onSetName(newName);
        this.setState({ newName: '' });
    },

    render() {
        return(
            <div>
                <h3> Set Name </h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.onKey}
                        value={this.state.newName}
                    />
                </form>
            </div>
        );
    }
});

module.exports = SetNameForm;