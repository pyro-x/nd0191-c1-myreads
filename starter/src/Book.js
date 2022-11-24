import PropTypes from 'prop-types'
import { useState } from 'react';

const Book = ({book,shelfs}) => {
    console.log ("book",book);
    const [shelf,setShelf] = useState('book.shelf')

    const handleChange = (event) => {
        setShelf(event.target.value)
    }

    return (
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage:
                    `url(${book.imageLinks.thumbnail}`,
                }}
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
            <div className="book-authors">{book.authors[0]}</div>
    </div>
  );
};

Book.propTypes = {
    book:  PropTypes.array.isRequired,
    shelfs: PropTypes.object.isRequired // contains the available shelfs

}
export default Book;