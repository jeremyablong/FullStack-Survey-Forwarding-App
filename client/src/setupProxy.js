const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'https://peaceful-eyrie-82759.herokuapp.com' }));
}