
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const url = "http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/";

  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : 'Usuario';
  const session_token = user ? JSON.parse(user).session_token : '';

  // Borrar todo del localStorage
  // localStorage.clear();

  if (username === 'Usuario') {
    alert('No has iniciado sesión 1');
    window.location.href = '/login';
  }

  if (session_token === '') {
    alert('No has iniciado sesión 2');
    window.location.href = '/login';
  }

  // Check if the token is valid with a axios request
  const body = {
    session_token: session_token
  }

  const checkToken = async () => {
    try {
      const response = await axios.post(url + 'token/verify', body);
      console.log(response);
    }
    catch (err) {
      console.log(err);
      window.location.href = '/login';
    }
  }

  checkToken();

  const [readedBooks, setReadedBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  const user_json = JSON.parse(user);

  useEffect(() => {
    // Load readed books
    loadReadedBooks();
    loadFavoriteBooks();
    loadNewBooks();
    loadTopBooks();
  }
  , []);

  const loadReadedBooks = async () => {
    try {
      const userId = user_json.id; 
      const response = await axios.get(`http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/${userId}/read-books`);
      console.log(response);
      setReadedBooks(response.data.readBooks); 
    } catch (error) {
      console.error('Error al cargar libros leídos:', error);
    }
  };

  const loadFavoriteBooks = async () => {
    try {
      const userId = user_json.id; 
      const response = await axios.get(`http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/${userId}/favorite-books`);
      console.log(response);
      setFavoriteBooks(response.data.favoriteBooks); 
    }
    catch (error) {
      console.error('Error al cargar libros favoritos:', error);
    
    }
  }

  const loadNewBooks = async () => {
    try {
      const response = await axios.get(`http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/book-aux/books-new`);
      console.log(response);
      setNewBooks(response.data); 
    }
    catch (error) {
      console.error('Error al cargar libros nuevos:', error);
    }
  }

  const loadTopBooks = async () => {
    try {
      const response = await axios.get(`http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/book-aux/books-popular`);
      console.log(response);
      setTopBooks(response.data); 
    }
    catch (error) {
      console.error('Error al cargar libros nuevos:', error);
    }
  }

  return (
    <Box>
      <Navbar />
      <Box className="home-content">

        {/* Sección de libros leídos */}
        <Box>
          <Typography variant="h5" className="section-title">Libros Leídos</Typography>
        </Box>
        <Box className="carousel-section">
          {readedBooks.length > 0 ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={4} // Cantidad predeterminada de slides
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1344: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {readedBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/books/${book.id}`}>
                      <Box className="book-item">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <Box className="book-info">
                          <Typography variant="subtitle1">{book.title}</Typography>
                          <Typography variant="body2">Publicado: {book.published_on}</Typography>
                          <Typography variant="body2">Páginas: {book.pages}</Typography>
                        </Box>
                      </Box>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography variant="body1">Cargando libros...</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h5" className="section-title">Libros Favoritos</Typography>
        </Box>
        <Box className="carousel-section">
          {favoriteBooks.length > 0 ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={4} // Cantidad predeterminada de slides
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1344: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {favoriteBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <Box className="book-item">
                      <img src={book.cover} alt={book.title} className="book-cover" />
                      <Box className="book-info">
                        <Typography variant="subtitle1">{book.title}</Typography>
                        <Typography variant="body2">Publicado: {book.published_on}</Typography>
                        <Typography variant="body2">Páginas: {book.pages}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography variant="body1">Cargando libros...</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h5" className="section-title">Libros Nuevos</Typography>
        </Box>
        <Box className="carousel-section">
          {newBooks.length > 0 ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={4} // Cantidad predeterminada de slides
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1344: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {newBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <Box className="book-item">
                      <img src={book.cover} alt={book.title} className="book-cover" />
                      <Box className="book-info">
                        <Typography variant="subtitle1">{book.title}</Typography>
                        <Typography variant="body2">Publicado: {book.published_on}</Typography>
                        <Typography variant="body2">Páginas: {book.pages}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography variant="body1">Cargando libros...</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h5" className="section-title">Libros Top</Typography>
        </Box>
        <Box className="carousel-section">
          {topBooks.length > 0 ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={4} // Cantidad predeterminada de slides
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1050: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1344: {
                  slidesPerView: 4,
                  spaceBetween: 30
                },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {topBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <Box className="book-item">
                      <img src={book.cover} alt={book.title} className="book-cover" />
                      <Box className="book-info">
                        <Typography variant="subtitle1">{book.title}</Typography>
                        <Typography variant="body2">Publicado: {book.published_on}</Typography>
                        <Typography variant="body2">Páginas: {book.pages}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography variant="body1">Cargando libros...</Typography>
          )}
        </Box>


        {/* Otras secciones... */}
      </Box>
    </Box>
  );
};

export default HomePage;