var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      addButtonText: 'Enter a ToDo'
    }
  },
  render: function() {
    return <div className="input-group">
      <input
        value={this.state.text}
        onChange={this.handleInputChange}
        type="text"
        className="form-control" />
      <span className="input-group-btn">
        <button
          onClick={this.handleClick}
          className="btn btn-success"
          type="button">
          {this.state.addButtonText}
        </button>
      </span>
    </div>
  },
  handleClick: function() {
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });
    this.setState({text: ''});
  },
  handleInputChange: function(event) {
    this.setState({text: event.target.value});
    if (event.target.value !== '') {
      this.setState({
        addButtonText: 'Add to ToDo List'
      });
    }
  }
});
