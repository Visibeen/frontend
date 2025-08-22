const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy Google Maps Places API to avoid browser CORS in development
  app.use(
    '/places',
    createProxyMiddleware({
      target: 'https://maps.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/places': ''
      },
      secure: true,
      logLevel: 'warn'
    })
  );
};
