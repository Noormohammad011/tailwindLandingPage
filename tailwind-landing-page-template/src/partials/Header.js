import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [top, setTop] = useState(true)

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && 'bg-white blur shadow-lg'
      }`}
    >
      <div className='max-w-6xl mx-auto px-5 sm:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Site branding */}
          <div className='flex-shrink-0 mr-4'>
            {/* Logo */}
            <Link to='/' className='block' aria-label='Cruip'>
              <svg
                className='w-8 h-8'
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs>
                  <radialGradient
                    cx='21.152%'
                    cy='86.063%'
                    fx='21.152%'
                    fy='86.063%'
                    r='79.941%'
                    id='header-logo'
                  >
                    <stop stopColor='#4FD1C5' offset='0%' />
                    <stop stopColor='#81E6D9' offset='25.871%' />
                    <stop stopColor='#338CF5' offset='100%' />
                  </radialGradient>
                </defs>
                <rect
                  width='32'
                  height='32'
                  rx='16'
                  fill='url(#header-logo)'
                  fillRule='nonzero'
                />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className='flex justify-center'>
            <ul className='flex sm:justify-items-center flex-grow justify-end flex-wrap items-center px-4'>
              {userInfo ? (
                <>
                  <li className='px-2'>
                    <Link
                      to='/profile'
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full'
                    >
                      {userInfo.name}
                    </Link>
                  </li>
                  <li className='px-2'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className='px-2'>
                  <Link
                    to='/signin'
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                  >
                    Sign in
                  </Link>
                </li>
              )}

              {userInfo && userInfo.isAdmin && (
                <>
                  {' '}
                  <li className='px-2'>
                    <Link
                      to='/admin/userlist'
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full'
                    >
                      Admin
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
