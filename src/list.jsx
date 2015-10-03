var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({

  renderList: function() {
    if (this.props.items.length === 0) {
      return <h4>
        Add a todo item and the server refreshes in real time using FireBase.
      </h4>
    } else {
      var children = [];

      for (var key in this.props.items) {
        var item = this.props.items[key];
        item.key = this.props.items[key]['.key'];

        children.push(
          <ListItem
            item={item}
            key={item.key} />

        );
      }
      return children;
    }
  },
  render: function() {
    return <ul>
      {this.renderList()}
    </ul>
  },
});
