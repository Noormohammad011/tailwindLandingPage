import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import { Link } from 'react-router-dom'
import LoaderComponent from '../partials/LoaderComponent'
const UserListScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1 className='text-center py-8 font-medium'>Users</h1>
      {loading ? (
        <LoaderComponent />
      ) : error ? (
        <h1 className='text-red-600 text-center'>{error}</h1>
      ) : (
        <table class='border-collapse w-full'>
          <thead>
            <tr>
              <th class='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
                {' '}
                ID
              </th>
              <th class='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
                {' '}
                Name
              </th>
              <th class='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
                Email
              </th>
              <th class='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
                Admin
              </th>
              <th class='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                class='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
                key={user._id}
              >
                <td class='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
                  {user._id}
                </td>
                <td class='w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static'>
                  {user.name}
                </td>
                <td class='w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static'>
                  {user.email}
                </td>
                <td class='w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static'>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-check' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td class='w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static'>
                  <button
                    class='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to='/' className='block text-center py-8'>
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          Return Home page
        </button>
      </Link>
    </div>
  )
}

export default UserListScreen
