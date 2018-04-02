const chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const path = require('path');

const extractlike = require('../modules/extractlike');
const filepath = path.join(__dirname, 'data/page.html');

describe("qiitaページからいいねの情報を取り出す", () => {
  const html = fs.readFileSync(filepath).toString();
  const data = extractlike(html);
  it('必要なフィールドが全て含まれている', () => {
    data.forEach(item => {
      assert.hasAllKeys(item, ['id', 'author', 'title', 'url', 'tags']);
    });
  });

  it('0番目のデータをチェック / IDが一致？', () => {
    assert.equal(data[0].id, 'b6cb83971f9f5ddd2d81');
  });
  it('0番目のデータをチェック / タイトルチェック', () => {
    assert.equal(data[0].title, '今まで作ったアルゴリズム的なやつ置き場');
  });
  it('0番目のデータをチェック / 著者チェック', () => {
    assert.equal(data[0].author, 'ayumegu')
  });
  it('0番目のデータをチェック / URL', () => {
    assert.equal(data[0].url, 'https://qiita.com/ayumegu/items/b6cb83971f9f5ddd2d81');
  });
  it('1番目のデータをチェック / タグ', () => {
    ['JavaScript', 'Sass', 'reactjs', 'React',  'create-react-app'].forEach(value => {
      assert.deepInclude(data[1].tags, {name: value, versions: []});
    });
  });
});
