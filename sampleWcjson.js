const http = require('http');
const querystring = require('querystring');

const URL = 'https://anshulmie.webchartnow.com/webchart.cgi?';
const USERNAME = 'abroa01';
const PASSWORD = '$K@ter0707';
let COOKIE = null;

const initializeSession = () => {
  return new Promise((resolve, reject) => {
    const loginData = querystring.stringify({
      login_user: USERNAME,
      login_passwd: PASSWORD
    });

    const options = {
      hostname: 'anshulmie.webchartnow.com',
      path: '/webchart.cgi',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': loginData.length
      }
    };

    const req = http.request(options, (res) => {
      const cookies = res.headers['set-cookie'];
      if (cookies) {
        COOKIE = cookies[0].split('=')[1].split(';')[0];
        resolve(COOKIE);
      } else {
        reject(new Error('Session failed to initialize'));
      }
    });

    req.write(loginData);
    req.end();
  });
};

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const params = querystring.stringify({
      f: 'json',
      session_id: COOKIE,
      apistring: Buffer.from(url).toString('base64')
    });

    const options = {
      hostname: 'anshulmie.webchartnow.com',
      path: `/webchart.cgi?${params}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
};

const requests = {
  'Last Name LIKE "Hart"': 'GET/db/patients/LIKE_last_name=Hart',
  'Last Name LIKE "Pregnant"': 'GET/db/patients/LIKE_last_name=Pregnan'
};

initializeSession()
  .then(() => {
    for (const [title, url] of Object.entries(requests)) {
      console.log(`\nQuerying for patients: ${title}`);
      makeRequest(url)
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  .catch((err) => {
    console.error(err);
  });