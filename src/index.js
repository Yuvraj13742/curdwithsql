const express=require("express")
const  cors=require("cors")
const  dotenv=require("dotenv")
const pool = require('./config/db');
const userRoutes=require("./routes/userRoutes")
const  errorHandling=require("./middleware/errorHandler")
const createUserTable=require("./data/createUserTable")
dotenv.config()

const app=express();

const port=process.env.PORT || 3001

app.use(express.json())
app.use(cors());

/**app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(`The database name is: ${result.rows[0].current_database}`);
    } catch (error) {
        console.error("Error executing query:", error.stack);
        res.status(500).send("Error querying the database.");
    }
});**/

//middlewar
app.use(errorHandling)

//create  table before statring the server
//createUserTable()

//routes
app.use("/api", userRoutes);

app.listen(8000,()=>{
    console.log(`server is running at port 8000`)
})