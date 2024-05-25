//import
import express from "express";
import { format } from "date-fns";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from 'url';

//Declaration and Initialization

const app = express();
const PORT = 4001;
//joining path of directory 
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const directorypath = path.join(__dirname,'TimeStamp');
console.log(directorypath);


//Middleware
app.use(express.json());

// Routes
let filelocation;
app.get(`/create`,(req,res)=>{
 let datetoday = format(new Date(),`dd-MM-yyyy HH-mm-ss`);
 console.log(datetoday);
 filelocation = `TimeStamp/${datetoday}.txt`;
 fs.writeFileSync(filelocation,`${datetoday}`,'utf-8');
 res.status(200).send(`${datetoday}.txt created under TimeStamp folder`);
})

app.get(`/read`,(req,res)=>{
    let txtfile=[];
    fs.readdir(directorypath,(err,files)=>{
        files.forEach((item)=>{
              txtfile.push(item);
        });
        res.status(200).send(txtfile.join('<br/>'));
    });
    

})

//running port

app.listen(PORT,()=>{
    console.log(`App is listening on the port ${PORT}`);
})