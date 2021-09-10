const screenshot = require('screenshot-desktop')
const fs = require('fs')
const path = require('path')
const getPixels = require('get-pixels')

const getScreenSize = (img) => {
  const imgPath = path.resolve(__dirname, './win.png')
  fs.writeFileSync(imgPath, img)
  return new Promise((resolve, reject) => {
    getPixels(imgPath, function (err, pixels) {
      if (err) {
        console.log('Bad image path')
        return
      } else {
        resolve({
          width: pixels.shape[0],
          height: pixels.shape[1],
        })
      }
    })
  })
}
module.exports = (socket) => {
  setInterval(() => {
    screenshot({ format: 'png' })
      .then((img) => {
        getScreenSize(img)
          .then(({ width, height }) => {
            socket.emit('screensize', { width, height })
          })
          .catch((err) => {
            console.log(err)
          })
        socket.emit('src', img)
      })
      .catch((err) => {})
  }, 500)
  socket.on('userevent', (msg) => {
    console.log(msg)
  })
}
