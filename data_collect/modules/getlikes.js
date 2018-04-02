//  指定したユーザのいいねを取得する関数
const rp = require('request-promise');
const cheerio = require('cheerio');
const extractlike = require('./extractlike');

async function getlikes(user_id) {
  let page = 1;
  let result = [];
  for(let page = 1; ; page++) {
    try {
      data = await getlike(user_id, page);
      if(data.length < 1) {
        break;
      }
    } catch(error) {
      break;
    }
    result = result.concat(data);
  }
  return Promise.resolve(result);
}

async function getlike(user_id, page_no) {
  let uri = `https://qiita.com/${user_id}/like?page=${page_no}`;
  return rp.get(uri).then(html => {
    const result = extractlike(html);
    return Promise.resolve(result);
  }).then(result => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 100);
    });
  });
}

module.exports = getlikes;
