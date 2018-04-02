// const sqlite3 = require('sqlite3');
// sqlite3.Database.prototype = require('bluebird').promisifyAll(sqlite3.Database.prototype);
// module.exports = sqlite3;

const sqlite3 = require('sqlite3').verbose();

class SQLite {
  constructor(dbname) {
    this.db = new sqlite3.Database(dbname);
    this._lastID = null;
    this._change = null;
  }

  serialize() {
    this.db.serialize.apply(this.db, arguments);
  }

  get change() {
    return this._change;
  }

  get lastID() {
    return this._lastID;
  }

  exec(query) {
    const that = this;
    return new Promise((resolve, reject) => {
      this.db.exec(query, function(err, res) {
        if(!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  run(query, param=[]) {
    const that = this;
    return new Promise((resolve, reject) => {
      this.db.run(query, param, function(err, res) {
        if(!err) {
          that._lastID = this.lastID || that._lastID;
          that._change = this.change || that._change;
          resolve(this.lastID);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  get(query, param) {
    return new Promise((resolve, reject) => {
      this.db.get(query, param, function(err, res) {
        if(!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  all(query, param) {
    return new Promise((resolve, reject) => {
      this.db.all(query, param, function(err, res) {
        if(!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  }

  close() {
    return this.db.close();
  }

}

module.exports = SQLite;
