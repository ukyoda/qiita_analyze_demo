const getlikes = require('./modules/getlikes');

getlikes('ukyoda')
        .then(data => console.log(data.length))
        .catch(error => {
          console.error(error);
        });
