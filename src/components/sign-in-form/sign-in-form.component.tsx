import {useState, FormEvent, ChangeEvent,useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Alert,Snackbar } from '@mui/material';
import FormInput from '../form-input/form-input.component';
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles';
import {
    googleSignInStart, 
    emailSignInStart,
    clearSignInError
} from '../../store/user/user.action'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { selectUserError, selectUserSuccess } from '../../store/user/user.selector';





const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const error = useSelector(selectUserError);
    const success = useSelector(selectUserSuccess);
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('error');


    useEffect(() => {
        if (error) {
            setSnackbarMessage(error.message || '');
            setAlertSeverity('error');
            setOpenSnackbar(true);
            dispatch(clearSignInError());
        } else if (success) {
            setSnackbarMessage(success);
            setAlertSeverity('success');
            setOpenSnackbar(true);
            dispatch(clearSignInError());
        }
    }, [error, success, dispatch]);


    const handleCloseSignInSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    
    const resetFormFields =() => {
        setFormFields(defaultFormFields);
    };
    
    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };
    

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };
    
    
    return (
        <SignInContainer>
        <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}/>
                <FormInput 
                label="Password"
                type="password"  
                required 
                onChange={handleChange} 
                name='password'
                value={password}/>
                <ButtonsContainer>
                <Button buttonType={BUTTON_TYPE_CLASSES.base}type='submit'>
                    Sign In
                    </Button>
                <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        onClick={signInWithGoogle}
                        >
                        Sign In With Google
                    </Button>
                </ButtonsContainer>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSignInSnackbar}
            >
                <Alert onClose={handleCloseSignInSnackbar} severity={alertSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </SignInContainer>
    );
};

export default SignInForm;