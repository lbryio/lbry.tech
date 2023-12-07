"use strict";



//  P A C K A G E S

import * as color from "colorette";
import compress from "fastify-compress";
import cors from "cors";
import fastify from "fastify";
import helmet from "fastify-helmet";
import ssr from "choo-ssr/fastify";
import statik from "fastify-static";
import websockets from "fastify-ws";

//  U T I L S

import handleSocketMessages from "./sockets";
import messageSlack from "~helper/slack";
import redirects from "~data/redirects.json";

const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development",
    redact: ["req.headers.authorization"],
    serializers: {
      req(req) {
        return {
          headers: req.headers,
          hostname: req.hostname,
          method: req.method,
          remoteAddress: req.ip,
          remotePort: req.connection.remotePort,
          url: req.url
        };
      }
    }
  }
});



//  P R O G R A M

server
  .use(cors())
  .register(compress)
  .register(websockets)
  .register(helmet, {
    hidePoweredBy: {
      setTo: "LBRY"
    }
  })
  .register(statik, {
    prefix: "/assets/",
    root: `${__dirname}/dist/`
  })
  .register(ssr, {
    app: require("./client")
  })
  .addHook("preHandler", (request, reply, next) => {
    if (redirects[request.raw.originalUrl])
      reply.redirect(301, redirects[request.raw.originalUrl]);

    next();
  })
  .ready(err => {
    if (err)
      throw err;

    server.ws.on("connection", socket => {
      socket.on("message", data => {
        data = JSON.parse(data);
        return handleSocketMessages(socket, data);
      });

      socket.on("close", () => socket.terminate());
    });
  });



//  B E G I N

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", async() => {
  process.env.NODE_ENV === "development" ?
    process.stdout.write(`\n— ${color.green("⚡")} ${server.server.address().port}\n`) :
    messageSlack({
      message: `Server started at port \`${server.server.address().port}\``,
      title: "APP BOOT"
    });
});
