// import jwt from "jsonwebtoken";
// import db from "../db.js";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();


// // Setup nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.OTP_EMAIL,
//     pass: process.env.OTP_PASS,
//   },
// });

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("Transporter verification error:", error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// // sendOtp function now returns a Promise
// const sendOtp = async ({ staff_id, email }) => {
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
//     // Mail options
//     const mailOptions = {
//       from: process.env.OTP_EMAIL,
//       to: email,
//       subject: 'Verify your email',
//       html: `<p>Enter <b>${otp}</b> in the app to verify. The OTP will expire in 1 hour.</p>`,
//     };

//     // Hash the OTP
//     const saltRounds = 10;
//     const hashedOtp = await bcrypt.hash(otp, saltRounds);

//     const query = 'INSERT INTO otp(staff_id, otp, expiresAt) VALUES(?, ?, ?)';
//     const expiresAt = Date.now() + 3600000; // 1 hour from now

//     // Insert the OTP into the database
//     await new Promise((resolve, reject) => {
//       db.query(query, [staff_id, hashedOtp, expiresAt], (err, data) => {
//         if (err) {
//           console.error("Failed inserting OTP:", err);
//           return reject("Failed inserting OTP");
//         }
//         resolve();
//       });
//     });

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     return { message: 'OTP sent successfully', id: staff_id, email };
//   } catch (error) {
//     console.error("Error in sendOtp:", error);
//     throw new Error(error + 'error occurs');
//   }
// };

// const generateToken = (id, key, email,) =>{
//     jwt.sign({id, email}, key, {expiresIn:'5s'})
// }

// const generateRefreshToken = (id, key, email) =>{
//     jwt.sign({id, email }, key, {expiresIn:'1h'})
// }

// export const login = async (req, res) => {
//   try {
//     const query = "SELECT * FROM staff WHERE email = ? AND role = ?";
//     const { email, role, password } = req.body;

//     db.query(query, [email, role], async (err, data) => {
//       if (err) {
//         console.error("Database query error:", err);
//         return res.status(500).json(err);
//       }
//       if (data.length === 0) {
//         console.warn("User not found:", { email, role });
//         return res.status(404).json({ message: "User not found!" });
//       }

//       const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
//       if (!isPasswordCorrect) {
//         console.warn("Wrong username or password:", { email, role });
//         return res.status(400).json("Wrong username or password!");
//       }

//       const token = jwt.sign({id:data[0].staff_id, email:data[0].email}, "jwt_key",{expiresIn:'10s'})
//       const refreshToken = jwt.sign({id:data[0].staff_id, email:data[0].email}, "refresh_key",{expiresIn:'1h'})

//       const cookieOptions = {
//         httpOnly: true,
//         maxAge: 600000,
//       };

//       res.cookie('token', token, { maxAge: 30000, httpOnly: true });
//       res.cookie('refreshToken', refreshToken, cookieOptions);

//       try {
//         const otpResponse = await sendOtp({ staff_id: data[0].staff_id, email: data[0].email });
//         return res.status(200).json({ message: `Login success`, token, refreshToken, data});
//       } catch (error) {
//         console.error("Error in sendOtp:", error);
//         return res.status(500).json({ error: error.message });
//       }
//     });
//   } catch (error) {
//     console.error("Internal server error:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const verifyOtp = async (req, res) => {
//     try {
//       const query = 'SELECT * FROM otp WHERE staff_id = ?';
//       const { otp } = req.body;
//       const staff_id = req.params.id;
  
//       db.query(query, [staff_id], (err, data) => {
//         if (err) {
//           return res.status(500).json({ error: "Internal server error" });
//         }
  
//         if (data.length === 0) {
//           return res.status(404).json({ message: "User not found" });
//         }

//         const { expiresAt, otp: hashedOtp } = data[0];
  
//         if (expiresAt < Date.now()) {
//           const deleteQuery = 'DELETE FROM otp WHERE staff_id = ?';
//           db.query(deleteQuery, [staff_id], (deleteErr, deleteData) => {
//             if (deleteErr) {
//               return res.status(500).json({ error: "Error deleting expired OTP" });
//             }
//             return res.status(400).json({ message: "OTP expired" });
//           });
//         } else {
//           const isOTPMatch = bcrypt.compareSync(otp, hashedOtp);
//           if (!isOTPMatch) {
//             return res.status(400).json({ message: "Incorrect OTP" });
//           }
  
//           const updateQuery = "UPDATE otp SET verify = ? WHERE staff_id = ?";
//           db.query(updateQuery, [true, staff_id], (updateErr, updateData) => {
//             if (updateErr) {
//               return res.status(500).json({ error: "Error updating OTP verification" });
//             }
  
//             const deleteVerifiedQuery = "DELETE FROM otp WHERE staff_id = ?";
//             db.query(deleteVerifiedQuery, [staff_id], (deleteVerifiedErr, deleteVerifiedData) => {
//               if (deleteVerifiedErr) {
//                 return res.status(500).json({ error: "Error deleting verified OTP" });
//               }
//               return res.status(200).json({
//                 message: 'User has successfully verified',
//                 status: "Verified"
//               });
//             });
//           });
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };  


