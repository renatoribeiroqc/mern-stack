import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  return (
    <div className='container'>
      <div className='flex justify-between items-center'>
        <div className='bg-red-400 text-white'>
          <h1>Home</h1>
        </div>
        <Link to="/books/create">
          <MdOutlineAddBox />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full table-auto border-separate margin-2'>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publishing Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publicationYear}</td>
                <td className='flex justify-between items-center'>
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}

export default Home