import { baseURL } from "../constants/action-types";


export const checkUserCredentials = (user) => {
	return (dispatch) => {
		dispatch(IsuserValid(user))
	}
};

const IsuserValid = (user) => {
	if (user.isValid) {
		return validCredentials(user)
	} else {
		return invalidCredentials(user)
	}
}

const validCredentials = (user) => {
	return {
		type: 'USER_VALID',
		payload: user
	}
}

const invalidCredentials = (user) => {
	return {
		type: 'USER_INVALID',
		payload: user
	}
}

const setSearchResults = (searchData, planets) => {
	return {
		type: 'SEARCH_COMPLETED',
		payload: searchData
	}
}

const duplicatePlanetFound = (duplicatePlanetName) => {
	return {
		type: 'DUPLICATE_PLANET_FOUND',
		payload: duplicatePlanetName
	}
}

const doesPlanetAlreadyExist = (searchData, planets) => {
	return (dispatch) => {
		let doesPlanetExist = false;
		planets.map((planet) => {
			if(planet.name === searchData.name) {
				doesPlanetExist = true;
			}
		});
		if (!doesPlanetExist || !planets.length) {
			dispatch(setSearchResults(searchData, planets))
		} else {
			dispatch(duplicatePlanetFound(searchData.name))
		}
	}
}

const setErrorInSearchResults = (error) => {
	return {
		type: 'SEARCH_FAILED',
		payload: error
	}
}

const showLoader = () => {
	return {
		type: 'LOADING_RESULTS'
	}
}

const hideLoader = () => {
	return {
		type: 'STOP_LOADING_RESULTS'
	}
}

export const fetchSearchResults = (searchData) => {
	return (dispatch, getState) => {
		dispatch(showLoader());
		const planets = getState().search.planets;
		console.log('::::', planets);
		fetch(`${baseURL}planets/${searchData}`).then((response) => {
			dispatch(hideLoader());
			if (response.ok === false) {
				throw error;
			}
			return response.json()
		}).then(result => dispatch(doesPlanetAlreadyExist(result, planets)))
		  .catch(error => dispatch(setErrorInSearchResults(error)));
	}
}

