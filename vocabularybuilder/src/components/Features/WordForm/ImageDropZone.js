import { useState } from 'react'

const ImageDropZone = ({ formData, setFormData, setMessage }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const loadImageObjects = async (files) => {
    const promises = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      const promise = new Promise((resolve, reject) => {
        reader.onload = function (e) {
          const imageObject = {
            src: e.target.result,
            alt: file.name,
          }
          resolve(imageObject)
        }
        reader.onerror = function (err) {
          reject(err)
        }
        reader.readAsDataURL(file)
      })
      promises.push(promise)
    }
    try {
      return await Promise.all(promises)
    } catch (err) {
      console.err(err)
    }
  }

  const handleImageUpdate = async (
    files,
    formData,
    setFormData,
    setMessage
  ) => {
    const currentImagesLength = formData.images.length
    if (files.length + currentImagesLength > 3) {
      alert('Only 3 images allowed')
      return
    }
    try {
      const imageObjects = await loadImageObjects(files)
      const newImages = [...formData.images, ...imageObjects]
      setFormData((prevFormData) => ({ ...prevFormData, images: newImages }))
      setMessage({ text: 'Images added!', type: 'success' })
    } catch (err) {
      setMessage({ text: 'Error adding images', type: 'error' })
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      await handleImageUpdate(files, formData, setFormData, setMessage)
    }
  }

  const handleFileChange = async (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleImageUpdate(files, formData, setFormData, setMessage)
    }
  }

  const baseStyle =
    ' border-2 border-dashed w-full md:w-[300px] h-[200px] flex flex-col items-center justify-center text-gray-600 text-md rounded-lg'
  const inactiveStyle = 'border-gray-300'
  const activeStyle = 'border-indigo-300'

  return (
    <>
      <div
        className={`image-drop-zone ${
          isDragging ? activeStyle : inactiveStyle
        } ${baseStyle}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <p className='pointer-events-none'>Drop images here</p>
        <p>
          Or,{' '}
          <label className='underline hover:text-indigo-700 cursor-pointer'>
            browse to upload
            <input
              type='file'
              onChange={handleFileChange}
              className='hidden'
            />
          </label>
        </p>
      </div>
    </>
  )
}

export default ImageDropZone
