import jwt from "jsonwebtoken";
import db from "../db.js";



//DEPLOYMENT MODE
// export const login = async (req, res) => {
//   const query = "SELECT * FROM staff WHERE email = ? AND role = ?";
//   const { email, role } = req.body;

//   try {
//     const [rows] = await db.query(query, [email, role]);

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     // const isPasswordCorrect = bcrypt.compareSync(req.body.password, rows[0].password);
//     // if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

//     const token = jwt.sign({ id: rows[0].staff_id }, "jwt_key");
//     return res.status(200).json({ message: "Login success", token, data: rows[0] });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// DEVELOPMENT MODE
export const login = (req, res) =>{
  const query = "SELECT * FROM staff WHERE email = ? AND role =?";
  const {email, role} = req.body;
  db.query(query, [email, role], (err, data)=>{

      if(err) return res.status(500).json(err)
      if(data.length === 0) return res.status(404).json({message:"User not found!"})

      // const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
      // if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

       const token = jwt.sign({id:data[0].staff_id}, "jwt_key");
       return res.status(200).json({message:"login success", token, data })
    
  })
}