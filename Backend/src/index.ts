import express , {Router} from "express";
import { Accountrouter } from "./routes/account.js";
import { Userrouter } from "./routes/user.js";
import cors from "cors";


const app= express();
const Mainrouter = express.Router();

app.use(cors({ origin:"http://localhost:3000"}));
app.use(express.json())


Mainrouter.use("/app/v1/user" ,  Userrouter);
Mainrouter.use("/app/v2/account" , Accountrouter)
app.use(Mainrouter); 


app.listen(3000);

