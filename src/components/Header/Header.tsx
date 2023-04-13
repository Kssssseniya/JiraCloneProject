import { FlexContainer } from '../../styledComponents/FlexContainer';
import './Header.scss'
import React, { PropsWithChildren} from 'react';
import '../../image/Jira_software-Logo.png'
function Header ({children}:PropsWithChildren){
  /* <img  src='https://lh4.googleusercontent.com/5Ix0doe8BBaGGPCvDZgA1FNyowSMciKnbfhbqZ3uPSzlsYmXbfmwlkg87JPyKuAp2dsVEKDNTD2QiSnOxrMazs9PDSYlD_PlnFv59oO64kC8NyTwLsdDchKXc8c0ZcFSpFGCr5pv' alt='logo'/> */
    return(
        <header className="Header">
            <FlexContainer justify='space-between'>
            {/* <div className='Circle'></div> */}
            <div className="waveWrapper waveAnimation">
  <div className="waveWrapperInner bgTop">
    <div className="wave waveTop"></div>
  </div>
  <div className="waveWrapperInner bgMiddle">
    <div className="wave waveMiddle" ></div>
  </div>
  <div className="waveWrapperInner bgBottom">
    <div className="wave waveBottom" ></div>
  </div>
</div>
            <FlexContainer className='Logo' justify='flex-start' align='center' gap ='5px'>
                <linearGradient id="linear-gradient">
  <stop offset="0%" stop-color="gold"/>
  <stop offset="100%" stop-color="teal"/>
  </linearGradient>
                <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">  <linearGradient id="my-cool-gradient" x2="1" y2="1">
    <stop offset="0%" stop-color="#090761" />
    <stop offset="50%" stop-color="#9b11b9" />
    <stop offset="100%" stop-color="#f17feb" />
  </linearGradient><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>jirasoftware</title> <path d="M13.821 3.179l-11.979 11.98c-0.215 0.215-0.348 0.512-0.348 0.84s0.133 0.625 0.348 0.84v0c4.724 4.71 9.435 9.463 14.158 14.157 1.35-1.353 2.185-3.22 2.185-5.282 0-2.112-0.875-4.019-2.283-5.379l-0.002-0.002-4.336-4.335 3.999-3.999c-1.459-1.464-2.361-3.484-2.361-5.715 0-1.12 0.227-2.187 0.639-3.157l-0.020 0.053zM16.005 1.004c-1.353 1.352-2.189 3.22-2.189 5.284 0 2.145 0.904 4.079 2.352 5.441l0.004 0.004 4.264 4.265-3.995 3.996c1.462 1.469 2.366 3.494 2.366 5.731 0 1.106-0.221 2.16-0.621 3.121l0.020-0.054 11.954-11.954c0.215-0.215 0.348-0.512 0.348-0.84s-0.133-0.625-0.348-0.84v0z"></path> </g></svg>
                <p>Jira Software</p>
            </FlexContainer>
               <FlexContainer justify='flex-start'>
                    { children }  
               </FlexContainer>
              
            </FlexContainer> 
        </header>
    )
}
export default Header