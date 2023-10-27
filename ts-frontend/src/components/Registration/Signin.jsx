import React from "react";
import { Link } from "react-router-dom";

const SignIn = ({ userId, setUserId, handleLogin, url, error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black shadow-lg rounded-lg p-8 w-full md:w-96">
        <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-700 text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              User ID
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userId"
              type="text"
              placeholder="Enter your User ID here"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
              type="button"
            >
              Sign In
            </button>
            <Link
              to={url}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Register as a new user!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
