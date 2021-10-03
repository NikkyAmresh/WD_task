import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right hide-on-small-only">
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><NavLink to='/'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks