import { SET_DATA, ActionTypes, DataItem } from './actions';

interface State {
  data: DataItem[];
}

const initialState: State = {
  data: [],
};

const rootReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
