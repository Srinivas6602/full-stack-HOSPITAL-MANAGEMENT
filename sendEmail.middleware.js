import nodemailer from "nodemailer";

export async function sendConfirmationEmail(patientEmail, appointmentDetails) {
  try {
    // Create transporter object using SMTP
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "lifesaverprojectbmsce@gmail.com",
        pass: "cflm rbdn tblg ocyt",
      },
    });

    // Construct email message
    let mailOptions = {
      from: "lifesaverprojectbmsce@gmail.com",
      to: patientEmail,
      subject: "Appointment Confirmation", // Subject line
      text: `Dear Patient,\n\nYour appointment has been successfully booked.\n\nAppointment Details:\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\n\nThank you.\n`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.log("Error occurred: ", error);
  }
}
