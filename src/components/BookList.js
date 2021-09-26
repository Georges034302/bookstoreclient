import  React, {useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@mui/material/Checkbox';
import './searchBar.css';


const useStyles = makeStyles((theme) => ({
  imageList:{width: 800, margin: 50, padding: 2},
  imageListItemBar:{height: 50},
  image: { width: 150, height: 100 },  
  buttonHoverFocus: {
    color: '#fff',
    "&:hover, &.Mui-focusVisible": { color: "red" }
  }
}));
export default function BookListView() {
    const [books, setBooks] = useState([]);
    let [rating, setRating] = useState();
    let [finished, setFinished] = useState();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [wordEntered, setWordEntered] = useState("");  
    const classes = useStyles();    
      
    useEffect(() => {    
      fetch("https://bookstore-springboot-backend.herokuapp.com/book/getAll") //fetch("http://localhost:8080/book/getAll")
        .then((res) => res.json())
        .then((result) => {
          setBooks(result);          
        });
    }, []);

    const reload_books = (e) => {
      fetch("https://bookstore-springboot-backend.herokuapp.com/book/getAll") //fetch("http://localhost:8080/book/getAll")
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);          
      });
    }
  
    const handleDelete = (e) => {
      fetch("https://bookstore-springboot-backend.herokuapp.com/book/"+e.id, {     //fetch("http://localhost:8080/book/"+e.id, {  
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },         
      }).then(() => {
        console.log(`Book ${e.id} added`);
        reload_books(e);
      });
    }; 

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);      
      const newFilter = books.filter((value) => {
        return value.author.toLowerCase().includes(searchWord.toLowerCase());
      });  
      if (searchWord === "" || searchWord === null) {
        setFilteredBooks(books);
      } else {
        setFilteredBooks(newFilter);
      }
  };

  const updateRating = (e) => {
    const book = {rating};
    fetch("https://bookstore-springboot-backend.herokuapp.com/book/rating/"+e.id, {      //fetch("http://localhost:8080/book/rating/"+e.id, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book),
    }).then(() => {
      console.log(`Book ${e.id} rating is now: ${rating}`);
      reload_books(e);
    });        
  };
  
  const updateStatus = (e) => {
      setFinished(!finished);
      const book = {finished};
      fetch("https://bookstore-springboot-backend.herokuapp.com/book/status/"+e.id, {      //fetch("http://localhost:8080/book/status/"+e.id, { 
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(book),
      }).then(() => {
        console.log(`Book ${e.id} rating is now: ${finished}`);
        reload_books(e);
      });        
  };
  
  return (
    <div>
      <div className="searchDiv">
            <input className="searchInputs"
              type="text"
              placeholder="Search by author"
              value={wordEntered}
              onChange={handleFilter}
            />            
        </div>
        <ImageList className={classes.imageList} cols={4} rows={3}>
            {(filteredBooks.length !== 0 ? filteredBooks: books).map((book) => (
              <ImageListItem key={book.id} className={classes.image}>
              
                <img sx={{padding: 4}}
                  src={`${book.url}?w=24&h=24&fit=crop&auto=format 1x`}
                  srcSet={`${book.url}?w=24&h=24&fit=crop&auto=format&dpr=2 2x`}
                  alt={book.url}                  
                />          
                <ImageListItemBar className={classes.imageListItemBar}                  
                  title={<div><span><small>by:{book.author}</small></span></div>}
                  subtitle={
                    <Rating defaultValue={book.rating}
                      max={5} precision={0.5} 
                      onChange={(e) => setRating(e.target.value)}
                      onClick={(e) => updateRating(book)}                                            
                    />
                  }
                />
                <ImageListItemBar position="top" sx={{height: 30}}                
                  subtitle={
                    <Checkbox color="success"
                      checked={book.finished}
                      onChange={(e) => { updateStatus(book) }}
                      />
                  }
                  actionIcon={
                    <IconButton className={classes.buttonHoverFocus} onClick={(e) => handleDelete(book)}>
                      <DeleteIcon className={classes.deleteIcon} fontSize="inherit" />
                    </IconButton>}
                />
              </ImageListItem>
            ))}
      </ImageList>
      
    </div>
  );
}