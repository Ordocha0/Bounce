import { client, connectDb } from "../Middleware/db.js";
import { hashPassword } from "../Middleware/password.js";
import { signInEmail } from "../Middleware/email.js";

// Connect to the database
await connectDb();


const createUser = async (email, password) => {
  try {
    const checkUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkUser.rows.length > 0) {
      return "Account already exists.Try logging in";
    }
    const sql = "INSERT INTO users (email, password) VALUES ($1, $2)";
    const values = [email, await hashPassword(password)];
    const response = await client.query(sql, values);
    if (response.rowCount === 1) {
      await signInEmail(email);
      return "User Created";
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createUser };
