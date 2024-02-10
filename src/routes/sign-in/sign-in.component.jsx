import {
    signInWithGooglePopUp, 
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

    
const Signin = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
        }
    
    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}
            >Sign in google popup</button>
        </div>
    )
}
export default Signin;