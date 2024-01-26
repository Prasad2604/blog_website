import React,{useState,useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {TextInput,Button, Alert} from 'flowbite-react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
// import e from 'express';

export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageFileURL,setImageFileURL] = useState(null);
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
    const [imageFileUploading,setImageFileUploading] = useState(false);
    const [imageFileUploadError,setImageFileUploadError] = useState(null);
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
    const [updateUserError,setUpdateUserError] = useState(null);
    const [formData,setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    


    const handleImageChange = (e)=>{
      const file = e.target.files[0];
      if(file){
        setImageFile(file);
        setImageFileURL(URL.createObjectURL(file));  //this will create an Image file url for the choosen file
        // imageURL = imageFileURL;
      }
    }
    useEffect(()=>{
      if(imageFile){
        uploadImage();
      }
    },[imageFile]);

    
    const uploadImage = async ()=>{
      // service firebase.storage {    -->Firebase storage Rules
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if 
      //       request.resource.size < 2*1024*1024 &&
      //       request.resource.contentType.matches('image/*');
      //     }
      //   }
      // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime()+imageFile.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageFileUploadProgress(progress.toFixed(0)); //->toFixed(0)=> 0 decimal
        },
        (error)=>{
          setImageFileUploadError('Could not upload image (File must be less than 2MB)');
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
          setImageFileUploading(false);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileURL(downloadURL);
            setFormData({...formData,profilePicture:downloadURL});
            setImageFileUploading(false);
          })
          // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // setImageFileURL(downloadURL)
          // console.log(imageFileURL);
        }
      )
    }

    const handleUpdate = (e)=>{
      // console.log(e.target.value);
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    console.log(formData)

  const handleSubmit = async (e) =>{
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if(Object.keys(formData).length===0){
        setUpdateUserError('No chnages made');
        return;
      }
      if(imageFileUploading){
        setUpdateUserError('Please wait for image to upload');
        return;
      }

      try {
        dispatch(updateStart());
        console.log(currentUser._id);
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(formData), 
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
          return;
        }
        else{
          dispatch(updateSuccess(data));
          setUpdateUserError(null);
          setUpdateUserSuccess("User's Profile updated successfully")
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
          <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
            {imageFileUploadProgress &&(
              <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}  strokeWidth={5} styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path:{
                  stroke:`rgba(62,152,199, ${imageFileUploadProgress/100})`,
                }
              }}/>
            )}
            <img src={imageFileURL||currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`}/>
          </div>
          
          {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
          
          <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleUpdate}/>
          <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleUpdate}/>
          <TextInput type='password' id='password' placeholder='password' onChange={handleUpdate}/>
          <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
          </Button>
        </form>
        
        <div className="text-red-500 flex justify-between mt-5">
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign Out</span>
        </div>
        {updateUserSuccess && (
          <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
        )}
        {
          updateUserError && (
            <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
          )
        }
    </div>
  )
}
