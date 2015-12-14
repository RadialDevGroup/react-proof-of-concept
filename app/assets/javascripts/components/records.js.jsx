var Records = React.createClass({
  addRecord: function(record) {
    var records = React.addons.update(this.state.records, {$push: [record]});
    this.setState({records: records});
  },

  deleteRecord: function(record) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
    return this.replaceState({records: records});
  },

  updateRecord: function(record, data) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, {$splice: [[index, 1, data]]});
    return this.replaceState({records: records});
  },

  getInitialState: function() {
    return {records: this.props.data};
  },

  getDefaultProps: function() {
    return {records: []};
  },

  credits: function() {
    var credits = this.state.records.filter(function(val) {
      return val.amount >= 0;
    });

    return credits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0);
  },

  debits: function() {
    var debits = this.state.records.filter(function(val) {
      return val.amount < 0;
    });

    return debits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0);
  },

  balance: function() {
    return this.debits() + this.credits();
  },

  render: function() {
    var _this = this;
    var recordNodes = this.state.records.map(function(record) {
      return (
        <Record key={record.id} record={record} handleDeleteRecord={_this.deleteRecord} handleEditRecord={_this.updateRecord} />
      );
    });

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordNodes}
          </tbody>
        </table>
      </div>
    );
  }
});
