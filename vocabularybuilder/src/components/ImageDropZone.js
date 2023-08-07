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

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const currentImagesLength = formData.images.length
      if (e.dataTransfer.files.length + currentImagesLength > 3) {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 3000)
        return
      }
      setFormData((prevFormData) => {
        const newArr = [...prevFormData.images]
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          const file = e.dataTransfer.files[i]
          const imageObject = {
            src: URL.createObjectURL(file),
            alt: file.name,
          }
          newArr.push(imageObject)
        }
        return {
          ...prevFormData,
          images: newArr,
        }
      })
    }
    console.log(e.dataTransfer.files)
    e.dataTransfer.clearData()
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
