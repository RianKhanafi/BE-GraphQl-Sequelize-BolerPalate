const bcrypt = require("bcryptjs");
export default {
  Query: {
    users_account: async (a, b, { db }) => {
      return await db.models.users_account.findAll();
    },
  },
  Mutation: {
    MutateUserAccount: async (_, { data }, { db }) => {
      let { password } = data;
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      password = hash;

      const response = await db.models.users_account.create({
        ...data,
        password,
      });
      return response.dataValues;
    },
  },
};
