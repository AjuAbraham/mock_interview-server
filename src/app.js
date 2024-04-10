import express from "express"
import cors from "cors"
import errorHandler from "./middlewares/error.middleware.js";
const app = express()

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "15kb", extended: true }))
app.use(express.static("public"))



//routes

import userRouter from "./routes/user.route.js";




app.use('/api/v1/user',userRouter);

app.use(errorHandler);
export default app
