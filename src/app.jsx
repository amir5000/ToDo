var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://reactjs-todo-app.firebaseio.com/';

var App = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return {
        items: {},
        loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsArray(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          ToDo List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr></hr>
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr></hr>
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-primary">
        Clear Completed Items
      </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for (var key = this.state.items.length - 1; key >= 0; key--) {
      if(this.state.items[key].done === true) {
        this.fb.child(this.state.items[key]['.key']).remove();
      }
    }
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
