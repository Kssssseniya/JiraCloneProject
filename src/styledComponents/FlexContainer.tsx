
import styled from "styled-components";

export const FlexContainer:any= styled.div`
  display: flex;
  flex-direction: ${({direction}:any) => direction || 'row'};
  justify-content: ${({justify}:any) => justify || 'center'};
  align-items: ${({align}:any) => align || 'center'};
  gap: ${({gap}:any) => gap || 0};
  // width: 100%;
  // height: 100%;
  padding: ${({padding}:any)=>padding||0};
`