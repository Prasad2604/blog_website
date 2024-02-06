import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Select, TextInput,FileInput,Button, Alert } from 'flowbite-react'
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate,useParams } from 'react-router-dom';

export default function UpdatePost() {
    const [file,setFile] = useState(null);
    const [imageUploadProgress,setImageUploadProgress] = useState(null);
    const [imageUploadError,setImageUplaodError] = useState(null);
    const [formData,setFormData] = useState({})
    const [publishError,setPublishError] = useState(null);
    const {postId} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        try {
            const fetchPost = async ()=>{

                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                else{
                    setFormData(data.posts[0]);
                    setPublishError(null);
                }
            }
            fetchPost();
        } catch (error) {
            console.log(error.message)
        }
    },[postId])


    console.log(formData);
    console.log(publishError)
    const handleUploadImage = async ()=>{
        try {
           if(!file){
            setImageUplaodError('Please select an image..')
            return;
           } 
           setImageUplaodError(null);
           const storage = getStorage(app);
           const fileName = new Date().getTime()+'-'+file.name;
           const storageRef = ref(storage,fileName);
           const uploadTask = uploadBytesResumable(storageRef,file);
           uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error)=>{
                setImageUplaodError('Image Uplaod Failed');
                setImageUploadProgress(null);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageUploadProgress(null);
                    setImageUplaodError(null);
                    setFormData({...formData,image:downloadURL});
                })
            }
           )
        } catch (error) {
            setImageUplaodError('Image Upload Failed')
            setImageUploadProgress(null);
            console.log(error);
        }
    }
    const handleSubmit = async (e)=>{
        // console.log('Hi')
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData),
            })
            const data = await res.json();
            if(data.success === false){
                return setPublishError(data.message);
                // return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError(error.message);
        }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>setFormData({...formData,title:e.target.value})} value={formData.title}/>
                <Select onChange={(e)=>{setFormData({...formData,category:e.target.value})}} value={formData.category}>
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {
                        imageUploadProgress ?
                        (<div className="w-16 h-16">
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`} />

                        </div>):'Upload Image'
                    }
        
                </Button>
            </div>
            {
                imageUploadError && 
                    <Alert color='failure'>{imageUploadError}</Alert>
            }
            {
                formData.image && (
                    <img src={formData.image} alt='upload' className='w-full h-72-object-cover'/>
                )
            }
            <ReactQuill value={formData.content} className='h-72 mb-12' theme="snow" placeholder='Write Something...' required onChange={(value)=>{
                setFormData({...formData,content:value})
            }}/>
            
            <Button type='submit' gradientDuoTone='purpleToPink'>Update Post</Button>
            {
                publishError && (
                    <Alert color='failure' className='mt-5'>{publishError}</Alert>
                )
            }
        </form>
    </div>
  )
}
