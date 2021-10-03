import React from "react";
import TaskCard from "../taskCard/taskCard";
import "./cardList.css";
import {
  addCard,
  addListTitle,
  moveCard,
  removeList,
} from "../../store/actions/appActions";
import { connect } from "react-redux";
import { compose } from "redux";

class CardList extends React.Component {
  handleCardAdd = () => {
    this.props.addCard(this.props.cardlistIdx);
  };

  handleListRemove = () => {
    this.props.removeList(this.props.cardlistIdx);
  };

  handleListTitleChange = (e) => {
    this.props.addListTitle({
      cardlistIdx: this.props.cardlistIdx,
      value: e.target.value,
    });
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, cardlist) => {
    const cardInsIdx = e.dataTransfer.getData("cardIdx");
    const cardlistInsIdx = e.dataTransfer.getData("cardListIdx");
    let insIdx = this.props.appState.findIndex(
      (listObj) => listObj.id === cardlist.id
    );
    insIdx = insIdx === -1 ? 0 : insIdx;
    this.props.moveCard({ insIdx, cardInsIdx, cardlistInsIdx });
  };

  render() {
    const { cardlistIdx, cardlist, appState } = this.props;
    const { cards, title } = cardlist;
    return (
      <div className='section'>
      <div
        className="card-list col s12 card"
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e, cardlist)}
      >
        <input
          className="card-list-name"
          onChange={this.handleListTitleChange}
          placeholder="card list name"
          value={title}
        />
        <button className="listadd-btn" onClick={this.handleListRemove}>
          Remove List
        </button>
        <span className="card-number">
          {appState[cardlistIdx].cards.length}
        </span>
        <div className="card-list-container">
          {cards.map((card, cardIdx, arr) => (
            <TaskCard
              key={card.id}
              card={card}
              cardIdx={cardIdx}
              cardlistIdx={cardlistIdx}
            />
          ))}
        </div>
        <button className="card-add-btn" onClick={this.handleCardAdd}>
          +
        </button>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.app.appState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (idx) => dispatch(addCard(idx)),
    moveCard: (idx) => dispatch(moveCard(idx)),
    removeList: (idx) => dispatch(removeList(idx)),
    addListTitle: (idx) => dispatch(addListTitle(idx)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(CardList);
