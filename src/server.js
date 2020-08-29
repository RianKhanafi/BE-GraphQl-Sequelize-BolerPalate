// HTTP SERVER
import express from "express";
import cors from "cors";
import db from "./graphql/models/database";
import config from "./config";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./graphql";
import router from "./api/ApiRouter";
// import Parse from "json-parse";
const app = express();
// app.use(Parser.urlencoded({ extended: true }));
// app.use(Parser.json({ limit: "500mb" }));
// app.use(cors());

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

schema.applyMiddleware({ app: app });
app.use(router);
function setPort(port = 5000) {
  app.set("port", parseInt(port, 10));
}
function listen() {
  const port = app.get("port") || config.port;
  app.listen(port, () => {
    console.log(
      `The server is running and listening at http://localhost:${port}`
    );
  });
}

app.use(
  cors({
    origin: config.corsDomain, // Be sure to switch to your production domain
    optionsSuccessStatus: 200,
  })
);

// Endpoint to check if the API is running
app.get("/api/status", (req, res) => {
  res.send({ status: "ok" });
});

// Append apollo to our API
// apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen,
};
