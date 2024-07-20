import {
    signInFailed, 
    signUpFailed, 
    signOutFailed,
    signOutSuccess,
    signInSuccess,
    signUpSuccess,
    clearSignUpError,
    clearSignInError
} from './user.action';
import { AnyAction } from "redux-saga";
import { UserData } from "../../utils/firebase/firebase.utils";
import { AuthError, AuthErrorCodes } from 'firebase/auth';



export type UserState = {
   readonly currentUser: UserData | null;
   readonly isLoading: boolean;
   readonly error: Error | null;
   readonly success: string | null;

}

const INITIAL_STATE : UserState= {
    currentUser: null,
    isLoading : false,
    error : null,
    success: null,

}; 


const clearErrorAndSuccess = (state: UserState, actionType: string) => {
    switch (actionType) {
        case clearSignUpError.type:
            return {
                ...state,
                error: state.success === 'Sign up successful' ? null : state.error,
                success: state.success === 'Sign up successful' ? null : state.success,
            };
        case clearSignInError.type:
            return {
                ...state,
                error: state.success === 'Sign in successful' ? null : state.error,
                success: state.success === 'Sign in successful' ? null : state.success,
            };
        default:
            return state;
    }
};



export const userReducer = (state = INITIAL_STATE, action: AnyAction):UserState => {
    switch (action.type){
        case signUpSuccess.type: {
        return { 
            ...state,
            success: 'Sign up successful',
            error: null 
        };
      }
    
    case signInSuccess.type: {
        return {
            ...state, 
            currentUser: action.payload,
            success: 'Sign in successful',
            error: null,
        }
    }
    case signOutSuccess.type:
        return {
            ...state, 
            currentUser: null, 
            success: 'Sign out successfully', 
            error: null
        };
    
    
        case signUpFailed.type:
            return {
                ...state,
                error: new Error(getErrorMessage(action.payload)),
                success: null,
            };
            
            
            
        case signInFailed.type:
            return {
                ...state,
                error: new Error('Something went wrong, please try again'),
                success: null,
            };
         
         
    case signOutFailed.type : 
        return {...state, error: action.payload};
        
        case clearSignUpError.type:
        case clearSignInError.type:
            return clearErrorAndSuccess(state, action.type);

        
        default:
            return state;
    } 
};


const getErrorMessage = (error: AuthError): string => {
    switch (error?.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            return 'Cannot create user, email already in use';
        case AuthErrorCodes.INVALID_PASSWORD:
            return 'Password did not match';
        case AuthErrorCodes.WEAK_PASSWORD:
            return 'Password is too weak, it must be at least 6 characters long';
        default:
            return 'User creation encountered an error';
    }
};
