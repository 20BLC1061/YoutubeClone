import styled from 'styled-components'

export const Navbar = styled.div`
  background-color: ${props => (props.bgColor ? '#ffffff' : '#231f20')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
`

export const LogOutBtn = styled.button`
  color: ${props => (props.outline ? '#3b82f6' : '#ffffff')};
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 18px;
  border: 2px solid ${props => (props.outline ? '#3b82f6' : '#ffffff')};
  background-color: transparent;
  border-radius: 3px;
  width: 80px;
  cursor: pointer;
  padding: 5px 0px;
  @media (max-width: 576px) {
    display: none;
  }
`

export const IconButton = styled.button`
  background-color: transparent;
  border-style: none;
  color: ${props => (props.iconColor ? '#0000000' : '#ffffff')};
  cursor: pointer;
  @media (min-width: 576px) {
    display: none;
  }
`
