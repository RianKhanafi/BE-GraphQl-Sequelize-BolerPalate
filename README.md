#Bakend Graphql dan Squalize BoilerPlale

Yang digunakan pada projek boilerplate ini
1. Node.js (Runtime Javascript)
2. Express.js 
3. Graphql 
4. Squalize (ORM)


contoh kode:
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
cara menjalankan `yarn start`
