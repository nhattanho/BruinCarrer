// const express = require("express");
// const router = express.Router();
// const Search = require("../models/Search");
// const Project = require("../models/Project);
// /*======================================POST method===================================*/
// async function search_title(keyword) { 
//     let reg = new RegExp(keyword,'i');
//     let params = {
//         pname:{$regex:reg}
//     }; 
//     let model = Search.find(params);
//     try {
//         let ret = await new Promise((resolve,reject)=>{
//             model.exec(function(err,doc){
//                 if(err){
//                     reject('fail to find set by title:'+keyword);
//                 }else{
//                     if(!doc.length){
//                         reject('the result is empty search by title:'+keyword);
//                     }else{
//                         resolve(doc);
//                     }
//                 }
//             });
//         });
//         return ret;
//     } catch (error) {
//         throw err;
//     }  
//  }

// router.get("/title", async (req, res) => {
//     const { title } = req.query;
//     console.log(`${title}`);

//     Search.search_title(title).then((data)=>{
//         console.log(data);
//         res.send({ 
//             success: true, 
//             message: "Success find!",
//             result:data});
//     }).catch((err)=>{
//         console.log("do not have any related project!");
//         res.send({        
//             success: false,
//             message: "You have not have any projects!",});
//     })

//   });

// /*======================================POST method===================================*/
// SEARCH DEPENDS ON home.jsx button's value
// SEARCH PARA CAN BE ANYTHING LISTED IN THE DROPDOWN
//
// async function search(para, keyword) {
//     Project.find({ para: keyword }, async (err, projects) => {
//     console.log("projects", projects);
//     if (projects.length > 0) {
//       res.send({ success: true, message: "Success!", projects: projects });
//     } else {
//       console.log("Cannot find any matched projects");
//       res.send({
//         success: false,
//         message: "Cannot find any matched projects",
//       });
//     }
//   });
// });
//
// router.get("searchPara/:searchField/searchVal/:searchValue", async (req, res) => {
//     const searchField = req.query.searchField;
//     const searchValue = req.query.searchValue;
//     console.log(`${searchField} ` + '${searchValue}');
//
//     Project.search(searchField, searchValue).then((data)=>{
//         console.log(data);
//         res.send({
//             success: true,
//             message: "Success find!",
//             result:data});
//     }).catch((err)=>{
//         console.log("do not have any related project!");
//         res.send({
//             success: false,
//             message: "You have not have any projects!",});
//     })

//   });

// /*======================================GET method===================================*/
// get all projects by category
// router.get("/Category/:cat", async (req, res) => {
//     const cat = req.query.cat;
//     console.log(`${cat}`);
//
//     Project.find({ category: cat }, async (err, projects) => {
// //     console.log("projects", projects);
// //     if (projects.length > 0) {
// //       res.send({ success: true, message: "Projects filtered by category", projects: projects });
// //     } else {
// //       console.log("Cannot find any matched projects");
// //       res.send({
// //         success: false,
// //         message: "Cannot find any matched projects",
// //       });
// //     }
// //   });

// module.exports = router;