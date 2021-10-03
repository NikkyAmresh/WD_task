import uuid from "react-uuid";

export const addList = () => {
  return (dispatch) => {
    dispatch({
      type: "addList",
      value: { id: uuid(), title: "", cards: [] },
    });
    dispatch({
      type: "updateState",
    });;
  };
};

export const moveCard = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "moveCard",
      ...payload,
    });
    dispatch({
      type: "updateState",
    });
  };
};

export const removeList = (idx) => {
  return (dispatch) => {
    dispatch({
      type: "removeList",
      value: idx,
    });
    dispatch({
      type: "updateState",
    });
  };
};

export const removeCard = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "removeCard",
      ...payload,
    });
    dispatch({
      type: "updateState",
    });
  };
};

export const cardInput = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "cardInput",
      ...payload,
    });
    dispatch({
      type: "updateState",
    });
  };
};

export const addCard = (cardlistIdx) => {
  return (dispatch) => {
    dispatch({
      type: "addCard",
      idx: cardlistIdx,
      value: {
        id: uuid(),
        title: "",
        description: "",
      },
    });
    dispatch({
      type: "updateState",
    });
  };
};
export const addListTitle = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "addListTitle",
      idx: payload.cardlistIdx,
      value: payload.value,
    });
    dispatch({
      type: "updateState",
    });
  };
};
