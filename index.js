const fs = require('fs');
const http = require('http')
const Stream = require('stream').Transform
const url = process.argv[2]
const fileName = url.split('/').pop()

http.request(url, (response) => {
  const data = new Stream()

  response.on('data', (chunk) => data.push(chunk))
  response.on('end', () => fs.writeFileSync(fileName, data.read()))
}).end()
