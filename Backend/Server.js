const crypto = require('crypto');
const axios = require('axios');
const express = require('express');
// const QRCode = require('qrcode'); // Uncomment if QR code generation is needed
const app = express();

app.get('/', async (req, res) => {
  try {
    const merchantTransactionId = 'M' + Date.now();
    // const upiId = 'your-upi-id@bank'; // Replace with your UPI ID if needed

    const salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    const merchant_id = 'PGTESTPAYUAT';

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: 'MUID' + '123',
      name: 'tanmay',
      amount: 100,
      redirectUrl: `http://localhost:8000/api/v1/status/${merchantTransactionId}`,
      redirectMode: 'POST',
      mobileNumber: 8791281181,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const stringToHash = payloadMain + '/pg/v1/pay' + salt_key;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256 + '###' + keyIndex;
    const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: 'POST',
      url: prod_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payloadMain
      }
    };

    try {
      const response = await axios.request(options);
      const paymentUrl = response.data?.data?.instrumentResponse?.redirectInfo?.url;

      if (!paymentUrl) {
        throw new Error('Payment URL not found in response');
      }

      // If QR code generation is needed
      // const upiUrl = `upi://pay?pa=${upiId}&mc=0000&tid=${merchantTransactionId}&tr=${merchantTransactionId}&tn=Payment&am=100&cu=INR&url=${paymentUrl}`;
      // const qrCodeDataURL = await QRCode.toDataURL(upiUrl);

      res.json({
        url: paymentUrl
        // url: qrCodeDataURL // Uncomment if QR code is used
      });
    } catch (error) {
      console.error('Error in API request:', error.message);
      res.status(500).json({
        message: error.message,
        success: false
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
