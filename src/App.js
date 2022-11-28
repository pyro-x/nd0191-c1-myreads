import "./App.css";
import { useState ,useEffect } from "react";
import Bookshelf from "./Bookshelf";
import Search from "./Search";


import  * as BooksApi from "./BooksAPI"; 
import {Route, Routes} from "react-router-dom";

function App () {
  const [books, setBooks] = useState ([]);
  useEffect(() => {
    BooksApi.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const moveBookToShelf = ( book, shelfName) => {

    BooksApi.update(book,shelfName).then (() => {
      book.shelf = shelfName;
      setBooks(books.filter((b) => b.id !== book.id).concat(book));
    });

  };
  const shelfs = { currentlyReading:'Currently reading',read:'Read',wantToRead: 'Want to read'};

  return (
    <div className="app">
       <Routes>
      <Route exact path="/" element={
        <Bookshelf shelfs={shelfs} books={books} onBookShelfChange={moveBookToShelf}/>
      }/>
      <Route path="/search"  element={<Search shelfs={shelfs} books={books} onBookShelfChange={moveBookToShelf}/>}/>
    </Routes>
    </div>
  );
}

export default App;
