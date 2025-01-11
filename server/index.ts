import express from 'express';
import compression from 'compression';
import { renderPage } from 'vite-plugin-ssr/server';
import { root } from './root.js';

const isProduction = process.env.NODE_ENV === 'production';

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    // Serve static assets in production
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`, { single: true, dev: false }));
  } else {
    // Vite development server integration
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom', // Needed for SSR apps
    });
    app.use(viteDevServer.middlewares);
  }

  // Middleware for Vite-plugin-ssr
  app.get('*', async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl };

    try {
      const pageContext = await renderPage(pageContextInit);
      const { httpResponse } = pageContext;

      if (!httpResponse) {
        next();
      } else {
        const { body, statusCode, headers, earlyHints } = httpResponse;
        if (res.writeEarlyHints) {
          res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
        }
        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode).send(body);
      }
    } catch (err) {
      console.error('Error during render:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
