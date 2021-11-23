import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const OverviewSection = styled.section`
  width: 100%;
`

const Overview = () => {
  const { rates } = useSelector((state) => state.coin)

  if (!rates) return <div>Loading</div>
  return (
    <OverviewSection>
      {rates && (
        <AreaChart
          width={1300}
          height={550}
          data={rates.data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey='Date' />
          <YAxis />
          <CartesianGrid strokeDasharray='1 1' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Close'
            stroke='blue'
            fillOpacity={1}
            fill='#0078d11a'
          />
        </AreaChart>
      )}
    </OverviewSection>
  )
}

export default Overview
