export const invoiceTemplate = (data) => {
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
                                Receipt Number: ${data[0]?.invoice_id}
                             </td>
                          </tr>
                       </table>
                    </td>
                 </tr>
                 <tr class="information">
                    <td colspan="6">
                       <div class="info-column">
                          <strong>Patient Name:</strong> ${data[0]?.patient_name}
                          <div class="transaction">
                            <strong>Transaction ID:</strong> ${data[0]?.transaction_id}
                          </div>
                       </div>
                    </td>
                 </tr>
   
                 <tr class="heading">
                    <td>Title</td>
                    <td>Amount(Ghc)</td>
                    <td>Accountant</td>
                    <td>Date</td>
                    <td>Method</td>
                    <td>Status</td>
                 </tr>
                 <tr class="item">
                    <td>${data[0]?.title}</td>
                    <td>${data[0]?.amount}</td>
                    <td>${data[0]?.accountant_name}</td>
                    <td>${data[0]?.date}</td>
                    <td>${data[0]?.method}</td>
                    <td>${data[0]?.status}</td>
                 </tr>
                 <tr class="total">
                    <td colspan="5"></td>
                    <td>
                       Total: Ghc${data[0]?.amount}
                    </td>
                 </tr>
              </table>
              <br />
              <h2 class="justify-left">Total price: Ghc${data[0]?.amount}</h2> 
           </div>
        </body>
     </html>`
};