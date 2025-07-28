import express from "express";
import AccountController from "../Controllers/Account_Controller.js";

const router = express.Router();

// User
router.post("/patient/signup", AccountController.signUpPatient);
router.post("/patient/signin", AccountController.signInPatient);
router.post("/patient/resetpassword/code", AccountController.sendResetCode);
router.post("/patient/resetpassword/email", AccountController.resetPatientPassword);
router.delete("/patient/delete", AccountController.accountPatientDeletion);


export default router;