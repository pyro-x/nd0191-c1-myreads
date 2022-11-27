import PropTypes from 'prop-types';
import { useState } from 'react';

const Book = ({book,shelfs,onBookShelfChange}) => {
    const [shelf,setShelf] = useState(book.shelf || 'none');
    const handleChange = (event) => {
        if (shelf!==event.target.value)
        {
            const newShelf = event.target.value;
            setShelf(newShelf); // first we update the sate 
            onBookShelfChange (book,newShelf); // trigger the onBookShelchange method from above 
        }
    };
    let coverStyle = {
        width: 128,
        height: 193
    };
    if (book.imageLinks && book.imageLinks.thumbnail)
        coverStyle = {...coverStyle, backgroundImage: `url(${book.imageLinks.thumbnail}`};

    return (
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={coverStyle}
            ></div>
            <div className="book-shelf-changer">
                <select value={shelf} onChange={handleChange}>
                <option value="none" disabled>
                    Move to...
                </option>
                { 
                    Object.keys(shelfs).map ((s) => ( 
                        <option key={s} value={s}>{shelfs[s]}</option>
                    ))
                }
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            { book.authors && 
                book.authors.map ((author) => {(<div className="book-authors">{author}</div>);})
            }
    </div>
  );
};

Book.propTypes = {
    book:  PropTypes.object.isRequired,
    shelfs: PropTypes.object.isRequired ,// contains the available shelfs
    onBookShelfChange: PropTypes.func.isRequired,
};
export default Book;