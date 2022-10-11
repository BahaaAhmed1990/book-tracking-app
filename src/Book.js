import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  render() {
    const {id,  title, thumbnail, authors, shelf, onAddById} = this.props;

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`
          }}>
          </div>
          <div className="book-shelf-changer">
            <select 
            defaultValue={shelf === '' ? 'none' : shelf}
            onChange={(e) => 
            {
              if(e.target.value === 'none' || e.target.value === shelf){
                return
              }
              onAddById({id:id},e)}}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{title}</div>
        {authors && authors.map(author => (
          <div key={author} className='book-authors'>{author}</div>
        ))}
      </div>
    )
  }
};
Book.propTypes = {
  id:PropTypes.string.isRequired,
  title:PropTypes.string,
  thumbnail:PropTypes.string,
  authors:PropTypes.array,
  shelf:PropTypes.string.isRequired,
  onAddById:PropTypes.func.isRequired
}
export default Book;