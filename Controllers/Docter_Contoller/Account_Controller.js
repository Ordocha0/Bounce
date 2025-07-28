import { createDoctor, verifyDoctor, checkEmail, resetPassword , deleteDoctor } from "../../Models/Doctor_Model/Account_Model.js";
import { logs } from "../../Utils/logs.js";


const signUpDoctor = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password, name } = req.body;
    const response = await createDoctor(email, password, name);
    if (response === "Account already exists.Try logging in") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Doctor Created") {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Doctor try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}

const signInDoctor = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password } = req.body;
    const response = await verifyDoctor(email, password);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Incorrect Password") {
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    } else if (response === "Doctor Verified") {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Doctor try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}

const sendResetCode = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, } = req.body;
    const response = await checkEmail(email);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else {
      level = "INFO";
      msg = "Verification code has been sent to your email";
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Doctor try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const resetDoctorPassword = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, code , password } = req.body;
    const response = await resetPassword(email, code , password);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Code Expired") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Error Resetting Password") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Doctor try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const accountDoctorDeletion = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password } = req.body;
    const response = await deleteDoctor(email, password);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Incorrect Password") {
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    } else if (response === "Doctor Deleted") {
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
    msg = `Error deleting Doctor try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export default {
  signUpDoctor,
  signInDoctor,
  sendResetCode,
  resetDoctorPassword,
  accountDoctorDeletion
}