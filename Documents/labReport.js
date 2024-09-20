export const labReportTemplate = (data) => {
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
               .info-column {
                   display: flex;
                   justify-content: space-between;
                   margin-bottom: 20px;
               }
               .info-column .transaction {
                   margin-top: 10px;
               }
               .info-column div {
                   width: 48%; /* Ensure columns take equal space */
               }
               @media only screen and (max-width: 600px) {
                   .invoice-box table tr.top table td,
                   .invoice-box table tr.information table td {
                       width: 100%;
                       display: block;
                       text-align: center;
                   }
                   .info-column {
                       flex-direction: column; /* Stack items on small screens */
                   }
                   .info-column div {
                       width: 100%;
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
                                  <div class="clinic-name">Zangu-Vuga Community Clinic</div> 
                              </td>
                              <td class="right">
                                 Print date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}
                                 <br/>
                                 Issued Number: ${data[0]?.report_id}
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr class="information">
                     <td>
                        <div class="info-column">
                          <div>
                           <div class="transaction">
                             <strong>Name:</strong> ${data[0]?.patient_name}
                           </div>
                           <div class="transaction">
                             <strong>Age:</strong> ${data[0]?.patient_age}
                           </div>
                            <div class="transaction">
                             <strong>Phone:</strong> ${data[0]?.patient_phone}
                           </div>
                          </div>
                           <div>
                           <div class="transaction">
                             <strong>Sex:</strong> ${data[0]?.patient_sex}
                           </div>
                            <div class="transaction">
                             <strong>Date:</strong> ${data[0]?.date}
                           </div>
                           </div>
                        </div>
                        <div class="transaction">
                             <strong style="text-decoration:underline;">Examination:  ${data[0]?.test_name} </strong>
                        </div>
                        <div>
                          <p>${data[0]?.test_report}</p>
                        </div>
                     </td>
                  </tr>
               </table>
               <br />
            </div>
         </body>
      </html>`
};