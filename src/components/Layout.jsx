import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useFocusReset } from '../hooks/useFocusReset'

export default function Layout() {
  useFocusReset()

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
