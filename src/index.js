/* eslint-disable no-undef */
import server from "./socket.js";
import dbConnect from "./db/index.js";

dbConnect()
  .then(() => {
    console.log("Connected to the database");
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.messsage);
    process.exit(1); // Exit the process with an error code
  });
