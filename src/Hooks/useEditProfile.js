
import { useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import {getDownloadURL, ref, uploadString} from 'firebase/storage'
import {storage} from '../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import {firestore} from '../firebase/firebase'
import useUserProfileStore from '../store/userProfileStore'

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const setAuthUser = useAuthStore((state) => state.setUser)
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile)
  const showToast = useShowToast()


  const editProfile = async(inputs,selectedFile) => {
    if (isUpdating || !authUser) return
    setIsUpdating(true)

    
    const storageRef = ref(storage, `profile-pictures/${authUser.uid}`)
    const userDocRef = doc(firestore, 'users', authUser.uid)

    let URL = ''
    try{
        if(selectedFile){
            await uploadString(storageRef, selectedFile, 'data_url')
            URL = await getDownloadURL(ref(storage, `profile-pictures/${authUser.uid}`))
        }
        const updatedUser = {
            ...authUser,
            fullName: inputs.fullName || authUser.fullName,
            username: inputs.username || authUser.username, 
            bio : inputs.bio || authUser.bio,
            profilePicURL: URL || authUser.profilePicURL
        }
        await updateDoc(userDocRef, updatedUser)
        localStorage.setItem('user-info', JSON.stringify(updatedUser))
        setAuthUser(updatedUser)
        setUserProfile(updatedUser)
        showToast('Success', 'Profile updated successfully', 'success')
    }
    catch (error){
        showToast('Error', error.message, 'error')
        
      
    }
  }
    return {isUpdating, editProfile}
}

export default useEditProfile