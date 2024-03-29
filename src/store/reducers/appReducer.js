const initState = {
  appState: []
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case "addCard":
      state.appState[action.idx].cards.push(action.value);
      return {
        appState: [...state.appState],
      };
    case "removeCard":
      state.appState[action.listIdx].cards.splice(action.cardIdx, 1);
      return {
        appState: [...state.appState],
      };
    case "addList":
      return {
        appState: [...state.appState, action.value],
      };
    case "removeList":
      state.appState.splice(action.value, 1);
      return {
        appState: [...state.appState],
      };
    case "moveCard":
      state.appState[action.insIdx].cards.unshift(
        state.appState[action.cardlistInsIdx].cards[action.cardInsIdx]
      );
      state.appState[action.cardlistInsIdx].cards.splice(action.cardInsIdx, 1);
      return {
        appState: [...state.appState],
      };
    case "cardInput":
      state.appState[action.listIdx].cards[action.idx][action.name] =
        action.value;
      return {
        appState: [...state.appState],
      };
    case "addListTitle":
      state.appState[action.idx].title = action.value;
      return {
        appState: [...state.appState],
      };
    case "updateState":
      action.value.map((list)=>{
        if(!list.cards){
          list.cards=[];
        }
      })
      return {
        appState: action.value
      };
    default:
      return state;
  }
};

export default appReducer;
