import { useState } from 'react'
import useShowToast from './useShowToast'

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const showToast = useShowToast() //Error dialogue box
  const maxFileSizeInBytes = 2 * 1024 * 1024 //2MB
  const handleImageChange = (e) => {
    const file = e.target.files[0] 
    if (file && file.type.startsWith('image/')){
        if(file.size > maxFileSizeInBytes){
            showToast('Error', 'File size is too large', 'error')
            setSelectedFile(null)
            return
        }
        const reader = new FileReader()

        reader.onloadend = () => {
            setSelectedFile(reader.result)
        }

        reader.readAsDataURL(file)

    } else{
        showToast('Error', 'Please select an image file', 'error')
        setSelectedFile(null)
    }   
  }
    return {selectedFile, handleImageChange,setSelectedFile}
}

export default usePreviewImg