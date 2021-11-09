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

let movies;

fs.readFile("./movies.json",(err,data)=>{
  movies=JSON.parse(data.toString());
  res.status(201).json(movies);
});

function addtofile(movie)
{
    fs.writeFile("./movies.json",JSON.stringify(movie),()=>{
        console.log("add");
        
    })
}



app.get("/movies", (req, res) => {
    

    if (movies.length) {
        res.status(200);
        res.json(movies);
      } else {
        res.status(404);
        res.json("movies not found");
      }
    

});

app.get("/notdeletmov", (req, res) => {

    
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
      

    

})

app.get("/movieid", (req, res) => {

    const {id} = req.query;

   
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
        

    

})

app.post("/create", (req, res) => {
    
    
    const { id, name, isfave,isdeleted } = req.body;
    const newmovie = {
      id: req.body.id,
      name: req.body.name,
      isfave: req.body.isfave,
      isdeleted: req.body.isdeleted
    };
    movies.push({ id, name, isfave,isdeleted });
    addtofile(movies);

  });

  app.put("/put", (req, res) => {
    let check=false;
    const { id } = req.query;
    const {name ,isfave,isdeleted}=req.body;
    movies.foreach(movie=>{
      if(movie.id == id){
        check=true;
        if(name != undefined) movie.name=req.body.name;
        if(isfave != undefined) movie.isfave =req.body.name;
        if(isdeleted != undefined) movie.isdeleted=req.body.isdeleted;
      }
    })
    if (check) {
      addtofile(movies)
      
    } else {
      res.status(404);
      res.json("movie not found");
    }

  });

  app.delete("/delete", (req, res) => {
    let check=false;
    const { id } = req.query;
    movies.foreach(movie=>{
      if(movie.id == id){
        movie.isdeleted = true;
        check= true;
      }
    })
    if (check) {
     
      addtofile(movies)
      } else {
      res.status(404);
      res.json("movie not found");
    }

  });
  



   
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
      });