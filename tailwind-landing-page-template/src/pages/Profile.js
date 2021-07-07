import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Header from '../partials/Header'
import LoaderComponent from '../partials/LoaderComponent'
const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      )
      setMessage('')
    }
  }
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className='flex-grow'>
        <section className='bg-gradient-to-b from-gray-100 to-white'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              {/* Page header */}
              <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
                <h1 className='h1'>
                  Welcome. We exist to make entrepreneurism easier.
                </h1>
              </div>

              {/* Form */}
              <div className='max-w-sm mx-auto'>
                {message && (
                  <h1 className='text-gray-800 text-sm font-medium mb-1 text-center'>
                    {message}
                  </h1>
                )}
                {error && <h1 className='text-red-600 text-center'>{error}</h1>}
                {loading && <LoaderComponent />}
                <form onSubmit={submitHandler}>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='name'
                      >
                        Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        id='name'
                        type='text'
                        className='form-input w-full text-gray-800'
                        placeholder='Enter your name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='email'
                      >
                        Email <span className='text-red-600'>*</span>
                      </label>
                      <input
                        id='email'
                        type='email'
                        className='form-input w-full text-gray-800'
                        placeholder='Enter your email address'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='password'
                      >
                        Password <span className='text-red-600'>*</span>
                      </label>
                      <input
                        id='password'
                        type='password'
                        className='form-input w-full text-gray-800'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label
                        className='block text-gray-800 text-sm font-medium mb-1'
                        htmlFor='password'
                      >
                        Password <span className='text-red-600'>*</span>
                      </label>
                      <input
                        id='password'
                        type='password'
                        className='form-input w-full text-gray-800'
                        placeholder='Enter Confrim password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mt-6'>
                    <div className='w-full px-3'>
                      <button className='btn text-white bg-blue-600 hover:bg-blue-700 w-full'>
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile
