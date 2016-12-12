require('./style/main');
require('./style/style');

require('./deleteme');

var React = require('react');
var ReactDOM = require('react-dom');
var HelloWorld = require('./components/HelloWorld');

ReactDOM.render(
  <HelloWorld name="Juanito" />,
  document.getElementById('root')
);

console.log("hi from index.jsx");
