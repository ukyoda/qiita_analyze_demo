const chai = require('chai');
const assert = chai.assert;
const SQLite = require('../modules/SQLite');
const createdb = require('../modules/createdb');

describe('SQLiteの動作確認テスト', () => {
  const db = new SQLite(':memory:');
  let pm = Promise.resolve();
  it('テーブル作成', () => {
    pm = pm.then(() => { // テーブル作成
      return createdb(db);
    }).then(() => { // 作成したテーブルの確認
      return db.all('select name from sqlite_master where type=? and name<>?', ['table', 'sqlite_sequence']);
    }).then((res) => {
      const tables = res.reduce((memo, value) => {
        memo.push(value.name);
        return memo;
      }, []);
      // テーブルが作成できている
      assert.include(tables, 'qiita_tags');
      assert.include(tables, 'qiita_likes');
      return Promise.resolve();
    });
  });

  it('createdb2回実行', () => {
    pm = pm.then(() => { // 2回実行しても落ちない
      return createdb(db);
    }).then(() => {
      assert.isOk(true);
      return Promise.resolve();
    }).catch(err => {
      console.error(err);
    });
  });

  it('データを登録してみる', () => {

  });
});
