const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

app.get('/authorize', (req, res) => {
  res.send({
    'redirectLink': 'https://www.reddit.com/api/v1/authorize?client_id=Z4DY5cYfHe2YN2H8MrytJg&response_type=code&state=hey&redirect_uri=http://localhost:5000/getToken&duration=temporary&scope=identity'
  });
});

app.get('/getToken', (req, res) => {
  console.log(req.query);
  res.redirect('http://localhost:3000');
});