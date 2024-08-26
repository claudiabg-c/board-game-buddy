const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://boardgamegeek.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
