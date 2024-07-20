import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
import Controller from "./src/controllers/webpage.controller.js";
import nodemailer from "nodemailer";

const server = express();

server.use(express.static("public"));
server.use(cookieParser());
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const controller = new Controller();

// server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/", setLastVisit, controller.getHomepage);

server.get("/patientlogin", controller.getPatientLogin);
server.get("/patientregister", controller.getPatientRegister);

server.get("/doctorlogin", controller.getDoctorLogin);
server.get("/doctorregister", controller.getDoctorRegister);

server.get("/aboutus", controller.getAboutUs);

server.get("/contactus", controller.getContactUs);

server.get("/logout", controller.logout);

server.get("/profile", controller.getProfile);

server.post("/patientregister", controller.postPatientRegister);

server.post("/patientlogin", controller.postPatientLogin);

server.post("/doctorregister", controller.postDoctorRegister);
server.post("/doctorlogin", controller.postDoctorLogin);

server.post("/appointment", controller.postAppointment);

server.listen(2000, () => {
  console.log("Server is running on port 2000");
});
