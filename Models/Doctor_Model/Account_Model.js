import { pool } from "../../Utils/db.js";
import { createPassword , comparePassword } from "../../Utils/password.js";
import { signInEmail , sendResetCodeEmail , sendResetPasswordEmail , deleteAccountEmail } from "../../Utils/email.js";



const createDoctor = async (email, password , name) => {
  try {
    const checkDoctor = await pool.query("SELECT * FROM doctors WHERE email = $1", [email]);

    if (checkDoctor.rows.length > 0) {
      return "Account already exists.Try logging in";
    }
    const sql = "INSERT INTO doctors (email, password , name) VALUES ($1, $2 , $3)";
    const values = [email, await createPassword(password) , name];
    const response = await pool.query(sql, values);
    if (response.rowCount === 1) {
      await signInEmail(email , name);
      return "Doctor Created";
    }
  } catch (error) {
    throw error;
  }
};

const verifyDoctor = async (email, password) => {
  try {
    const sql = "SELECT * FROM doctors WHERE email = $1";
    const values = [email];
    const response = await pool.query(sql, values);
    if (response.rows.length > 0) {
      const Doctor = response.rows[0];
      const passwordMatch = await comparePassword(password, Doctor.password);
      if (passwordMatch) {
        return "Doctor Verified";
      }else{
        return "Incorrect Password";
      }
    }else{
      return "Account does not exist.Try signing up";
    }
  } catch (error) {
    throw error;
  }
};

const checkEmail = async (email) => {
  try {
    const sql = "SELECT * FROM doctors WHERE email = $1";
    const values = [email];
    const response = await pool.query(sql, values);
    if (response.rows.length > 0) {
      const verificationNumber = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
      const result = await pool.query("UPDATE doctors SET reset_code = $1, code_expires_at = $2 WHERE email = $3", [verificationNumber, expiresAt, email]);
      if(result.rowCount === 1){
        await sendResetCodeEmail(email, response.rows[0].name , verificationNumber);
        return verificationNumber;
      }
    }else {
      return "Account does not exist.Try signing up";
    }
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (email, code, password) => {
  try {

    const userCheck = await pool.query("SELECT * FROM doctors WHERE email = $1", [email]);

    if (userCheck.rows.length === 0) {
      return "Account does not exist. Try signing up";
    }
    const codeCheck = await pool.query(
      "SELECT * FROM doctors WHERE email = $1 AND reset_code = $2 AND code_expires_at > NOW()",
      [email, code]
    );

    if (codeCheck.rows.length === 0) {
      return "Invalid or expired verification code.";
    }

    console.log(codeCheck.rows[0].code_expires_at);

    const hashedPassword = await createPassword(password);

    const updateResult = await pool.query(
      "UPDATE doctors SET password = $1, reset_code = NULL, code_expires_at = NULL WHERE email = $2",
      [hashedPassword, email]
    );

    if (updateResult.rowCount === 1) {
      await sendResetPasswordEmail(email, userCheck.rows[0].name);
      return "Password reset successful.";
    } else {
      return "Error resetting password.";
    }

  } catch (error) {
    console.error("Reset Password Error:", error);
    throw error;
  }
};

const deleteDoctor = async (email , password) => {
  try {
    const sql = "SELECT * FROM doctors WHERE email = $1";
    const values = [email];
    const response = await pool.query(sql, values);
    if(response.rows.length > 0){
      const passwordMatch = await comparePassword(password, response.rows[0].password);
      if(passwordMatch){
        console.log(response.rows[0].name);
        const sql = "DELETE FROM doctors WHERE email = $1";
        const values = [email];
        const result = await pool.query(sql, values);
        if(result.rowCount === 1){
          await deleteAccountEmail(email , response.rows[0].name);
          return "Doctor Deleted";
        }else{
          return "Error deleting Doctor";
        }
      }else{
        return "Incorrect Password";
      }
    }else{
      return "Account does not exist.Try signing up";
    }
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    throw error;
  }
};

export { createDoctor , verifyDoctor , checkEmail , resetPassword , deleteDoctor};
