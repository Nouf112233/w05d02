const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());
const fs=require("fs");



// const movies=[{id:1 , name:"The Wretched" ,isfave:false ,isdeleted:false},
// {id:2 , name:"The Lodge" ,isfave:false ,isdeleted:true},
// {id:3 , name:"Blood Quantum" ,isfave:false ,isdeleted:false},
// {id:4 , name:"Sputnik" ,isfave:false ,isdeleted:false},
// {id:5 , name:"1BR" ,isfave:false ,isdeleted:false}]



function addtofile(movie)
{
    fs.writeFile("./movies.json",JSON.stringify(movie),()=>{
        console.log("add");
        
    })
}



app.get("/movies", (req, res) => {
    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());

    if (movies.length) {
        res.status(200);
        res.json(movies);
      } else {
        res.status(404);
        res.json("movies not found");
      }
    
});
});

app.get("/notdeletmov", (req, res) => {

    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());
        const found = movies.filter(ele => {
            return ele.isdeleted === false;
          });
        
          if (found.length) {
            res.status(200);
            res.json(found);
          } else {
            res.status(404);
            res.json("movies not found");
          }
      

    });

})

app.get("/movieid", (req, res) => {

    const {id} = req.query;

    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());
        const found = movies.find(ele => {
            return ele.id == id;
          });
        
          if (found) {
            res.status(200);
            res.json(found);
          } else {
            res.status(404);
            res.json("movies not found");
          }
        

    });

})

app.post("/create", (req, res) => {
    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());
    
    const { id, name, isfave,isdeleted } = req.body;
    const newmovie = {
      id: req.body.id,
      name: req.body.name,
      isfave: req.body.isfave,
      isdeleted: req.body.isdeleted
    };
    movies.push({ id, name, isfave,isdeleted });
    addtofile(movies);
    res.status(200);
    res.json({ id, name, isfave,isdeleted });
});
  });

  app.put("/put", (req, res) => {
    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());
    const { id } = req.query;
    const found = movies.find((ele) => {
      return ele.id== id;
    });
    if (found) {
      let update = {
        id: found.id,
        name: found.name,
        isfave: req.body.isfave,
        isdeleted:req.body.isdeleted
      };
      let targetIndex = movies.indexOf(found);
      console.log(targetIndex)
      movies.splice(targetIndex, 1, update);
      addtofile(movies);
      res.json(movies);
    } else {
      res.status(404);
      res.json("movie not found");
    }
});
  });

  app.delete("/delete", (req, res) => {
    fs.readFile("./movies.json",(err,data)=>{
        let movies=JSON.parse(data.toString());
    const { id } = req.query;
    const found = movies.find(ele => ele.id == id); 
    if (found) {
      let targetIndex = movies.indexOf(found);
      console.log(targetIndex)
      movies.splice(targetIndex, 1);
      res.status(200);
      addtofile(movies);
      res.json(movies);
      } else {
      res.status(404);
      res.json("movie not found");
    }
})
  });
  



   
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
      });