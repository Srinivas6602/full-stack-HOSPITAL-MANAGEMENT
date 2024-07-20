export default class doctorModel {
  constructor(id, name, phone, email, password, department, gender, role) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.department = department;
    this.gender = gender;
    this.role = role;
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

  static add(name, phone, email, password, department, gender, role) {
    let newDoctor = new doctorModel(
      doctors.length + 1,
      name,
      phone,
      email,
      password,
      department,
      gender,
      role
    );
    doctors.push(newDoctor);
  }

  static getById(id) {
    return patients.find((p) => p.id == id);
  }

  static isValidDoctor(email, password) {
    const result = doctors.find(
      (p) => p.email == email && p.password == password
    );
    return result;
  }
}

var patients = [];
var doctors = [];
