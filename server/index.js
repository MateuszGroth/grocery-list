require('dotenv').config()
//process.env.NAME
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const port = process.env.PORT || 8000

function setNoCache(res) {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)
  res.setHeader('Expires', date.toUTCString())
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Cache-Control', 'public, no-cache')
}

function setLongTermCache(res) {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  res.setHeader('Expires', date.toUTCString())
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
}

app.use(
  '/grocery-list/', // it is tested on gh pages, so homepage is /grocery-list and not /
  express.static('../build/', {
    extensions: ['html'],
    setHeaders(res, path) {
      if (path.match(/sw\.js$/) || path.match(/service-worker\.js$/)) {
        // matches sw.js, register-sw.js
        res.setHeader('Service-Worker-Allowed', '/')
        setNoCache(res)
        return
      }
      if (path.match(/\.html$/)) {
        // matches index.html
        setNoCache(res)
        return
      }

      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        setLongTermCache(res)
      }
    },
  }),
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

app.listen(port, () => {
  console.log('LISTENING ON PORT ' + port)
})
