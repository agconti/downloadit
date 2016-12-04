const fs = require('fs');
const http = require('http')
const https = require('https')
const Stream = require('stream').Transform
const url = require('url')
const resources = process.argv.slice(2)


function chooseEngine(resource) {
  const protocol = url.parse(resource).protocol

  if (protocol == 'https:') {
    return https
  }

  if (protocol == 'http:') {
    return http
  }
}


function download (resource) {
  const engine = chooseEngine(resource)
  engine.request(resource, response => {
    const data = new Stream()
    const fileName = resource.split('/').pop()

    response.on('data', chunk => data.push(chunk))
    response.on('end', () => {
      fs.writeFileSync(fileName, data.read())
      process.stdout.write(`${fileName}\r`)
    })
  }).end()
}


resources.forEach(resource => download(resource))
