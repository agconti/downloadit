const fs = require('fs');
const http = require('http')
const https = require('https')
const Stream = require('stream').Transform
const url = require('url'),
const resource = process.argv[2]
const fileName = resource.split('/').pop()
const protocol = url.parse(inputUrl).protocol
let engine


if (protocol == 'https') {
  engine = https
}

if (protocol == 'http') {
  engine = http
}

engine.request(resource, (response) => {
  const data = new Stream()

  response.on('data', (chunk) => data.push(chunk))
  response.on('end', () => fs.writeFileSync(fileName, data.read()))
}).end()
