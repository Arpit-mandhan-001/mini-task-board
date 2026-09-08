import dotenv from "dotenv";
import connectDb from "./config/database";
import app from "./app";

dotenv.config();

// first connect Database
connectDb()
.then(() => {
    const PORT = process.env.PORT || 8000;
    
    // if Db connected, then only start the server
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  // if DB connection failed, server will not start
  .catch((err) => {
    console.error("MySQL connection failed", err);
  });