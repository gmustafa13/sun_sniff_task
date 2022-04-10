const express = require('express');
const app = express();
// const fs = require('fs');
const routes = require('./src/routes/index')
/**
 * global level func/veriable
 */
require('./src/utils/global')

/**
 * required db setup
 */

require('./src/utils/db')

//  require('./public/output-onlinetsvtools')

// fs.readFile('./public/cities_canada-usa.tsv',(err,data)=>{
// if(err){
//     console.log("err",err);
// }else{
//     let result = data.toString()
//     // console.log("result",result);
//     tsv_json(result)
// }

// })
// const tsv_json = (data)=>{
//     console.log("hh",data.split('\t'));
//     // let final_data =[]
//     // for (var i = 0; i < data.length; i++) {
//     //     console.log(data[0]);
//     //     // var w = v[i].split("\t");
//     //     // final_data.push({
//     //     //   id: w[0],
//     //     //   name: w[1],
//     //     //   : w[2]
//     //     // });
//     //   }

// }



app.use(express.json())

// router
routes(app)


// app.get('/ping',(req,res)=>{
// res.send('Pong')
// })


const port = (process.env.NODE_ENV != "production" ? 3000 : port)

app.listen(port, () => {
    console.log(`listening port ${port}!`);
});