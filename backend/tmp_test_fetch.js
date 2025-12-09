const http = require('http');

http.get('http://localhost:5000/api/events', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { console.log(data); process.exit(0); });
}).on('error', (err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
