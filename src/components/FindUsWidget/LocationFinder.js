import React from 'react';

class LocationFinder extends React.Component {

  constructor(props) {
    super(props);

    // Holds the initial component state
    this.state = {
    	zipcode: null,
      disableSubmit: true,
      nearestLocation: null
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    // Reference the zipcode from the state.
  	let zipcode = this.state.zipcode;

    return (
      <div className={this.props.className}>
        <div className={this.props.className + '-Wrapper'}>
          <div className={this.props.className + '-Tag'}>Find a Library</div>
          <label htmlFor='LocationFinder-Input' className={this.props.className + '-IntroText'}>
            Type a zip code where you would like to find a NYPL Location.
          </label>
          <div className={this.props.className + '-SearchBox'}>
            <input type='text' placeholder='Zip Code' id='LocationFinder-Input' ref='zipCodeInput' onChange={this._handleChange} />
            <button type='button' id='LocationFinder-Submit' disabled={this.state.disableSubmit} onClick={this._handleSubmit}>FIND</button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * _handleSubmit() 
   * updates the state reference 
   * which holds the nearestLocation
   * property
   *
   * @return {Object} location
   */
  _handleSubmit() {

  }

  /**
   * _enableSubmitButton() 
   * sets the state's disableSubmit
   * property value to false
   *
   */
  _enableSubmitButton() {
    this.setState({disableSubmit: false});
  }

  /**
   * _getNearestLocations(zipcode) 
   * returns the nearest location object
   * from the list of NYPL locations
   * based of an API.
   *
   * @param {Number} zipcode
   * @return {Object} location
   */
  _getNearestLocations(zipcode) {

  }

  /**
   * _validateZipcode(zipcode) 
   * returns a boolean value based 
   * on the validity of the zipcode param.
   *
   * @param {Number} zipcode
   * @return {Boolean} true/false
   */
  _validateZipcode(zipcode) {
  	if (zipcode && !isNaN(zipcode) && zipcode.length === 5) {
  		return true;
  	}
  	return false;
  }

  /**
   * _getZipcodeValue() 
   * returns the current value
   * from the state zipcode property
   *
   * @return {Number} state.zipcode
   */
  _getZipcodeValue() {
   return this.state.zipcode;
  }

  /**
   * _setZipcodeValue(value) 
   * sets the state's zipcode
   * property with the param value
   *
   * @param {Number} value
   */
  _setZipcodeValue(value) {
    this.setState({zipcode: value});
  }

  /**
   * _handleChange() 
   * handles the changing value
   * of the zipcode input and
   * is responsible for firing off
   * the nearest location suggestions
   *
   */
  _handleChange() {
    let zipcode = React.findDOMNode(this.refs.zipCodeInput).value;

  	if(this._validateZipcode(zipcode)) {

      // Update the state.zipcode value
      this._setZipcodeValue(zipcode);

      // Enable the submitButton
      this._enableSubmitButton();

  		// Execute Autocomplete Search Suggestions
  		console.log('Input is valid, suggestions should be enabled');
  	} else {
  		// Do not execute Autocomplete
  	}
  }
}

LocationFinder.defaultProps = {
  lang: 'en',
  className: 'LocationFinder'
};

export default LocationFinder;