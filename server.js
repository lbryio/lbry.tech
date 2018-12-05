"use strict"; require("dotenv").config(); require("date-format-lite"); require("@babel/register"); require("@babel/polyfill");



//  P A C K A G E S

const color = require("colorette");
const cors = require("cors");
const local = require("app-root-path").require;

const fastify = require("fastify")({
  logger: {
    level: "warn",
    prettyPrint: process.env.NODE_ENV === "development" ? true : false
  }
});

//  U T I L S

const handleSocketMessages = local("app/sockets").default;
const messageSlack = local("app/helpers/slack").default;



//  P R O G R A M

fastify
  .use(cors())
  .register(require("fastify-compress"))
  .register(require("@inc/fastify-ws"))
  .register(require("fastify-helmet"), {
    hidePoweredBy: { setTo: "LBRY" }
  })
  .register(require("fastify-static"), {
    prefix: "/assets/",
    root: `${__dirname}/app/dist/`
  })
  .register(require("choo-ssr/fastify"), {
    app: require("./app")
  });

fastify.ready(err => {
  if (err) throw err;

  fastify.ws.on("connection", socket => {
    socket.on("message", data => {
      data = JSON.parse(data);
      return handleSocketMessages(socket, data);
    });

    socket.on("close", () => socket.terminate());
  });
});



//  B E G I N

const start = async() => {
  try {
    await fastify.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  process.env.NODE_ENV === "development" ?
    process.stdout.write(`\n— ${color.green("⚡")} ${fastify.server.address().port}\n`) :
    messageSlack({
      message: `Server started at port \`${fastify.server.address().port}\``,
      title: "APP BOOT"
    });
};

start();
