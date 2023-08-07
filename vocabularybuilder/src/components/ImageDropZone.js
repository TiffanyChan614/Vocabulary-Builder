import { useState } from 'react'

const ImageDropZone = ({ formData, setFormData, setShowMessage }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const currentImagesLength = formData.images.length
      if (files.length + currentImagesLength > 3) {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 3000)
        return
      }
      const promises = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const promise = new Promise((resolve) => {
          reader.onload = function (e) {
            const imageObject = {
              src: e.target.result,
              alt: file.name,
            }
            resolve(imageObject)
          }
          reader.readAsDataURL(file)
        })
        promises.push(promise)
      }
      const imageObjects = await Promise.all(promises)
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...imageObjects],
      }))
    }
  }

  return (
    <div
      className={`image-drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <p>Drop images here</p>
    </div>
  )
}

export default ImageDropZone
