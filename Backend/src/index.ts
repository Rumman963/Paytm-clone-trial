import express , {Router} from "express";
import { Accountrouter } from "./routes/account.js";
import { Userrouter } from "./routes/user.js";
import cors from "cors";


const app= express();


app.use(cors(
    { origin:[
        "http://localhost:3000",
         "http://localhost:5173"
    ]   

    })
);
app.use(express.json())

const Mainrouter = express.Router();


Mainrouter.use("/app/v1/user" ,  Userrouter);
Mainrouter.use("/app/v2/account" , Accountrouter)
app.use(Mainrouter); 


app.listen(3000);

