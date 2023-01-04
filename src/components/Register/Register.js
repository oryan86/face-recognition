import React, {useState} from 'react'
import logo from '../Logo/brain.png'
import { LockClosedIcon } from '@heroicons/react/20/solid'

const Register = ({onRouteChange, loadUser}) => {

  // STATE
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onEmailChange = (event) => {
      setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user) {
        loadUser(user)
        console.log(user)
        onRouteChange('home')
      }
    })
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className='ml-auto mr-auto border shadow-xl w-[65px] p-2 rounded-md bg-gradient-to-r from-[#ff5edf] to-[#04c8De]'>
                <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register a account
            </h2>
          </div>

          <div className="mt-8 space-y-6" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  onChange={onNameChange}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={onEmailChange}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={onSubmitRegister}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Register
              </button>
            </div>

            <div className="flex justify-center cursor-pointer text-sm ">
              <div>
               <p onClick={() => onRouteChange('signin')} className="font-medium text-black hover:text-indigo-500">Sign In</p>
              </div>  
            </div>

          </div>
        </div>
      </div>
  )
}

export default Register