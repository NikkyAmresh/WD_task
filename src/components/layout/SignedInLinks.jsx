import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right hide-on-small-only">
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <button className="btn btn-floating pink lighten-1">
            {props.user.firstname[0]}
            {props.user.lastname[0]}
          </button>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
