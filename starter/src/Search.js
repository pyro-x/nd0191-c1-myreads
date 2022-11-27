import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import  * as BooksApi from "./BooksAPI";
import Book from "./Book" ;
import PropTypes from 'prop-types';


const Search = ({shelfs, books, onBookShelfChange }) => {
    const [search, setSearch] = useState("");

    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState([]);
    
    const updateSearch = (text) => {
        setSearch(text.trim());
       
    };
    useEffect(() => {
        const timer = setTimeout(async () =>  {
            if (search!=='')
            {
                const res=  await BooksApi.search(search,20);
                console.log ('search res',res);

                if (res.error)
                    setResults([]);
                else
                {
                    // if the book from the corresponding result is already in the library set the corresponding shelf
                    const mappedBooks = res.map( (bookFromSearch) => { 
                        // find if this book is already on my libray
                        const bookFromLibrary = books.filter ((bookFromLibrary) => (bookFromLibrary.id === bookFromSearch.id));
                        return  bookFromLibrary.length > 0 ? {...bookFromSearch, shelf: bookFromLibrary[0].shelf} : bookFromSearch;
                    });
                    console.log ("mappedBooks:", mappedBooks);
                    setResults(mappedBooks);
                }
            }
            else
                setResults([]);
          });
          return () => {
            clearTimeout(timer);
            setResults[0];
          };
    }, [search]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    name="search"
                    value={search}
                    onChange={(event) => updateSearch (event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {
                    results.map ((book)=> (<li key={book.id}><Book book={book} shelfs={shelfs} onBookShelfChange={onBookShelfChange}/></li>))
                }
                </ol>
            </div>
        </div>
    );
};

Search.propTypes = {
    shelfs: PropTypes.object.isRequired, // contains the available shelfs,
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func
};

export default Search;