const path = require("path");
const express = require("express");
const consola = require("consola");
const { loadNuxt, build } = require("nuxt");

const apiRoot = require("./api");

const app = express();

async function start () {
  const isDev = process.env.NODE_ENV !== "production";
  // init nuxt.js
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start');

  const {
    host = process.env.HOST || "0.0.0.0",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Enable live build & reloading on dev
  if (isDev) {
    build(nuxt);
  }
  await nuxt.ready();

  app.use(express.json({ limit: '200mb' }));
  app.use(express.urlencoded({ extended: false, limit: '200mb' }));
  app.use("/api", apiRoot);
  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
