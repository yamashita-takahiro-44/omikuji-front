const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api:3000', // Rails APIサービス
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    })
  );

  app.use(
    '/sockjs-node',
    createProxyMiddleware({
      target: 'http://localhost:3001', // React開発サーバー自身のポート
      ws: true
    })
  );
};
