const cheerio = require('cheerio');

module.exports = function extractlike(html) {
  const $ = cheerio.load(html);
  const result = [];
  $('.tableList article').each(function() {
    const author = $(this).find('.ItemLink__info a').text();
    const title = $(this).find('.ItemLink__title a').text();
    const page_path = $(this).find('.ItemLink__title a').attr('href');
    const url = `https://qiita.com${page_path}`;
    const itemId = page_path.split('/').pop();
    const tags = [];
    $(this).find('.TagList__item').each(function() {
      tags.push({
        name: $(this).find('a').text(),
        versions: []
      });
    });
    result.push({
      id: itemId,
      author,
      title,
      url,
      tags
    });
  });
  return result;
};
