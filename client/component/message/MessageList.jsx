/**
 * Created by User on 12.01.2017.
 */
var React = require('react');

var Message = require('./Message.jsx')

var MessageList = React.createClass({
    render() {
        return (
           <div>
               <ul>
                   {
                       this.props.messages.map((message, i) => {
                           return (
                               <Message
                                   key={i}
                                   user={message.user}
                                   text={message.text}
                               />
                           );
                       })
                   }
               </ul>
           </div>
        );
    }
});

module.exports = MessageList;