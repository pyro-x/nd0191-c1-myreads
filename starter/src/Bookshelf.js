import PropTypes from 'prop-types'
import Shelf from "./Shelf";
import { Link } from "react-router-dom"

const Bookshelf = ({books, shelfs, onBookShelfChange}) => {
    return (<div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div><div className="list-books-content">
                {
                    Object.keys(shelfs).map ((shelfName) => (
                        <Shelf key={shelfName} books={books.filter ((b) => b.shelf === shelfName)} name={shelfName} shelfs={shelfs} onBookShelfChange={onBookShelfChange}/> 
                    ))
                }
             </div>
             <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
    </div>
  )
}

Bookshelf.propTypes = {
    books:  PropTypes.array.isRequired,
    shelfs: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
}
export default Bookshelf;