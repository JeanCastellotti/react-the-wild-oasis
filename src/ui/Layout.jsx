import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styled from 'styled-components'

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 4.8rem 6.4rem;
`

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  )
}

export default Layout
