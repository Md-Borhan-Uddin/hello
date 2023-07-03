import DefaultLayout from '@/pages/DefaultLayout'
import Link from 'next/link'
import React from 'react'

export default function PasswordConfirm() {
  return (
    <DefaultLayout>
    
    <div className="flex items-center justify-center h-96">
      <div className="shadow-lg w-3/4 sm:w-1/2 md:w-1/3 p-4 rounded-md">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-3">
          Confirm Your Password
        </h2>
        <form>
          
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="........"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="re-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-password
            </label>
            <input
              type="password"
              id="re-password"
              placeholder="Re-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
       
          <div className="flex justify-end">
            <Link
              href="#"
              className="bg-green-400 hover:bg-green-500 text-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </Link>
          </div>
        </form>
      </div>
    </div>
    </DefaultLayout>
  )
}
