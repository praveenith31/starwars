import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { fetchSearchResults } from "../actions/index";


class SearchForm extends Component {

	constructor() {
	    super();

	    this.state = {
	      searchString: "",
	      searchError: false
	    };
	    this.searchCount = 0;

	    this.handleChange = this.handleChange.bind(this);
	  }

	componentWillMount() {
		if (this.props.user.valid === false) {
			this.props.history.push('/');
		}
	}


	handleChange(event) {
	    this.setState({ [event.target.id]: event.target.value });
	    const searchString = event.target.value;
	    this.searchCount++;
	    const maxSearchNotReached = (this.searchCount < 15 || this.props.user.userName.toLowerCase() === 'luke skywalker');
	    if (searchString !== '' && maxSearchNotReached) {
	    	setTimeout(
	    		this.props.fetchSearchResults(searchString), 0);
	    }
	    if (!maxSearchNotReached) {
	    	this.setState({
	    		searchError: true
	    	})
	    }
	}

	resultGrid(gridData, key, popDensity) {
		
		return (
			<div className="grid-result border border-success rounded p-2 mb-2" key={key} data-attr-x={popDensity} style={{fontSize: ((popDensity*4) + 10) }}>
				<h1 style={{fontSize: ((popDensity*4) + 10) }}>Name: {gridData.name}</h1>
				<span>Population: {gridData.population}</span>
			</div>
			)
	}

	loader() {
		if(this.props.loading) {
			return (<div className="loader"></div>)
		}
		return null
	}

	renderResults() {
		const {planets} = this.props;
		const planetHash = {};

		const sortedPlanets = Array.prototype.slice.call(planets).sort((a, b) => {
			return a.population - b.population
		});

		for (let i=0; i < sortedPlanets.length; i++) {
			planetHash[sortedPlanets[i].name] = i+1;
		}

		console.log(':::', sortedPlanets, planets);

		if (planets.length) {
			return (
				<div>
					<h4>The planets are listed here: </h4>
					{
						planets.map((planet, key) => {
							return this.resultGrid(planet, key, planetHash[planet.name])	
						})
					}
				</div>
				)
		}
		return null
	}

	showError() {
		const {errorFlag, duplicateFlag} = this.props;

		if (this.state.searchError) {
			return (
				<div className="border border-danger">
					Maximum search limit is reached. 
				</div>
			)
		}

		if (errorFlag) {
			return (
				<div className="border border-danger">
					There is no such planet that exists. Please try again with a different input.
				</div>
			)
		}

		if (duplicateFlag) {
			return (
				<div className="border border-danger">
					The planet you searched is already listed. Please try again with a different input.
				</div>
			)
		}
		return null

	}

	render() {
		const loaderCls = this.props.loading ? 'list-group-item lowOpacity': 'list-group-item';
		return (
			<div className={loaderCls}>
					<h2>Search begins here</h2>
					<div className="form-group">
			          <input 
			          type="text" 
			          name="searchbox" 
			          id="searchString"
			          onChange = {this.handleChange}
			          disabled = {this.state.searchError}/>
			          {this.loader()}
			        </div>
			        {this.showError()}
			        <br />
			        <div className="search-results">
			        	{this.renderResults()}
			        </div>
			</div>
		);
	}
}

const mapDispatchToProps = {
  fetchSearchResults
};

const mapStateToProps = (state) => ({
	errorFlag: state.search.errorFlag,
	planets: state.search.planets,
	duplicateFlag: state.search.duplicateFlag,
	user: state.user,
	loading: state.search.loading
});

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchForm);


export default Search;
