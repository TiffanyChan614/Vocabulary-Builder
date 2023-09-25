import React, { useState, useRef } from 'react'
import { getImage } from '../../../services/pexelAPI'
import ImageDropZone from './ImageDropZone'
import PropType from 'prop-types'

const WordFormImages = ({
  formData,
  setFormData,
  handleDelete,
  setMessage
}) => {
  const [images, setImages] = useState(formData.images)
  const [searchValue, setSearchValue] = useState(formData.word)
  const [showImageResults, setShowImageResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const isSearchClicked = useRef(false)

  const handleSearch = async (e) => {
    isSearchClicked.current = true
    setShowImageResults(true)
    if (searchValue !== '') {
      setIsLoading(true)
      try {
        const newImages = await getImage(searchValue, 10)
        setImages(newImages)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleAdd = (e, index) => {
    if (formData.images.length >= 3) {
      alert('Only 3 images allowed')
      return
    }
    const name = e.target.name
    setFormData((prevFormData) => {
      const newArr = [...prevFormData[name]]
      const imageObject = {
        src: images[index].src.medium,
        alt: images[index].alt,
        id: images[index].id
      }
      newArr.push(imageObject)
      return {
        ...prevFormData,
        [name]: newArr
      }
    })
    setMessage({ text: 'Image added!', type: 'success' })
  }

  const handleShow = (e) => {
    e.stopPropagation()
    setShowImageResults((prevShow) => !prevShow)
  }

  const handleChange = (e) => {
    e.stopPropagation()
    isSearchClicked.current = false
    setSearchValue(e.target.value)
    setImages([])
  }

  const infoTextStyleClassName = 'text-gray-500 text-sm'

  const imageElements = (() => {
    if (isLoading && searchValue !== '') {
      return <div className={infoTextStyleClassName}>Loading...</div>
    }
    if (searchValue === '') {
      return <div className={infoTextStyleClassName}>Enter a search term</div>
    }
    if (images.length > 0) {
      return images?.map((image, index) => (
        <div
          className='result-images flex flex-col justify-center'
          key={image.id}>
          <img
            className='w-30 h-40 md:w-40 object-cover rounded-t-lg'
            src={image.src.medium}
            alt={image.alt}
          />
          <button
            className='border-b-2 border-x-2 border-indigo-100 rounded-b-lg px-2 py-1 hover:bg-indigo-100'
            type='button'
            name='images'
            onClick={(e) => handleAdd(e, index)}>
            Add
          </button>
        </div>
      ))
    }

    if (isSearchClicked.current) {
      return <div className={infoTextStyleClassName}>No images found</div>
    } else {
      return <div className={infoTextStyleClassName}>Please click search</div>
    }
  })()

  return (
    <div className='word-form--images flex flex-col gap-2'>
      <div className='word-form--details-name font-bold'>Images</div>
      <div className='flex flex-col gap-1'>
        <p>Search for images:</p>
        <div className='word-form--image-search flex items-center gap-2'>
          <input
            className='border-2 border-gray-200 rounded-full w-full px-2 py-1'
            type='text'
            value={searchValue}
            onChange={handleChange}
          />
          <button
            className='rounded-lg px-2 py-1 hover:bg-indigo-100'
            type='button'
            onClick={handleSearch}>
            Search
          </button>
          <button
            className='rounded-lg px-2 py-1 hover:bg-gray-100'
            type='button'
            onClick={handleShow}>
            {showImageResults ? 'Hide' : 'Expand'}
          </button>
        </div>
      </div>
      {showImageResults && (
        <div className='word-form--images-results border-2 rounded-lg flex flex-wrap max-h-[300px] overflow-auto gap-2 md:gap-4 px-3 md:px-6 py-4'>
          {error ? <div>Error: {error.message}</div> : imageElements}
        </div>
      )}
      <div>
        <p className='flex flex-col gap-1'>Or import images here:</p>
        <ImageDropZone
          formData={formData}
          setFormData={setFormData}
          setMessage={setMessage}
        />
      </div>

      <div className='word-form--details-content'>
        <p>Your images:</p>
        <div className='flex justify-center lg:justify-start gap-2'>
          {formData.images?.length > 0
            ? (
                formData.images?.map((image, index) => (
                  <div
                    key={image.src + index}
                    className='flex flex-col'>
                    <img
                      className='rounded-t-lg w-[150px] md:w-[200px] lg:w-[250px] object-cover'
                      src={image.src}
                      alt={image.alt}
                    />
                    <button
                      type='button'
                      className='delete w-full border-b-2 border-x-2 border-indigo-100 rounded-b-lg px-2 py-1 hover:bg-indigo-100'
                      name='images'
                      onClick={(e) => handleDelete(e, index)}>
                      Delete
                    </button>
                  </div>
                ))
              )
            : (
              <p className={infoTextStyleClassName}>No images added</p>
              )}
        </div>
      </div>
    </div>
  )
}

export default WordFormImages

WordFormImages.propTypes = {
  formData: PropType.object.isRequired,
  setFormData: PropType.func.isRequired,
  handleDelete: PropType.func.isRequired,
  setMessage: PropType.func.isRequired
}
