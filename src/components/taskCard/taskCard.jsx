import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { cardInput, removeCard } from "../../store/actions/appActions";
import "./taskCard.css";

class TaskCard extends React.Component {
  handleCardRemove = () => {
    this.props.removeCard({
      listIdx: this.props.cardlistIdx,
      cardIdx: this.props.cardIdx,
    });
  };

  handleCardInput = (e) => {
    this.props.cardInput({
      listIdx: this.props.cardlistIdx,
      idx: this.props.cardIdx,
      name: e.target.name,
      value: e.target.value,
    });
  };

  onDragStart = (e, taskObj) => {
    e.dataTransfer.setData("obj", taskObj.id);
    e.dataTransfer.setData("cardIdx", this.props.cardIdx);
    e.dataTransfer.setData("cardListIdx", this.props.cardlistIdx);
  };

  render() {
    const { card } = this.props;
    const { title, description } = card;
    return (
      <div
        className="task-card"
        onDragStart={(e) => this.onDragStart(e, card)}
        draggable
      >
        <button className="card-remove-btn" onClick={this.handleCardRemove}>
          X
        </button>
        <br></br>
        <label>Title</label>
        <input
          name="title"
          onChange={this.handleCardInput}
          className="task-title"
          value={title}
          placeholder="title"
        />
        <br></br>
        <label>Description</label>
        <textarea
          // @ts-ignore
          rows="4"
          // @ts-ignore
          cols="15"
          name="description"
          onChange={this.handleCardInput}
          className="task-description"
          value={description}
          placeholder="description"
        ></textarea>
        <br></br>
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
    removeCard: (payload) => dispatch(removeCard(payload)),
    cardInput: (payload) => dispatch(cardInput(payload)),
  };
};

export default compose(connect(mapStateToProps,mapDispatchToProps))(TaskCard);
