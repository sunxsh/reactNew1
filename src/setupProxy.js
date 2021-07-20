/**
 * @description :{配置代理}
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/backend-service',
        {
            // target: 'http://localhost:8080',
            // target: 'http://192.168.2.37:8081', // 本地测试ip
            // target: 'http://192.168.2.34:8080', // 本地测试ip
            // target: 'http://192.168.1.109:12000', // 本地测试ip
            // target: 'http://192.168.1.111:8080', // 本地测试ip
            // target: 'http://192.168.1.115:12000', // 本地测试ip wu
            // target: 'http://amazonerp.proxy.gudsen.vip/', // 本地测试ip
            // target: 'http://192.168.1.114:12000', // 本地测试ip
            //  target: 'http://amazonerp.proxy.gudsen.vip/', // 本地测试ip
            // target: 'http://192.168.1.115:12000', // 本地测试ip
            //  target: 'http://amazonerp.proxy.gudsen.vip/', // 本地测试ip
            target: 'http://192.168.1.110:12000', // 本地测试ip
            //  target: 'http://192.168.1.121:12000', // 本地测试ip
            changeOrigin: true,
            // pathRewrite: {'^/gsapi': '/backend-service/gsapi'}
            pathRewrite: {'^/backend-service': '/backend-service'}
        }
    ));
}
