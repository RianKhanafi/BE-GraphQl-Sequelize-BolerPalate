// HTTP SERVER
import express from "express";
import cors from "cors";
import db from "./graphql/models/database";
import config from "./config";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import Parser from "body-parser";
import { typeDefs, resolvers } from "./graphql";
import router from "./api/ApiRouter";
import dotenv from "dotenv";

dotenv.config();
const server = express();

server.use(Parser.json());
server.use(Parser.urlencoded({ extended: true }));

const schema = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: async ({ req, payload }) => {
    return { db };
  },
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark",
    },
  },
});

schema.applyMiddleware({ app: server });
server.use(router);
function setPort(port = 5000) {
  server.set("port", parseInt(port, 10));
}
function listen() {
  const port = server.get("port") || config.port;
  server.listen(port, () => {
    console.log(
      `The server is running and listening at http://localhost:${port}`
    );
  });
}

server.use(
  cors({
    origin: config.corsDomain,
    optionsSuccessStatus: 200,
  })
);

server.get("/api/status", (req, res) => {
  res.send({ status: "ok" });
});

export default {
  setPort,
  listen,
};
