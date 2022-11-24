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

    const mappedBooks = books.map ((b) => (b.id === book.id ? {...b, shelf:shelfName} : b));
    setBooks ( mappedBooks ) 
    // Dont forget to update the book shelf on the server 
    const update = async () => {
      BooksApi.update(book, shelfName);
    };
    update ();

  }
  return (
    <div className="app">
       <Routes>
      <Route exact path="/" element={
        <Bookshelf books={books} onBookShelfChange={moveBookToShelf}/>
      }/>
      <Route path="/search" element={<Search />}/>
    </Routes>
    </div>
  );
}

export default App;
