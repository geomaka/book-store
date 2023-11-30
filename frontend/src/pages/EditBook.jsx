import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar} = useSnackbar();
  const { id } = useParams()

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5555/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data.author);
        setTitle(data.title);
        setPublishYear(data.publishYear);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        enqueueSnackbar('Error', {vatiant: 'error'})
        console.log(error)
        setLoading(false)
      });
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    fetch(`http://localhost:5555/books/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', {variant:'succcess'})
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {vatiant: 'error'})
        console.log(error);
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className='text-3x1 my-4'>Edit book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 my-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-ray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-ray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-ray-500'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => { setPublishYear(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          save
        </button>
      </div>
    </div>
  )
}

export default EditBook