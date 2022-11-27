import "./App.css";
import { useState ,useEffect } from "react";
import Bookshelf from "./Bookshelf";
import Search from "./Search";


import  * as BooksApi from "./BooksAPI" 
import {Route, Routes} from "react-router-dom";

function App () {
  const [books, setBooks] = useState ([]);
  useEffect(() => {
    const getBooks = async () => { 
      const res = await BooksApi.getAll();
      setBooks(res);
    }
    getBooks();
  }, [])

  const moveBookToShelf = ( book, shelfName) => {
    console.log ("book", book)

    //TODO ADD LOGIC TO HANDLE WHENEVER THE BOOK IS NOT ON OUR BOOKSHELF
    let mappedBooks = []
    // Modify the shelf for an existing book 
    if (books.filter ( b => b.id === book.id).length > 0 )
      mappedBooks = books.map ((b) => (b.id === book.id ? {...book, shelf:shelfName} : b));
    else
      mappedBooks = books.concat (book);
    console.log ("mappedBooks", mappedBooks)

    setBooks ( mappedBooks ) 
    // Dont forget to update the book shelf on the server 
    const update = async () => {
      BooksApi.update(book, shelfName);
    };
    update ();

  }
  const shelfs = { currentlyReading:'Currently reading',read:'Read',wantToRead: 'Want to read'}

  return (
    <div className="app">
       <Routes>
      <Route exact path="/" element={
        <Bookshelf shelfs={shelfs} books={books} onBookShelfChange={moveBookToShelf}/>
      }/>
      <Route path="/search"  element={<Search shelfs={shelfs} onBookShelfChange={moveBookToShelf}/>}/>
    </Routes>
    </div>
  );
}

export default App;
