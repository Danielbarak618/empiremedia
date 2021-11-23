import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import bitcoin from '../assets/imgs/btc.png'
import Navbar from './Navbar'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;

  width: 100%;
  padding: 15px 20px 40px;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
`
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    margin-top: 3px;
    p {
      letter-spacing: 1px;
    }
  }
  .info {
    display: flex;
    align-items: center;
    gap: 5px;
    h2 {
      letter-spacing: 3px;
      font-size: 2rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
`
const LeftSide = styled.div`
  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  p {
    margin-top: 10px;
    color: gray;
  }
`
const Header = () => {
  const [socketData, setSocketData] = useState(null)
  const [date, setDate] = useState('')
  useEffect(() => {
    let socket = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon')
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'SUBSCRIBE',
          instruments: ['cc-btc-usd-cccagg'],
        })
      )
    }
    socket.onmessage = (msg) => {
      const dataJson = JSON.parse(msg.data)
      const data = dataJson['cc-btc-usd-cccagg']
      const date = moment(data.lastUpdate)
        .tz('UTC')
        .format('MMM Do, YYYY hh:mm z')
      setSocketData(data)
      setDate(date)
    }

    return () => socket.close()
  }, [])

  return (
    <>
      <StyledHeader>
        <LeftSide>
          <div>
            <img src={bitcoin} alt='bitcoin-img' />
            <h2>Bitcoin</h2>
          </div>

          <p>As of {date}</p>
        </LeftSide>

        <RightSide>
          <div className='info'>
            {socketData?.change > 0 ? (
              <span style={{ color: 'green' }}>&#9650;</span>
            ) : (
              <span style={{ color: 'red' }}>&#9660;</span>
            )}
            <h2>${socketData?.last}</h2>
          </div>

          <div>
            <p style={{ color: socketData?.change > 0 ? 'green' : 'red' }}>
              {socketData?.change.toFixed(2)}
            </p>
            <p style={{ color: socketData?.change > 0 ? 'green' : 'red' }}>
              ({socketData?.percentChange} %)
            </p>
          </div>
        </RightSide>
      </StyledHeader>
      <Navbar />
    </>
  )
}

export default Header
