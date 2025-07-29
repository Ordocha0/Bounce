import { logs } from "../../Utils/logs.js";

import { createAppointment, getPatientAppointments, getDoctorAppointments , getPatientHistoryAppointments, getDoctorHistoryAppointments , deleteAppointment , updateAppointment } from "../../Models/Appointment_Model/Appointment_Model.js";


const createAppointmentController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { doctor_id, patient_id, date_time , reason } = req.body;
    const response = await createAppointment(doctor_id, patient_id, date_time , reason);
    if(response === "Appointment Created"){
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }else if(response === "Account does not exist.Try signing up"){
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    }else if(response === "Doctor account does not exist"){
      level = "ERR";
      msg = response;
      res.status(404).send({ error: msg });
    }
    else{
      level = "INFO";
      msg = response;
      res.status(400).send({ error: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Appointment try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const getPatientAppointmentsController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { patient_id } = req.params;
    const response = await getPatientAppointments(patient_id);
    level = "INFO";
    msg = "Appointments Fetched Successfully";
    res.status(200).send({ data : response });
  } catch (error) {
    level = "ERR";
    msg = `Error getting Appointments try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const getPatientHistoryAppointmentsController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { patient_id } = req.params;
    const response = await getPatientHistoryAppointments(patient_id);
    level = "INFO";
    msg = "Appointments Fetched Successfully";
    res.status(200).send({ data : response });
  } catch (error) {
    level = "ERR";
    msg = `Error getting Appointments try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const getDoctorAppointmentsController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { doctor_id } = req.params;
    const response = await getDoctorAppointments(doctor_id);
    level = "INFO";
    msg = "Appointments Fetched Successfully";
    res.status(200).send({ data : response });
  } catch (error) {
    level = "ERR";
    msg = `Error getting Appointments try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const getDoctorHistoryAppointmentsController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { doctor_id } = req.params;
    const response = await getDoctorHistoryAppointments(doctor_id);
    level = "INFO";
    msg = "Appointments Fetched Successfully";
    res.status(200).send({ data : response });
  } catch (error) {
    level = "ERR";
    msg = `Error getting Appointments try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const deleteAppointmentController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { id } = req.params;
    const response = await deleteAppointment(id);
    if(response === "Appointment Deleted"){
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }else{
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error deleting Appointment try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const updateAppointmentController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { id, date_time , reason } = req.body;
    const response = await updateAppointment(id, date_time , reason);
    if(response === "Appointment Updated"){
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }else if(response === "Appointment does not exist."){
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    }
    else{
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error updating Appointment try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export default {
  createAppointmentController,
  getPatientAppointmentsController,
  getPatientHistoryAppointmentsController,
  getDoctorAppointmentsController,
  getDoctorHistoryAppointmentsController,
  deleteAppointmentController,
  updateAppointmentController
};

