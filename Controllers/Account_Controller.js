import { createPatient, verifyPatient, checkEmail, resetPassword , deletePatient } from "../Models/Account_Model.js";
import { logs } from "../Utils/logs.js";


const signUpPatient = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password, name } = req.body;
    const response = await createPatient(email, password, name);
    if (response === "Account already exists.Try logging in") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Patient Created") {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Patient try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}

const signInPatient = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password } = req.body;
    const response = await verifyPatient(email, password);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Incorrect Password") {
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    } else if (response === "Patient Verified") {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating Patient try again later`;
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
    msg = `Error creating Patient try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const resetPatientPassword = async (req, res) => {
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
    msg = `Error creating Patient try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

const accountPatientDeletion = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password } = req.body;
    const response = await deletePatient(email, password);
    if (response === "Account does not exist.Try signing up") {
      level = "INFO";
      msg = response;
      res.status(404).send({ error: msg });
    } else if (response === "Incorrect Password") {
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    } else if (response === "Patient Deleted") {
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
    msg = `Error deleting Patient try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export default {
  signUpPatient,
  signInPatient,
  sendResetCode,
  resetPatientPassword,
  accountPatientDeletion
}