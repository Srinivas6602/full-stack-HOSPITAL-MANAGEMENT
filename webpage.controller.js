import patientModel from "../models/patient.model.js";
import doctorModel from "../models/doctor.model.js";
import { sendConfirmationEmail } from "../middlewares/sendEmail.middleware.js";

class Controller {
  getHomepage(req, res, next) {
    if (req.session.user) {
      res.render("index", {
        user: req.session.user,
      });
    } else {
      res.render("index", {
        user: null,
      });
    }
  }

  getAboutUs(req, res, next) {
    res.render("aboutUs");
  }

  getContactUs(req, res, next) {
    res.render("contactUs");
  }

  getPatientRegister(req, res) {
    res.render("patientAppForm", {
      errorMessage: null,
    });
  }

  getDoctorRegister(req, res) {
    res.render("DoctorRegistrationForm", {
      errorMessage: null,
    });
  }

  getPatientLogin(req, res) {
    res.render("patientLogin", { errorMessage: null });
  }

  getDoctorLogin(req, res) {
    res.render("doctorLogin", { errorMessage: null });
  }

  postPatientRegister(req, res) {
    const { name, age, gender, phone, email, password } = req.body;
    patientModel.add(name, age, gender, phone, email, password, "patient");
    res.render("patientLogin", { errorMessage: null });
  }

  postPatientLogin(req, res) {
    const { email, password } = req.body;
    const user = patientModel.isValidPatient(email, password);
    if (!user) {
      return res.render("patientLogin", {
        errorMessage: "Invalid Credentials",
      });
    }
    req.session.user = user;
    res.render("index", {
      user,
    });
  }
  postDoctorRegister(req, res) {
    const { name, phone, email, password, department, gender } = req.body;
    doctorModel.add(name, phone, email, password, department, gender, "doctor");
    res.render("doctorLogin", { errorMessage: null });
  }

  postDoctorLogin(req, res) {
    const { email, password } = req.body;
    const user = doctorModel.isValidDoctor(email, password);
    if (!user) {
      return res.render("doctorLogin", {
        errorMessage: "Invalid Credentials",
      });
    }
    req.session.user = user;
    res.render("index", {
      user,
    });
  }

  getProfile(req, res, next) {
    console.log(req.session.user.role);
    if (req.session.user.role === "patient") {
      res.render("patientProfile", {
        user: req.session.user,
      });
    } else if (req.session.user.role === "doctor") {
      res.render("doctorProfile", {
        user: req.session.user,
      });
    }
  }

  postAppointment(req, res, next) {
    const { name, department, date } = req.body;

    req.session.user = patientModel.addAppointment(
      req.session.user,
      name,
      department,
      date
    );
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    let time = `${hour}:${minutes}`;

    let patientEmail = req.session.user.email;
    let appointmentDetails = {
      date,
      time,
    };
    sendConfirmationEmail(patientEmail, appointmentDetails);
    res.render("patientProfile", {
      user: req.session.user,
    });
  }

  logout(req, res) {
    // on logout, destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
    res.clearCookie("lastVisit");
  }
}

export default Controller;
