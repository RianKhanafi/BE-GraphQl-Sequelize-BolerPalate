import Models from "../Models/UserAccount";
module.exports = {
  createUserAccount: (req, res) => {
    let data = Models.getUser();
    res.send(data);
  },
};
