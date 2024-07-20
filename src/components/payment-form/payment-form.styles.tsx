import styled from 'styled-components';
import { SpinnerContainer } from '../spinner/spinner.styles';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    height: 200px;
  }
  `;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
  @media screen and (max-width: 800px) {
   min-width: unset;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isLoading }) => isLoading &&`
    pointer-events: none;
    background-color: white;
    border: 1px solid black;
    color: transparent;
  `}
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; 
`;