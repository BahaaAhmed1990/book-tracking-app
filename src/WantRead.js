import React,{ Component } from "react";
import PropTypes from 'prop-types';
import Book from "./Book";


class WantRead extends Component {
    render(){

        const { wantReadBooks , onAddById } = this.props;

        const booksToDisplay = wantReadBooks.map(book => (
            <li key={book.id}>
              <Book
                id={book.id}
                title={book.title}
                authors={book.authors}
                thumbnail={book.imageLinks && book.imageLinks.thumbnail}
                shelf={book.shelf}
                onAddById={onAddById}
              />
            </li>
          ));
        return(
            <div className="bookshelf">
                {/*console.log('wantReadBooks',wantReadBooks)*/}
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">{booksToDisplay}</ol>
                </div>
            </div>
        )
    }
};

WantRead.propTypes = {
  wantReadBooks:PropTypes.array.isRequired,
  onAddById:PropTypes.func.isRequired
}
export default WantRead;