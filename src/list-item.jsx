var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://reactjs-todo-app.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  changesButtons: function() {
    if (!this.state.textChanged) {
      return null;
    } else {
      return [
        <buttons
          onClick={this.handleSaveClick}
          type="button"
          className="btn btn-success"
          >Save</buttons>,
        <buttons
          onClick={this.handleUndoClick}
          className="btn btn-warning"
          >Undo</buttons>
      ]
    }
  },
  handleSaveClick: function() {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });

  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange} />
      </span>
      <input
        disabled={this.state.done}
        onChange={this.handleTextChange}
        type="text"
        className="form-control"
        value={this.state.text} />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.handleDeleteClick} >
          Delete
        </button>
      </span>
    </div>
  },

});
