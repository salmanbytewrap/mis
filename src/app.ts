import * as dotenv from "dotenv";
dotenv.config();

import * as cors from "cors";
import * as express from "express";
import * as tracer from "tracer";
import config from "./config/Config";
import router from "./routers/index";

const logger = tracer.colorConsole();
export const app = express();

app.set("port", config.PORT || 8080);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req: any, res, buf) {
      if (req.originalUrl.startsWith("/v1/payment/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get("/", (req, res) => {
  res.send("Mis App Backend Running ...");
});

if (config.NODE_ENV === "development") {
  app.use(express.text());
  app.use((req, res, next) => {
    logger.trace(`${req.method} ${req.url}`);
    if (
      (/json/i.test(req.headers["content-type"]) &&
        Object.keys(req.body).length > 0) ||
      req.body.length > 0
    ) {
      logger.debug(req.body);
    }
    next();
  });
}

app.use(router);

app.use((req, res, next) => {
  res.status(404).end();
});


app.listen(app.get("port"), () => {
  logger.info(`Mis App backend listening on port ${app.get("port")}.`);
});

export default app;
