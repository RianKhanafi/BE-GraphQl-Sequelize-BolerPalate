export default {
  Query: {
    users_account: async (a, b, { db }) => {
      let users = await db.models.users_account.findAll();
      // console.log(users);
      return users;
    },
  },
};
