export const prescriptionTemplate = (data) => {
    const today = new Date();
    return `
      <!doctype html>
      <html>
         <head>
            <meta charset="utf-8">
            <title>PDF Invoice Template</title>
            <style>
               .invoice-box {
                   max-width: 800px;
                   margin: auto;
                   padding: 30px;
                   border: 1px solid #eee;
                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                   font-size: 16px;
                   line-height: 24px;
                   font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
                   color: #555;
               }
               .invoice-box table {
                   width: 100%;
                   line-height: inherit;
                   text-align: left;
                   border-collapse: collapse;
               }
               .invoice-box table td {
                   padding: 10px;
                   vertical-align: top;
               }
               .invoice-box table tr.top table td {
                   padding-bottom: 20px;
               }
               .invoice-box table tr.top table td.title {
                   font-size: 45px;
                   color: #333;
               }
               .invoice-box table tr.top table td.right {
                   text-align: right;
                   padding-bottom: 20px;
               }
               .information {
                   margin-bottom: 50px;
               }
               .invoice-box table tr.information table td {
                   padding-bottom: 40px;
               }
               .invoice-box table tr.heading td {
                   background: #eee;
                   border-bottom: 1px solid #ddd;
                   font-weight: bold;
                   text-align: left;
               }
               .invoice-box table tr.details td {
                   padding-bottom: 20px;
               }
               .invoice-box table tr.item td {
                   border-bottom: 1px solid #eee;
               }
               .invoice-box table tr.item.last td {
                   border-bottom: none;
               }
               .invoice-box table tr.total td:nth-child(2) {
                   border-top: 2px solid #eee;
                   font-weight: bold;
               }
               .justify-left {
                   text-align: left;
               }
               .title-container {
                   text-align: left;
               }
               .clinic-name {
                   font-size: 15px; /* Decreased font size */
                   margin-top: 5px; /* Small gap between image and clinic name */
               }
               .info-column {
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
               }
               .info-column strong {
                   margin-bottom: 5px;
               }
               .info-column .transaction {
                   margin-top: 10px;
               }
               @media only screen and (max-width: 600px) {
                   .invoice-box table tr.top table td,
                   .invoice-box table tr.information table td {
                       width: 100%;
                       display: block;
                       text-align: center;
                   }
               }
            </style>
         </head>
         <body>
            <div class="invoice-box">
               <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                     <td colspan="6">
                        <table>
                           <tr>
                              <td class="title-container">
                                  <img src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?t=st=1726320888~exp=1726324488~hmac=66f3fc1857fbcb466fd31d1c67e069d42bd8725a1b71c0fc66d16a25ec916b5c&w=740"
                                       style="width:100%; max-width:150px;">
                                  <div class="clinic-name">Zangu-Vuga Community Clinic</div> <!-- Small font and aligned below image -->
                              </td>
                              <td class="right">
                                 Print date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}
                                 <br/>
                                 Issued Number: ${data[0]?.prescription_id}
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr class="information">
                     <td colspan="6">
                        <div class="info-column">
                           <strong>Name:</strong> ${data[0]?.patient_name}
                           <div class="transaction">
                             <strong>Age:</strong> ${data[0]?.patient_age}
                           </div>
                            <div class="transaction">
                             <strong>Phone:</strong> ${data[0]?.patient_phone}
                           </div>
                           <div class="transaction">
                             <strong>Sex:</strong> ${data[0]?.patient_sex}
                           </div>
                        </div>
                     </td>
                  </tr>
    
                  <tr class="heading">
                    <td>S.No.</td>
                     <td>Medicine</td>
                     <td>Dosage</td>
                     <td>Duration</td>
                     <td>Prescriber</td>
                     <td>OutSource</td>
                     <td>Date</td>
                  </tr>
                  <tr class="item">
                     <td>1</td>
                     <td>${data[0]?.medication}</td>
                     <td>${data[0]?.dosage}</td>
                     <td>${data[0]?.duration}</td>
                     <td>${data[0]?.doctor_name}</td>
                     <td>Yes</td>
                     <td>${data[0]?.date}</td>
                  </tr>
               </table>
               <br />
            </div>
         </body>
      </html>`
 };