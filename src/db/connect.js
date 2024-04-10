import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

export const connect = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`
		)
		console.log(
			`MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`
		)
	} catch (error) {
		console.log("Error while connecting to database!! ", error.message)
		process.exit(1)
	}
}
