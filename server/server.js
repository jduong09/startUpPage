const express = require('express');
const dotenv = require('dotenv');
const crypto = require('crypto');
const axios = require('axios');
const btoa = require('btoa');
const qs = require('qs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const generatedState = crypto.randomBytes(64).toString('hex');

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

app.get('/authorize', (req, res) => {
  console.log(process.env.PORT);
  console.log(process.env.REDDIT_CLIENT_ID);
  res.send({
    'redirectLink': `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=${generatedState}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=temporary&scope=identity`
  });
});

app.get('/reddit_redirect_uri', async (req, res) => {
  const { state, code } = req.query;

  if (state === generatedState) {
    // Make a POST request with code to retrieve access token.
    const base64 = btoa(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`);
    
    await axios({
      method: 'POST',
      url: 'https://www.reddit.com/api/v1/access_token',
      headers: {
        'Authorization': `Basic ${base64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDDIT_REDIRECT_URI
      })
    }).then((data) => data.data)
      .then((token) => {
        axios({
          method: 'GET',
          url: 'https://oauth.reddit.com/api/v1/me',
          headers: {
            'Authorization': `bearer ${token.access_token}`
          }
        })
          .then((data) => console.log(data));
      });
  } else {
    // CSRF attack, states don't match and redirect to home.
    console.log('we have a problem');
  }
});