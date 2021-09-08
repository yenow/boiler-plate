// 운영
if(process.env.NODE_ENV == 'production') {
    module.exports = require('./prod');
} else {  // 개발
    module.exports = require('./dev');
}