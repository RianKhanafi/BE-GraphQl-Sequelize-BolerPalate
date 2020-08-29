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

  type Query {
    users_account: [users_account]
  }
`;
