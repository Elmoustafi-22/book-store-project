import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

  useEffect(()=> {
    setLoading(true)
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/books/${id}`)
        const { title, author, publishYear } = res.data.book
        setTitle(title)
        setAuthor(author)
        setPublishYear(publishYear)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch book:', error);
        setLoading(false)
      }
    }

    fetchBook();
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true);
    axios.patch(`http://localhost:8000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully!', { variant: 'success' })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured. Please check console')
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error)
      })
  }

  return (
    <div className='p-4 font-jost'>
      <BackButton />
      <h1 className='text-3xl my-4 font-poppins font-bold'>
        Edit Book
      </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4 flex flex-col gap-4'>
          <label className='text-xl mr-4 text-gray-500'>
            Title
            <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          </label>
          
          <label className='text-xl mr-4 text-gray-500'>
            Author
            <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          </label>
          
          <label className='text-xl mr-4 text-gray-500'>
            Published Year
            <input 
            type='text '
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          </label>

          <button className='py-2 px-4 cursor-pointer text-gray-800 text-xl bg-sky-300 m-8 rounded ' onClick={handleEditBook}>Save Changes</button>
        </div>

      </div>
    </div>
  )
}

export default EditBook