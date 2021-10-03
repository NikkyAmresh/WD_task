import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { user } = props;
  // console.log(auth);
  const links = user && user.firstname!="?" ? <SignedInLinks user={user} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Task</Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: null,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Navbar)
