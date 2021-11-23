import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledNav = styled.nav`
  /* padding: 25px 0; */
  padding: 25px 0;
  margin-top: 5px;
  width: 100%;
  /* padding-bottom: 10px; */
  border-bottom: 1px solid #b7b7b74f;
`
const StyledLink = styled(NavLink)`
  /* padding: 16px 30px; */
  padding: 25px 25px;
  color: #808080cc;
  font-weight: bold;
  letter-spacing: -0.2px;
  text-decoration: none;
  /* border-bottom: 4px solid gray; */

  &.active {
    color: #005390de;
    border-bottom: 1.5px solid #005390de;
  }
`

const Navbar = () => {
  return (
    <StyledNav>
      <>
        <StyledLink to='/' exact>
          Overview
        </StyledLink>
        <StyledLink to='/history' exact>
          History
        </StyledLink>
      </>
    </StyledNav>
  )
}

export default Navbar
