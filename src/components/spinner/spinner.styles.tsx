import styled from "styled-components";
import { dotSpinner } from 'ldrs'

export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const SpinnerContainer = () => {
  dotSpinner.register()

  return (
    <l-dot-spinner
      size="40"
      speed="0.9" 
      color="black" 
    ></l-dot-spinner>
  )
}
