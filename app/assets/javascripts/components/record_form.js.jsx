var RecordForm = React.createClass({
  getInitialState: function() {
    return {title: "", date: "", amount: ""};
  },

  handleChange: function(e) {
    var data = {};
    data[e.target.name] = e.target.value;
    this.setState(data);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var _this = this;
    $.post("", { record: this.state }, function(data) {
      _this.props.handleNewRecord(data);
      _this.setState(_this.getInitialState());
    }, "JSON");
  },

  valid: function() {
    return (
      this.state.title &&
      this.state.date &&
      this.state.amount
    );
  },

  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
      </form>
    );
  }
});
