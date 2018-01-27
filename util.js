const ledger = require('ledgerco');
const ethUtil = require('ethereumjs-util');
const wallet = require('yoethwallet');
let util = {};

util.ledger = ledger;
util.ehtUtil = ethUtil;
util.wallet = wallet;
util.isConnected = false;


util.connect = function (cb) {
  if (this.isConnected) {
    cb(new Error('Ledger s is connected.'), null);
    return;
  }
  ledger.comm_node.create_async().then(function(comm) {
    const eth = new ledger.eth(comm);

    this.eth = eth;
    this.comm = comm;
    this.isConnected = true;

    cb(null, eth);
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this))
}

util.getAddress = function (path, cb) {
  if (!this.isConnected) {
    cb(new Error('Ledger s isnot connected.'), null);
    return;
  }
  let addresses = [];

  this.eth.getAddress_async(path, false, true).then(function (address) {
    cb(null, address);
  }.bind(this)).catch(function (err) {
    cb(err, null);
  }.bind(this));
}

module.exports = util;