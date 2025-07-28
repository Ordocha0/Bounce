import express from "express";
import userAccountController from "../Controllers/Patient_Controller/Account_Controller.js";
import doctorAccountController from "../Controllers/Docter_Contoller/Account_Controller.js";
const router = express.Router();

// User
router.post("/patient/signup", userAccountController.signUpPatient);
router.post("/patient/signin", userAccountController.signInPatient);
router.post("/patient/resetpassword/code", userAccountController.sendResetCode);
router.post("/patient/resetpassword/email", userAccountController.resetPatientPassword);
router.delete("/patient/delete", userAccountController.accountPatientDeletion);

// Doctor
router.post("/doctor/signup", doctorAccountController.signUpDoctor);
router.post("/doctor/signin", doctorAccountController.signInDoctor);
router.post("/doctor/resetpassword/code", doctorAccountController.sendResetCode);
router.post("/doctor/resetpassword/email", doctorAccountController.resetDoctorPassword);
router.delete("/doctor/delete", doctorAccountController.accountDoctorDeletion);


export default router;