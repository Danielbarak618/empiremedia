import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { sortData } from '../store/actions/coin-actions'

const HistoryContainer = styled.section`
  width: 100%;
  border: 1px solid #f2f2f252;
`
const HistoryTable = styled.table`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: white;
  text-align: left;
  border-spacing: 0;
  thead {
    tr {
      background-color: #f2f2f2c0;
    }
    div {
      display: flex;
      align-items: center;
      margin-left: 7px;
    }
    .btns {
      display: flex;
      flex-direction: column;
    }

    button {
      all: unset;
      padding: 0;
      cursor: pointer;
      font-size: 10px;
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #f2f2f252;
      }
    }
  }

  td,
  th {
    border-bottom: 1px solid #ddd;
    padding: 1rem;
  }
`

const History = () => {
  const { rates } = useSelector((state) => state.coin)
  const [sortBy, setSortBy] = useState({
    name: 'Date',
    type: 'descending',
  })
  const tableHeads = ['Date', 'High', 'Low', 'Open', 'Close']

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sortData(sortBy))
  }, [sortBy])

  return (
    <HistoryContainer>
      {rates && (
        <HistoryTable>
          <thead>
            <tr>
              {tableHeads.map((head) => (
                <th key={head}>
                  <div>
                    {head}
                    <div className='btns'>
                      <button
                        onClick={() =>
                          setSortBy({ name: head, type: 'ascending' })
                        }
                      >
                        {sortBy.type === 'ascending' && sortBy.name === head ? (
                          <>&#9650;</>
                        ) : (
                          <>&#9651;</>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setSortBy({ name: head, type: 'descending' })
                        }
                      >
                        {sortBy.type === 'descending' &&
                        sortBy.name === head ? (
                          <>&#9660;</>
                        ) : (
                          <>&#9661;</>
                        )}
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rates?.data?.map((rate, idx) => (
              <tr key={idx}>
                <td>{moment(rate.Date).tz('UTC').format('MMM Do, YYYY')}</td>
                <td>
                  {rate.High.toLocaleString('en-US', { currency: 'USD' })}
                </td>
                <td>{rate.Low.toLocaleString('en-US', { currency: 'USD' })}</td>
                <td>
                  {rate.Open.toLocaleString('en-US', { currency: 'USD' })}
                </td>
                <td>
                  {rate.Close.toLocaleString('en-US', { currency: 'USD' })}
                </td>
              </tr>
            ))}
          </tbody>
        </HistoryTable>
      )}
    </HistoryContainer>
  )
}

export default History
