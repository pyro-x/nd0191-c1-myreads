import { useState } from "react";
import { Link } from "react-router-dom"
import  * as BooksApi from "./BooksAPI"
import Book from "./Book" 
import PropTypes from 'prop-types'


const Search = ({shelfs, onBookShelfChange }) => {
    const [search, setSearch] = useState("");

    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState([])
    
    const updateSearch = (text) => {
        const normalizedText = text.trim()
        setSearch(normalizedText.trim())
        const searchBooks = async (text) => {
            if (text!=='')
            {
                const res= await BooksApi.search(text,20);
                console.log ('search res',res);

                if (res.error)
                    setResults([]);
                else
                    setResults(res);
            }
            else
                setResults([])
          };
          searchBooks (normalizedText);

    }


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
    )
};

Search.propTypes = {
    shelfs: PropTypes.object.isRequired, // contains the available shelfs,
    onBookShelfChange: PropTypes.func
};

export default Search;