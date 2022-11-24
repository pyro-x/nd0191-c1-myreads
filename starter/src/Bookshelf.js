import PropTypes from 'prop-types'
import Shelf from "./Shelf";

const Bookshelf = ({books, onBookShelfChange}) => {
    console.log (books)
    const shelfs = { currentlyReading:'Currently reading',read:'Read',wantToRead: 'Want to read',none: 'None'}
    return (<div className="list-books-content">
        {
            Object.keys(shelfs).map ((shelfName) => (
                <Shelf key={shelfName} books={books.filter ((b) => b.shelf === shelfName)} name={shelfName} shelfs={shelfs} onBookShelfChange={onBookShelfChange}/> 
            ))
        }
    </div>
  )
}

Bookshelf.propTypes = {
    books:  PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
}
export default Bookshelf;