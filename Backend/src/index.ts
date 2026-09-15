import express , {Router} from "express";
import { Accountrouter } from "./routes/account.js";
import { Userrouter } from "./routes/user.js";
import cors from "cors";


const app= express();


app.use(cors(
    { origin:[
         "https://paytm-clone-trial-umber.vercel.app/"
    ]   

    })
);
app.use(express.json())

const Mainrouter = express.Router();


Mainrouter.use("/app/v1/user" ,  Userrouter);
Mainrouter.use("/app/v2/account" , Accountrouter)
app.use(Mainrouter); 


app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", time: new Date().toISOString() });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
