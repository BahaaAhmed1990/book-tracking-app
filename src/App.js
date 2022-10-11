import React, { Component } from 'react';
import CurrentReading from './CurrentReading';
import WantRead from './WantRead';
import Read from './Read';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import { Link } from 'react-router-dom';


import './App.css';

class App extends Component {

  state = {
    books:[]
  };

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  };
  addById = (movedBook,e) => {
    console.log(e.target.value);
    console.log(movedBook);
    BooksAPI.update(movedBook,e.target.value).then((response) => {
      this.setState((currState) => {
        let newBooksArr = [];
        const bookOnMyShelves = currState.books.find((b) => {
          return b.id === movedBook.id
        });
        if(bookOnMyShelves){
          newBooksArr = currState.books.map((b) => {
            if(b.id === movedBook.id){
              b.shelf = e.target.value;
            }
            return b;
          })
        } else {
          movedBook.shelf = e.target.value;
          newBooksArr = currState.books.concat([movedBook]);
        }
        return {books:newBooksArr}
      });
    });
  };
  findBookById = (id) => {
    return this.state.books.filter((b) => {
      return b.id === id;
    });
  };
  
  render(){
    const currReadBooks = this.state.books.filter((book) => {
      return book.shelf === 'currentlyReading'
    });
    const wantReadBooks = this.state.books.filter((book) => {
      return book.shelf === 'wantToRead'
    });
    const readBooks = this.state.books.filter((book) => {
      return book.shelf === 'read'
    });
    return (
      <div className="App">
        {/*console.log(this.state.books)*/}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentReading 
                currReadBooks={currReadBooks}
                onAddById={this.addById}/>
      
                <WantRead 
                wantReadBooks={wantReadBooks}
                onAddById={this.addById}/>
      
                <Read 
                readBooks={readBooks}
                onAddById={this.addById}/>
              </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add A Book</Link>
            </div>
          </div>
        )} />
        
        <Route path='/search' render={() => (
          <SearchBooks 
          myBooksId={this.state.books.map((book) => {
            return book.id
          })}
          onFindBookById={this.findBookById}
          onAddById={this.addById}/>
        )}/>
      </div>
    );
  };
};

export default App;
