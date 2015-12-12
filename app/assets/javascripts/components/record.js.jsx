var Record = React.createClass({
  handleDelete: function(e) {
    e.preventDefault();
    var _this = this;
    $.ajax({
      method: "DELETE",
      url: "/records/" + this.props.record.id,
      dataType: "JSON",
      success: function() {
        _this.props.handleDeleteRecord(_this.props.record);
      }
    });
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }
});
