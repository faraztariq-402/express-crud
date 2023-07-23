import express from 'express'
let router = express.Router()


router.post('/login', (req, res) => {
    res.send('this is login v2' + new Date())
  })
  router.post('/signup', (req, res) => {
    res.send('this is signup v2' + new Date())
  })

  export default router