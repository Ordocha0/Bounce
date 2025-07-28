import express from "express";
import AccountController from "../Controllers/Account_Controller.js";

const router = express.Router();


// User
router.post("/user/signin", AccountController.signinUser);




export default router;