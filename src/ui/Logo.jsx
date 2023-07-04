import styled from 'styled-components'
import { useColorMode } from '../context/ColorMode'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`

function Logo() {
  const { colorMode } = useColorMode()

  return (
    <StyledLogo>
      <Img src={`/logo-${colorMode}.png`} alt="Logo" />
    </StyledLogo>
  )
}

export default Logo
