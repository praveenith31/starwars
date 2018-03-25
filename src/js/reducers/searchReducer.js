import { SEARCH_COMPLETED, SEARCH_FAILED, DUPLICATE_PLANET_FOUND, STOP_LOADING_RESULTS, LOADING_RESULTS } from "../constants/action-types";

const searchReducer = (state = {planets: []}, action) => {
  switch (action.type) {
    case SEARCH_COMPLETED:
      return Object.assign({}, state, {planets: [...state.planets, action.payload], errorFlag: false, duplicateFlag: false}); 
    case SEARCH_FAILED:
     	return Object.assign({}, state, {errorSearch: action.payload, errorFlag: true, duplicateFlag: false});
    case DUPLICATE_PLANET_FOUND:
	    return Object.assign({}, state, {duplicatePlanet: action.payload, duplicateFlag: true, errorFlag: false});
	case LOADING_RESULTS:
		return Object.assign({}, state, {loading: true});
    case STOP_LOADING_RESULTS:
		return Object.assign({}, state, {loading: false});
    default:
      return state;
  }
};

export default searchReducer;
