import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert,Snackbar } from '@mui/material';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart ,clearSignUpError} from '../../store/user/user.action';
import { selectUserError, selectUserSuccess } from '../../store/user/user.selector';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('error');

  const [passwordMismatch, setPasswordMismatch] = useState(false);  
  const error = useSelector(selectUserError);
  const success = useSelector(selectUserSuccess);

  useEffect(() => {
    if (error) {
        setSnackbarMessage(error.message || '');
        setAlertSeverity('error');
        setOpenSnackbar(true);
        dispatch(clearSignUpError());
    } else if (success) {
        setSnackbarMessage(success);
        setAlertSeverity('success');
        setOpenSnackbar(true);
        dispatch(clearSignUpError());
    }
}, [error, success, dispatch]);

const handleCloseSignUpSnackbar = () => {
    setOpenSnackbar(false);
};

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    
    dispatch(signUpStart(email, password, displayName));
    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSignUpSnackbar}
            >
                <Alert onClose={handleCloseSignUpSnackbar} severity={alertSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar> 
      <Snackbar
        open={passwordMismatch}
        autoHideDuration={6000}
        onClose={() => setPasswordMismatch(false)}
      >
        <Alert onClose={() => setPasswordMismatch(false)} severity="error">
          Passwords do not match
        </Alert>
      </Snackbar>
    </SignUpContainer> 
  );
};

export default SignUpForm;
