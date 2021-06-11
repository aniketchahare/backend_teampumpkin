let fs = require('fs');

module.exports = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "operatorsAliases": 0
  },
}

if (!fs.existsSync("./" + process.env.IMAGESLOCAL)) {
  fs.mkdir(process.env.IMAGESLOCAL, (err, data) => {
    if (err) {
      console.log("Error while creating the S3 local folder for the project:", JSON.stringify(err));
    }
  });
};