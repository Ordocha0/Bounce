import { createUser } from "../Models/Account_Model.js";
import { logs } from "../Middleware/logs.js";

const signinUser = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { email, password } = req.body;
    const response = await createUser(email, password);
    if (response === "Account already exists.Try logging in") {
      level = "ERR";
      msg = response;
      res.status(400).send({ error: msg });
    } else if (response === "User Created") {
      level = "INFO";
      msg = response;
      res.status(200).send({ message: msg });
    }
  } catch (error) {
    level = "ERR";
    msg = `Error creating user try again later`;
    res.status(500).send({ error: msg });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    await logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}

export default {
  signinUser
}