import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
// import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {loading, error:errorMessage} = useSelector(state=>state.user);

const handleGoogleClick = async ()=>{
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'}) //this will ask us to choose our google account each time
    try {
        // const auth = 
        const resultsFromGoogle = await signInWithPopup(auth,provider)
        // console.log(resultsFromGoogle);
        const res = await fetch('/api/auth/google',{
            method : 'POST',
            headers:{'Content-type':'application/json'},
            body : JSON.stringify({
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL,
            })

        })
        const data = await res.json()
        console.log(data)
        if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        {/* OAuth */}
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
