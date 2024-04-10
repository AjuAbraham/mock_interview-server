import app from "./app.js"
import {connect} from "./db/connect.js"
import dotenv from "dotenv"

dotenv.config({
	path: "./.env",
})

connect()
	.then(() => {
		app.on("error", () => {
			console.log("Express error is: ", error)
		})
		app.listen(process.env.PORT|| 8000,()=>{
			console.log(`App is listining on PORT: ${process.env.PORT}`)
		})
	})
	.catch(error => {
		console.log("error at connecting express",error.message)
	})
