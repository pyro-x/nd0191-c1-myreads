import PropTypes from 'prop-types';
import Book from './Book';
const Shelf = ({name, books, onBookShelfChange,shelfs}) => {

    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfs[name]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                        books.map ((book)=> (<li key={book.id}><Book book={book} shelfs={shelfs} onBookShelfChange={onBookShelfChange}/></li>))
                    }
                  </ol>
                </div>
              </div>
    );
};
Shelf.propTypes = {
    name: PropTypes.string.isRequired,
    books:  PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
    shelfs: PropTypes.object.isRequired // contains the available shelfs
};
export default Shelf;