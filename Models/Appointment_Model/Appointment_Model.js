import { pool } from "../../Utils/db.js";


const createAppointment = async (doctor_id, patient_id, date_time , reason) => {
  try {
    const sql = "INSERT INTO appointments (doctor_id, patient_id, date_time , visting_reason) VALUES ($1, $2, $3, $4)";
    const values = [doctor_id, patient_id, date_time , reason];
    const response = await pool.query(sql, values);
    console.log(response);
    if (response.rowCount === 1) {
      return "Appointment Created";
    }else{
      const checkPatient = await pool.query("SELECT * FROM patients WHERE id = $1", [patient_id]);
      const checkDoctor = await pool.query("SELECT * FROM doctors WHERE id = $1", [doctor_id]);
      if(checkPatient.rows.length === 0){
        return "Account does not exist.Try signing up";
      }else if(checkDoctor.rows.length === 0){
        return "Doctor account does not exist";
      }else{
        return "Error creating Appointment";
      }
    }
  } catch (error) {
    console.error("Create Appointment Error:", error);
    throw error;
  }
};

const getDoctorAppointments = async (doctor_id) => {
  try {
    const sql = "SELECT * FROM appointments WHERE doctor_id = $1 AND date_time > NOW()";
    const values = [doctor_id];
    const response = await pool.query(sql, values);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const getPatientAppointments = async (patient_id) => {
  try {
    const sql = "SELECT * FROM appointments WHERE patient_id = $1 AND date_time > NOW()";
    const values = [patient_id];
    const response = await pool.query(sql, values);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const getPatientHistoryAppointments = async (patient_id) => {
  try {
    const sql = "SELECT * FROM appointments WHERE patient_id = $1 AND date_time < NOW()";
    const values = [patient_id];
    const response = await pool.query(sql, values);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const getDoctorHistoryAppointments = async (doctor_id) => {
  try {
    const sql = "SELECT * FROM appointments WHERE doctor_id = $1 AND date_time < NOW()";
    const values = [doctor_id];
    const response = await pool.query(sql, values);
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const updateAppointment = async (id, date_time , reason) => {
  try {
    const sql = "UPDATE appointments SET date_time = $1, visting_reason = $2 WHERE id = $3";
    const values = [date_time , reason , id];
    const response = await pool.query(sql, values);
    if (response.rowCount === 1) {
      return "Appointment Updated";
    }else{
      const checkAppointment = await pool.query("SELECT * FROM appointments WHERE id = $1", [id]);
      if(checkAppointment.rows.length === 0){
        return "Appointment does not exist.";
      }else{
        return "Error updating Appointment";
      }
    }
  } catch (error) {
    throw error;
  }
};

const deleteAppointment = async (id) => {
  try {
    const sql = "DELETE FROM appointments WHERE id = $1";
    const values = [id];
    const response = await pool.query(sql, values);
    if (response.rowCount === 1) {
      return "Appointment Deleted";
    }else{
      return "Error deleting Appointment";
    }
  } catch (error) {
    throw error;
  }
};

export {
  createAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointment,
  deleteAppointment,
  getPatientHistoryAppointments,
  getDoctorHistoryAppointments
};