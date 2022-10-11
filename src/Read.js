import React,{ Component } from "react";
import PropTypes from 'prop-types';
import Book from "./Book";

class Read extends Component {

    render(){
        
        const { readBooks , onAddById } = this.props;

        const booksToDisplay = readBooks.map(book => (
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
                {/*console.log('readBooks',readBooks)*/}
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{booksToDisplay}</ol>
                </div>
            </div>
        )
    }
}
Read.propTypes = {
  readBooks:PropTypes.array.isRequired,
  onAddById:PropTypes.func.isRequired
}
export default Read