import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
            margin: theme.spacing(1)            
      },
    },
    textField: {
        width: 450
    }, formDiv: {
        display: "inline-block",
        position: "absolute",
        border: "2px solid #0070FF",
        right: 55,
        top: 90
    }
}));

export default function AddBookView() {
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [url, setURL] = useState("");
    const [rating, setRating] = useState("");
    const classes = useStyles();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const book = {author, year, url, rating};
        console.log(book);
        fetch("https://bookstore-springboot-backend.herokuapp.com/book/add", {      //fetch("http://localhost:8080/book/add", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book),
        }).then(() => {
            console.log("New Book added");
            clear(e)
        });        
    };

    const clear = (e) =>{
        setAuthor("");
        setRating("");
        setYear("");
        setURL("");
        window.location.reload(false);
    }
      
    return (       
            <div elevation={3} className={classes.formDiv}>
                <h1 style={{color:"blue"}}><u>New Book</u></h1>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">                
                    <TextField className={classes.textField} id="outlined-basic" label="Author" variant="outlined" fullWidth 
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                    /><br/>                
                    <TextField className={classes.textField} id="outlined-basic" label="Published Year" variant="outlined" fullWidth
                        value={year}
                        onChange={(e)=>setYear(e.target.value)}
                    /><br/>
                    <TextField className={classes.textField} id="outlined-basic" label="Image URL" variant="outlined" fullWidth
                        value={url}
                        onChange={(e)=>setURL(e.target.value)}
                    /><br/>
                    <TextField className={classes.textField} id="outlined-basic" label="Rating" variant="outlined" fullWidth
                        value={rating}
                        onChange={(e)=>setRating(e.target.value)}
                    /> <br/>                  
                    <Button type="submit" variant="contained" color="secondary"> Add Book</Button>
                </form>            
            </div>               
   
  );
}