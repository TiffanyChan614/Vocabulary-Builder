import { useState } from 'react'
import { getImage } from '../services/pexelAPI'
import ImageDropZone from './ImageDropZone'

const WordFormImages = ({ formData, setFormData, handleDelete }) => {
  const [images, setImages] = useState(formData.images)
  const [searchValue, setSearchValue] = useState(formData.word)
  const [showImageResults, setShowImageResults] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleSearch = async (e) => {
    e.stopPropagation()
    setShowImageResults(true)
    const newImages = await getImage(searchValue, 10)
    setImages(newImages)
  }

  const handleAdd = (e, index) => {
    e.stopPropagation()
    if (formData.images.length >= 3) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      return
    }
    const name = e.target.name
    setFormData((prevFormData) => {
      const newArr = [...prevFormData[name]]
      const imageObject = {
        src: images[index].src.medium,
        alt: images[index].alt,
        id: images[index].id,
      }
      newArr.push(imageObject)
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
          <div key={image.src + index}>
            <img
              src={image.src}
              alt={image.alt}
            />
            <button
              type='button'
              className='delete'
              name='images'
              onClick={(e) => handleDelete(e, index)}>
              Delete
            </button>
          </div>
        ))}
        <ImageDropZone
          formData={formData}
          setFormData={setFormData}
          setShowMessage={setShowMessage}
        />
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
          images?.map((image, index) => (
            <div className='result-images'>
              <img
                key={image.id}
                src={image.src.medium}
                alt={image.alt}
              />
              <button
                type='button'
                name='images'
                onClick={(e) => handleAdd(e, index)}>
                Add
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default WordFormImages
