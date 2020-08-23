import fs from "fs";
import db from "../graphql/models/database";
import { ApolloServer, gql } from "apollo-server-express";
import { mergeType, mergeResolvers, makeExecutableSchema } from "graphql-tools";
export default (app) => {
  const graphql_files = fs.readdirSync(__dirname + "/schema/graphql");
  const resolvers_files = fs.readdirSync(__dirname + "/schema/resolvers");

  const files = [
    ...graphql_files.map((item) => "schema/graphql/" + item),
    ...resolvers_files.map((item) => "schema/resolvers/" + item),
  ];

  const list_types = [];
  const list_resolvers = [];

  files.forEach((file) => {
    if (file === "index.js") return;
    if (file.indexOf(".js") < 0) return;
    if (file.indexOf(".test.js") >= 0) return;
    if (file.indexOf("resolvers") >= 0) {
      if (file === "resolvers") return;
      console.log("Loading Resolvers file", file);
      list_resolvers.push(require(__dirname + "/" + file).default);
      return;
    }
    console.log("Loading Schema file", file);
    const schema = require(__dirname + "/" + file).default;
    if (!schema) return;
    list_types.push(schema);
  });

  const typeDefs = mergeType(list_types);
  const resolvers = mergeResolvers(list_resolvers);

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

  schema.applyMiddleware({ app });
};
