import express from "express";
import createUserAccount from "./Controllers/UserAccount";
import AuthenticationToken from "../helper/auth";
const router = express.Router();

router.post("/api/login", createUserAccount.loginUser);
router.get("/api/checkauth", AuthenticationToken, (req, res) => {
  res.send({ message: "Auth success success" });
});

export default router;
