import {FC, ButtonHTMLAttributes} from 'react';
import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
  } from './button.styles';
import Spinner from '../spinner/spinner.component'
  
  
  export enum BUTTON_TYPE_CLASSES  {
    base= 'base',
    google= 'google-sign-in',
    inverted= 'inverted'
    };
  
  const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);
    
  export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
    children: React.ReactNode; 
  } & ButtonHTMLAttributes<HTMLButtonElement>
  
  const Button: FC<ButtonProps> = ({ 
    children ,
    isLoading, 
    buttonType, 
    ...otherProps
   }) => {
    const CustomButton = getButton(buttonType);
    return(
     <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <Spinner/> : children}
        </CustomButton>
        );
  };
  
  export default Button;