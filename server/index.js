import express from "express"
import cors from "cors"
import { MedanPedia } from "@bolaxdd/medanpedia"

const app = express();
app.use(express.json());
app.use(cors());

const ID = "";
const ApiKey = "b7pv0k-snwpbr-xap41z-dl0uho-2q8iwr";
const mp = new MedanPedia(ID, ApiKey)

const isFav = false
const result = await mp.getServices(isFav)
console.log(result)

const port = 3000;
app.listen(port, () => {
    console.log("Server Berjalan di Port " + port);
})