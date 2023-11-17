import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './BookDetail.css'
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import def from '../assets/default-prof.jpg';

const BookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [comments, setComments] = useState([]); // [{}, {}, {}
  const [book, setBook] = useState(null);

  useEffect(() => {
    // GET /books/:bookId
    const url = `http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/book-aux/books/${bookId}`;
    axios.get(url)
      .then((response) => {
        console.log(response);
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  , [bookId]);

  useEffect(() => {
    // GET /books/:bookId/comments
    const url = `http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/book-aux/books/${bookId}/ratings`;
    axios.get(url)
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  , [bookId]);

  return (
    <>
      <Navbar />
      <div className="book-detail-container">
        {book && (
          <div>
            <div className="book-header">
              <img src={book.cover} alt={`Portada de ${book.title}`} className="book-cover" />
              <div>
                <h1 className="book-title">{book.title}</h1>
                <p className="book-isbn">ISBN: {book.isbn}</p>
                <p className="book-published">Publicado el: {book.published_on}</p>
                <p className="book-pages">Páginas: {book.pages}</p>
              </div>
            </div>
    
            <div className="book-description">
              <h3>Descripción</h3>
              <p>{book.description}</p>
            </div>
    
            <div className="book-additional-info">
              <div>
                <h3>Formatos Disponibles</h3>
                <ul className="book-formats">
                  {book.formats.map((format) => (
                    <li key={format.id}>{format.name}</li>
                  ))}
                </ul>
              </div>
    
              <div>
                <h3>Idiomas Disponibles</h3>
                <ul className="book-languages">
                  {book.languages.map((language) => (
                    <li key={language.id}>{language.name}</li>
                  ))}
                </ul>
              </div>
    
              <div>
                <h3>Géneros</h3>
                <ul className="book-genres">
                  {book.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
    
            <div className="book-authors">
              <h3>Autores</h3>
              {book.authors.map((author) => (
                <div key={author.id} className="author-info">
                  <img src={author.profile_picture} alt={`Foto de ${author.name}`} className="author-photo" />
                  <div>
                    <h4>{author.name}</h4>
                    <p>{author.biography}</p>
                    <p>Nacido: {author.birth_date} en {author.birth_place}</p>
                    {author.death_date && <p>Fallecido: {author.death_date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="book-comments">
        <h3>Valoraciones de Usuarios</h3>
          {comments && comments.ratings && comments.ratings.length > 0 ? (
            comments.ratings.map((rating) => (
              <div key={rating.user_id} className="user-rating">
                <div className="user-info">
                  <img src={rating.User.profile_picture || def} alt={rating.User.username} className="user-photo" />
                  <p>{rating.User.username}</p>
                </div>
                <div className="rating-info">
                  <div className="rating-visual">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`star ${index < rating.rating ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <p className="rating-comment">{rating.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay valoraciones para este libro.</p>
          )}
        </div>
        <Button variant="contained" onClick={() => navigate(-1)}>Volver</Button>
      </div>
      
      

      
    </>
  );
  
};

export default BookDetail;