import jwt from "jsonwebtoken";
import db from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Transporter verification error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


// sendOtp function now returns a Promise
const sendOtp = async ({ staff_id, email }) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Mail options
    const mailOptions = {
      from: process.env.OTP_EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<p>Enter <b>${otp}</b> in the app to verify. The OTP will expire in 1 hour.</p>`,
    };

    // Hash the OTP
    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    const query = 'INSERT INTO otp(staff_id, otp, expiresAt) VALUES(?, ?, ?)';
    const expiresAt = Date.now() + 3600000; // 1 hour from now

    // Insert the OTP into the database
    await db.query(query, [staff_id, hashedOtp, expiresAt]);

    // Send the email
    await transporter.sendMail(mailOptions);
    return { message: 'OTP sent successfully', id: staff_id, email };
  } catch (error) {
    console.error("Error in sendOtp:", error);
    throw new Error(error + 'error occurs');
  }
};

const generateToken = (id, key, email) => {
  return jwt.sign({ id, email }, key, { expiresIn: '5s' });
};

const generateRefreshToken = (id, key, email) => {
  return jwt.sign({ id, email }, key, { expiresIn: '1h' });
};

export const login = async (req, res) => {
  try {
    const query = "SELECT * FROM staff WHERE email = ? AND role = ?";
    const { email, role, password } = req.body;

    const [data] = await db.query(query, [email, role]);
    if (data.length === 0) {
      console.warn("User not found:", { email, role });
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) {
      console.warn("Wrong username or password:", { email, role });
      return res.status(400).json("Wrong username or password!");
    }

    const token = generateToken(data[0].staff_id, "jwt_key", data[0].email);
    const refreshToken = generateRefreshToken(data[0].staff_id, "refresh_key", data[0].email);

    const cookieOptions = {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      sameSite: 'Strict', // adjust as necessary
      secure: process.env.NODE_ENV === 'production' // true in production
  };

    res.cookie('token', token, { maxAge: 30000, httpOnly: true });
    res.cookie('refreshToken', refreshToken, cookieOptions);

    try {
      const otpResponse = await sendOtp({ staff_id: data[0].staff_id, email: data[0].email });
      return res.status(200).json({ message: `Login success`, token, refreshToken, data });
    } catch (error) {
      console.error("Error in sendOtp:", error);
      return res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const query = 'SELECT * FROM otp WHERE staff_id = ?';
    const { otp } = req.body;
    const staff_id = req.params.id;

    const [data] = await db.query(query, [staff_id]);
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { expiresAt, otp: hashedOtp } = data[0];

    if (expiresAt < Date.now()) {
      const deleteQuery = 'DELETE FROM otp WHERE staff_id = ?';
      await db.query(deleteQuery, [staff_id]);
      return res.status(400).json({ message: "OTP expired" });
    } else {
      const isOTPMatch = bcrypt.compareSync(otp, hashedOtp);
      if (!isOTPMatch) {
        return res.status(400).json({ message: "Incorrect OTP" });
      }

      const updateQuery = "UPDATE otp SET verify = ? WHERE staff_id = ?";
      await db.query(updateQuery, [true, staff_id]);

      const deleteVerifiedQuery = "DELETE FROM otp WHERE staff_id = ?";
      await db.query(deleteVerifiedQuery, [staff_id]);

      return res.status(200).json({
        message: 'User has successfully verified',
        status: "Verified"
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};