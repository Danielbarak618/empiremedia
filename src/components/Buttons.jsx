import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { loadCoinData } from '../store/actions/coin-actions'

const ButtonSection = styled.div`
  padding: 40px 0;
  width: 100%;
  height: 100px;
`

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 0 16px;
  color: #000000b3;
  font-family: Arial, Helvetica, sans-serif;

  &:focus {
    padding-bottom: 10px;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.459);
  }

  &:hover {
    color: #005390de;
  }
`

const Buttons = () => {
  const dispatch = useDispatch()
  const btns = [
    ['1min', '1 Minute'],
    ['5min', '5 Minutes'],
    ['1hour', '1 Hour'],
    ['1week', '1 Week'],
  ]

  const handleDataChange = (timePeriod) => {
    dispatch(loadCoinData(timePeriod))
  }

  return (
    <ButtonSection>
      {btns.map((btn, i) => (
        <StyledButton key={btn} onClick={() => handleDataChange(btn[0])}>
          {btn[1]}
        </StyledButton>
      ))}
    </ButtonSection>
  )
}

export default Buttons
