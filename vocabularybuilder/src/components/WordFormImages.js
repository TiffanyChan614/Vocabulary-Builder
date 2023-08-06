import { useState } from 'react'
import { getImage } from '../services/pexelAPI'

const WordFormImages = ({ formData, setFormData, handleDelete }) => {
  const [images, setImages] = useState([])
  const [searchValue, setSearchValue] = useState(formData.word)
  const [showImageResults, setShowImageResults] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleSearch = async (e) => {
    e.stopPropagation()
    setShowImageResults(true)
    const newImages = await getImage(searchValue, 10)
    setImages(newImages)
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    if (formData.images.length >= 3) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      return
    }
    const name = e.target.name
    console.log('image index', images[e.target.dataset.index])
    setFormData((prevFormData) => {
      const newArr = [...prevFormData[name]]
      newArr.push(images[e.target.dataset.index])
      return {
        ...prevFormData,
        [name]: newArr,
      }
    })
  }

  const handleClose = (e) => {
    e.stopPropagation()
    setShowImageResults(false)
  }

  return (
    <div className='word-form--images'>
      <div className='word-form--details-name'>Images:</div>
      <div className='word-form--details-content'>
        {formData.images?.map((image, index) => (
          <div key={image.src.medium + index}>
            <img
              src={image.src.medium}
              alt={image.alt}
            />
            <button
              type='button'
              className='delete'
              name='images'
              data-index={index}
              onClick={handleDelete}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className='word-form--image-search'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type='button'
          onClick={handleSearch}>
          Search for images
        </button>
        <button
          type='button'
          onClick={handleClose}>
          Close
        </button>
        {showMessage && <div>Only 3 images allowed</div>}
      </div>
      <div className='word-form--images-results'>
        {showImageResults &&
          images?.map((image, i) => (
            <div className='result-images'>
              <img
                key={image.id}
                src={image.src.medium}
                alt={image.alt}
              />
              <button
                type='button'
                name='images'
                data-index={i}
                onClick={handleAdd}>
                Add
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default WordFormImages
