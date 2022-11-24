import "./App.css";
import { useState ,useEffect } from "react";
import Bookshelf from "./Bookshelf";
import  * as BooksApi from "./BooksAPI" 

function App () {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState ([]);
  useEffect(() => {
    const getBooks = async () => { 
      const res = await BooksApi.getAll();
      setBooks(res);
    }
    getBooks();
  }, [])

  const moveBookToShelf = ( book, shelfName) => {
    setBooks ( books.map (b => b.id === book.id) ? {...book, shelf:shelfName} : book) 
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div>
          <Bookshelf books={books} onBookShelfChange={moveBookToShelf}/>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
