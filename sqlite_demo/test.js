const SQLite = require('./SQLite');

const sql = `
  -- qiita like table
  CREATE TABLE IF NOT EXISTS qiita_likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qiita_id INTEGER,
    author VARCHAR(128),
    title VARCHAR(128),
    url text
  );
  -- index
  CREATE UNIQUE INDEX IF NOT EXISTS qiita_likes_idx_qiita_id ON qiita_likes (qiita_id);

  -- qiita tag table
  CREATE TABLE IF NOT EXISTS qiita_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag VARCHAR(128)
  );
  -- index
  CREATE UNIQUE INDEX IF NOT EXISTS qiita_tags_idx_tag ON qiita_tags (tag);
`;

const db = new SQLite('db.sqlite');
db.serialize();
Promise.resolve().then(() => {
  return db.exec(sql);
}).then(res => {
  db.close();
}).catch(err => {
  console.error(err);
});
