import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
class CurrentReading extends  Component {
    render(){

        const { currReadBooks , onAddById } = this.props;

        const booksToDisplay = currReadBooks.map(book => (
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
                {/*console.log('currReadBooks',currReadBooks)*/}
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{booksToDisplay}</ol>
                </div>
            </div>
        )
    }
};
CurrentReading.propTypes = {
  currReadBooks:PropTypes.array.isRequired,
  onAddById:PropTypes.func.isRequired
}
export default CurrentReading;