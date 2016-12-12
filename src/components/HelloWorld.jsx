var React = require('react');
var dlog = require('../img/dlogger.svg');

var HelloWorld = React.createClass({
    render: function() {
        return (
          <div>
            <p>Hello my friend {this.props.name}! How are you doing today?</p>
            <img src={dlog} alt="dlog_err" />
          </div>
        );
    }
});

module.exports = HelloWorld;
