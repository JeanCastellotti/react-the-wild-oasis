import { useColorMode } from '../context/ColorMode'
import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ButtonIcon onClick={toggleColorMode}>
      {colorMode === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  )
}

export default DarkModeToggle
