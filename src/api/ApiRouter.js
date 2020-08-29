import express from "express";
import createUserAccount from "./Controllers/UserAccount";

const router = express.Router();

router.get("/api/createUser", createUserAccount.createUserAccount);

export default router;
