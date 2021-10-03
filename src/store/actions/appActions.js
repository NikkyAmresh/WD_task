import uuid from "react-uuid";
import { APICall } from "../../helper/api";
import { AREA } from "../../helper/constants";

export const getAllData = () => {
  return (dispatch) => {
    new APICall({
      module: "list",
      apiName: "getAll",
      area: AREA.SECURE,
      params: null,
    })
      .getResponse()
      .then((data) => {
        console.log("data fetched", data);
        dispatch({
          type: "updateState",
          value: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addList = () => {
  return (dispatch, getState) => {
    const appState = getState().app.appState;
    const list = { id: uuid(), title: "" };
    new APICall({
      module: "list",
      apiName: "create",
      area: AREA.SECURE,
      params: { listId: list.id, level: appState.length, title: list.title },
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "addList",
          value: { ...list, cards: [] },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addCard = (cardlistIdx, listId) => {
  return (dispatch) => {
    const card = { id: uuid(), title: "", description: "" };
    new APICall({
      module: "card",
      apiName: "create",
      area: AREA.SECURE,
      params: {
        title: card.title,
        description: card.description,
        cardId: card.id,
        listId: listId,
      },
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "addCard",
          idx: cardlistIdx,
          value: { ...card },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const moveCard = (payload) => {
  return (dispatch) => {
    new APICall({
      module: "card",
      apiName: "update",
      area: AREA.SECURE,
      params: {
        ...payload,
        cardId: payload.cardId,
        listId: payload.listId,
      },
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "moveCard",
          ...payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeList = (idx, listId) => {
  return (dispatch) => {
    new APICall({
      module: "list",
      apiName: "delete",
      area: AREA.SECURE,
      params: listId,
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "removeList",
          value: idx,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const removeCard = (payload) => {
  debugger;
  return (dispatch) => {
    new APICall({
      module: "card",
      apiName: "delete",
      area: AREA.SECURE,
      params: payload.card.card_id,
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "removeCard",
          ...payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cardInput = (payload) => {
  let { name, value } = payload;
  return (dispatch) => {
    new APICall({
      module: "card",
      apiName: "update",
      area: AREA.SECURE,
      params: {
        ...payload.card,
        cardId: payload.card.card_id,
        listId: payload.card.list_id,
        [name]: value,
      },
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "cardInput",
          ...payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addListTitle = (payload) => {
  return (dispatch) => {
    new APICall({
      module: "list",
      apiName: "update",
      area: AREA.SECURE,
      params: {
        listId: payload.listId,
        title: payload.value,
        level: payload.cardlistIdx,
      },
    })
      .getResponse()
      .then(() => {
        dispatch({
          type: "addListTitle",
          idx: payload.cardlistIdx,
          value: payload.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
