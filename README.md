#Bakend Graphql dan Squalize BoilerPlale

Yang digunakan pada projek boilerplate ini
1. Node.js (Runtime Javascript)
2. Express.js 
3. Graphql 
4. Squalize (ORM)


Contoh Schema:
```
import gql from "graphql-tag";
export default gql`
  type users_account {
    id: Int!
    username: String
    email: String
    tags_id: Int
    photo: String
    password: String
    link_instagram: String
    link_facebok: String
    link_linkdln: String
    portofolio_id: String
    ttl: DateTime
  }

  input inputUserAccount {
    username: String
    email: String
    tags_id: Int
    photo: String
    password: String
    link_instagram: String
    link_facebok: String
    link_linkdln: String
    portofolio_id: String
    ttl: DateTime
  }

  type Query {
    users_account: [users_account]
  }

  type Mutation {
    MutateUserAccount(data: inputUserAccount): users_account
  }
`;
```


Contoh Resolvers

```
export default {
  Query: {
    users_account: async (a, b, { db }) => {
      let users = await db.models.users_account.findAll();
      // console.log(users);
      return users;
    },
  },
  Mutation: {
    MutateUserAccount: async (_, { data }, { db }) => {
      const response = await db.models.users_account.create(data);
      return response.dataValues;
    },
  },
};

```
cara menjalankan `yarn start`
