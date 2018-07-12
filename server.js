"use strict"; require("dotenv").config();



//  P A C K A G E S

const chalk = require("chalk");
const cors = require("cors");
// const local = require("app-root-path").require;

//  V A R I A B L E S

const fastify = require("fastify")({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development" ? true : false
  }
});

const log = console.log; // eslint-disable-line
// const logSlackError = local("/helpers/slack");



//  P R O G R A M

fastify.use(cors());
fastify.register(require("fastify-compress"));
fastify.register(require("fastify-ws"));

fastify.register(require("fastify-helmet"), {
  hidePoweredBy: { setTo: "LBRY" }
});

fastify.register(require("fastify-static"), {
  root: `${__dirname}/public/`,
  prefix: "/assets/"
});

fastify.register(require("choo-ssr/fastify"), {
  app: require("./client"),
  plugins: [
    [ require("choo-bundles/ssr"), {} ]
  ]
});

/*
fastify.decorate("io", new WebSocket.Server({ server: fastify.server }));

fastify.io.on("connection", (socket, req) => {
  console.log("connected");
  socket.url = req.url;

  socket.on("disconnect", () => {
    console.log("someone left");
  });

  // On message broadcast to everyone
  socket.on("message", data => {
    // Broadcast to everyone else
    fastify.io.clients.forEach(client => {
      console.log(socket.url, client.url);

      if (socket.url === client.url && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
*/

fastify.ready(err => {
  if (err) throw err;

  fastify.ws.on("connection", socket => {
    // console.log("Client connected.");
    socket.send("welcome");

    socket.on("message", msg => {
      if (msg === "landed on homepage") {
        //
      }

      socket.send(msg); // Creates an echo server
    });

    socket.on("close", () => console.log("Client disconnected."));
  });
});



//  B E G I N

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  log(`\n— ${chalk.green("⚡")} ${fastify.server.address().port}\n`);
  // logSlackError(`Server started at port \`${fastify.server.address().port}\``);
};

start();
