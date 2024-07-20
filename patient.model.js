export default class patientModel {
  constructor(id, name, age, gender, phone, email, password, role) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.role = role;
    this.appointment = [];
  }

  static getAll() {
    return patients;
  }

  static update(patientObj) {
    const index = patients.findIndex((p) => p.id == patientObj.id);
    patients[index] = patientObj;
  }

  static delete(id) {
    const index = patients.findIndex((p) => p.id == id);
    patients.splice(index, 1);
  }

  static add(name, age, gender, phone, email, password, role) {
    let newPatient = new patientModel(
      patients.length + 1,
      name,
      age,
      gender,
      phone,
      email,
      password,
      role
    );
    patients.push(newPatient);
  }

  static getById(id) {
    return patients.find((p) => p.id == id);
  }

  static isValidPatient(email, password) {
    const result = patients.find(
      (p) => p.email == email && p.password == password
    );
    return result;
  }

  static addAppointment(patientObj, name, department, date) {
    const index = patients.findIndex((p) => {
      if (p.email === patientObj.email && p.password === patientObj.password)
        return p;
    });
    const appointmentObj = {
      number: patients[index].appointment.length + 1,
      name,
      department: department[0],
      doctor: department[1],
      date,
    };
    patients[index].appointment.push(appointmentObj);
    return patients[index];
  }
}

var patients = [];
var doctors = [];
