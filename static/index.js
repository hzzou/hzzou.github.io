// ES module (ESM)环境

import http from "http";
import fs from "fs";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
console.log(__dirname);

const serverOne = http.createServer((req,  res)=>{
  fs.readFile(__dirname+"/effects/picture.js", (err, data)=>{
    //console.log(data);
    if(data){
      console.log(res.statusCode);
      console.log(res.end);
      res.end(data);
    }
  })
});

serverOne.listen(8081, ()=>{
  console.log("正在监听 8081");
})
