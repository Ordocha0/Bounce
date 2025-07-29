import express from 'express';
import dontenv from 'dotenv';

// Middleware
dontenv.config();
const app = express();
app.use(express.json());


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
import AccountRoute from "./Routes/Account_Route.js";
import AppointmentRoute from "./Routes/Appointment_Route.js";

app.use("/account", AccountRoute);
app.use("/appointment", AppointmentRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});