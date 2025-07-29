import express from "express";
import appointmentController from "../Controllers/Appointment_Controller/Appointment_Controller.js";
const router = express.Router();

router.post("/create", appointmentController.createAppointmentController);
router.get("/patient/:patient_id", appointmentController.getPatientAppointmentsController);
router.get("/patient/history/:patient_id", appointmentController.getPatientHistoryAppointmentsController);
router.get("/doctor/:doctor_id", appointmentController.getDoctorAppointmentsController);
router.get("/doctor/history/:doctor_id", appointmentController.getDoctorHistoryAppointmentsController);
router.delete("/delete/:id", appointmentController.deleteAppointmentController);
router.put("/update/", appointmentController.updateAppointmentController);

export default router;