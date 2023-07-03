import DefaultLayout from '@/pages/DefaultLayout'
import Link from 'next/link'
import React from 'react'

export default function ForgetPassword() {
  return (
    <DefaultLayout>
    
    <div className="flex items-center justify-center h-48">
      <div className="shadow-lg w-3/4 sm:w-1/2 md:w-1/3 p-4 rounded-md">
        
        <form>
          
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Your Registred Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          
            <Link
              href="/account/forget-password/password-confirm"
              passHref
              legacyBehavior
              >
              <a
              className="text-white block bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-300"
              
              >

              Submit
              </a>
            </Link>
        </form>
      </div>
    </div>
    </DefaultLayout>
  )
}
