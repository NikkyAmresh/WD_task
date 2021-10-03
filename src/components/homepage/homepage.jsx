import React from "react";
import { connect } from "react-redux";
import CardList from "../cardList/cardList";
import "./homepage.css";
import { addList } from "../../store/actions/appActions";
import { Redirect } from "react-router-dom";
class HomePage extends React.Component {
  handleListAdd = () => {
    this.props.addList();
  };
  render() {
    const {user,appState} = this.props;
    if (!user) return <Redirect to="/" />;
    console.log(this.props);
    return (
      <div className="homepage-container">
        <button className="listadd-btn" onClick={this.handleListAdd}>
          Add List
        </button>
        <div className="cardlist-container">
          {appState.map((cardlist, cardlistIdx) => (
            <CardList
              key={cardlist.id}
              cardlist={cardlist}
              cardlistIdx={cardlistIdx}
            />
          ))}
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.app.appState,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addList: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
