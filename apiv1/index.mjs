import express from 'express';
let router = express.Router()
import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'


// /api/v1/
router.use(authRouter)


router.use((req, res, next) => {
    const token = "valid"
    if (token === "valid") {
        next();
    } else {
        res.status(401).send({ message: "invalid token" })
    }
})

router.use(commentRouter)
router.use(postRouter)
router.use(feedRouter)



export default router