import {
  DropState,
  DropAction,
  SET_DROPDOWNMENU,
  TOGGLE_DROPDOWNMENU
} from '../../../interfaces/dropDownTypes';

const initialState: DropState = {
  slectedType: 'Users',
  displayed: false,
};

const dropDownReducer = (state = initialState, action: DropAction): DropState => {
  switch (action.type) {
    case SET_DROPDOWNMENU:
      return {
        ...state,
        slectedType: action.payload,
      };
    
    case TOGGLE_DROPDOWNMENU:
      return {
        ...state,
        displayed: action.payload,
      };
      
    default:
      return state;
  }
};

export default dropDownReducer;
