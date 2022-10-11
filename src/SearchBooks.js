import React,{ Component } from "react";
import Book from "./Book.js";
import * as BooksAPI from './BooksAPI.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  state = {
    searchBooks:[],
  };

 
  searchBook = (query) => {
    BooksAPI.search(query).then(response => {
      if (query.length === 0 || query === "") {
        this.setState({ searchBooks: [] })
      }
      else if (!response.error) {
        this.setState({
          searchBooks: response.map(b => {
            if(this.props.myBooksId.includes(b.id)){
              let book = this.props.onFindBookById(b.id);
              b.shelf = book[0].shelf;
              return b;
            } else {
              b.shelf = '';
              return b
            }
          })
        })
      } else {
        this.setState({ searchBooks: []})
      }
    })  
  };
  // booksId = () => {
  //   return { myBooksId } = this.props;
  // };
  // findBookById = (id) => {
  //   return {onFindBookById}
  // }

  render(){

    //const { myBooksId, onFindBookById } = this.props;

    const booksToDisplay = this.state.searchBooks.map(book => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          thumbnail={book.imageLinks && book.imageLinks.thumbnail}
          shelf={book.shelf}
          onAddById={this.props.onAddById}
        />
      </li>
    ));
    return(
  
    <div className="search-books">
      {/*console.log(myBooksId)*/}
      {/*console.log(this.state.searchBooks)*/}
      <div className="search-books-bar">
        <Link to='/' className="close-search">close</Link>

        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" 
          onChange={(e)=>{this.searchBook(e.target.value)}}/>
        </div>
        
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{booksToDisplay}</ol>
      </div>
  </div>
  )
}
}
SearchBooks.propTypes = {
  myBooksId:PropTypes.array.isRequired,
  onFindBookById:PropTypes.func.isRequired,
  onAddById:PropTypes.func.isRequired
}
 export default SearchBooks;