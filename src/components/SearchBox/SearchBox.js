// Import React libraries
import React from 'react';
import cx from 'classnames';

// Import components
import InputField from '../InputField/InputField.js';
import SimpleButton from '../Buttons/SimpleButton.js';

// ALT Flux Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';

// GA Utility Library
import gaUtils from '../../utils/gaUtils.js';

class SearchBox extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    
    // The default values of input fields
    this.state = {
      searchKeywords: '',
      searchOption: 'catalog',
      placeholder: 'What would you like to find?',
      placeholderAnimation: null,
      noAnimationBefore: true,
      actionValue: HeaderStore.getState().searchButtonAction,
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem
    };

    // The function listens to the changes of input fields
    this._inputChange = this._inputChange.bind(this);
    // The function sends search requests
    this._submitSearchRequest = this._submitSearchRequest.bind(this);
    // Listen to the event if enter is pressed
    this._triggerSubmit = this._triggerSubmit.bind(this);
    // The fucntion to trigger validation animation for keywords input
    this._animationTimer = this._animationTimer.bind(this);
  }

  // Listen to the search button action changes in Store,
  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  // Update the state of the class
  _onChange() {
    this.setState({
      actionValue: HeaderStore.getState().searchButtonAction,
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem
    });
  }

  // Dom Render Section
  render() {
    // Set active class if search button is hovered or clicked
    let classes = cx({
        'active animateMegaMenuEnter fadeIn': this.state.actionValue === 'hoverSearch',
        'active': HeaderStore._getLastActiveMenuItem() === 'hoverSearch',
        'mobileActive': this.state.actionValue === 'clickSearch'
      }),
      // Classes for keywords input fields to activate pulse animation
      pulseAnimation = cx({
        'keywords-pulse-fade-in': this.state.placeholderAnimation === 'initial',
        'keywords-pulse': this.state.placeholderAnimation === 'sequential'
      }),
      
      // Render radio buttons with their own properties
      inputOptions = inputOptionData.map((element, i) => {
        return (
          <div className={`${this.props.className}-Input-Option`} key={i}>
            <InputField type='radio'
              id={element.id}
              name={element.name}
              value = {element.value}
              ref={element.ref}
              checked={this.state.searchOption === element.value}
              onChange={this._inputChange.bind(this, 'option')} />
            <label htmlFor={element.id} className={`${this.props.className}-Input-Options-label`}>
              {element.labelText}
            </label>
          </div>
        );
      }),

      // Render submit buttons for the mobile version
      mobileSubmitButtons = mobileSubmitButtonData.map((element, i) => {
        return (
          <div key={i}
          className={`${this.props.className}-Mobile-Submit-Option ${element.columnClass}`}
          value={element.value}
          onClick={this._submitSearchRequest.bind(this, element.value)}>
            <span className='title'>{element.text}</span>
            <span className='nypl-icon-wedge-right icon'></span>
          </div>
        );
      });

    return (
      <div 
        id={this.props.id} 
        className={`${this.props.className} ${classes}`} 
        onKeyPress={this._triggerSubmit}
        onMouseEnter={this._watchHoverIntentEnter.bind(this)}
        onMouseLeave={this._watchHoverIntentLeave.bind(this)}>

        <div id={`${this.props.className}-Elements-Wrapper`} className={`${this.props.className}-Elements-Wrapper`}>
          <div id={`${this.props.className}-Elements-Input-Wrapper`}
          className={`${this.props.className}-Elements-Input-Wrapper`}>
            <div id={`${this.props.className}-Elements-Input-Keywords-Wrapper`}
            className={`${this.props.className}-Elements-Input-Keywords-Wrapper`}>
              <div className={`${this.props.className}-Input-Keywords-Border`}>
                <span className='nypl-icon-magnifier-thin icon'></span>
                <InputField type='text'
                id={`${this.props.id}-Input-Keywords`}
                className={`${this.props.className}-Input-Keywords ${pulseAnimation}`}
                ref='keywords'
                value={this.state.searchKeywords}
                maxLength='128'
                placeholder={this.state.placeholder}
                onChange={this._inputChange.bind(this, 'keywords')} />
              </div>
            </div>
            <div id={`${this.props.className}-Elements-Input-Options-Wrapper`}
            className={`${this.props.className}-Elements-Input-Options-Wrapper`}>
              {inputOptions}
            </div>
          </div>

          <div id={`${this.props.className}-Mobile-Submit`}
           className={`${this.props.className}-Mobile-Submit`}>
            {mobileSubmitButtons}
          </div>

          <button id={`${this.props.className}-Elements-SubmitButton`}
          className={`nypl-icon-magnifier-fat ${this.props.className}-Elements-SubmitButton`}
          onClick={this._submitSearchRequest.bind(this, null)}>
          </button>
        </div>
      </div>
    );
  }

  /**
   *  _inputChange(field, event)
   * Listen to the changes on keywords input field and option input fields.
   * Grab the event value, and change the state.
   * The parameter indicates which input field has been changed.
   * Passng event as the argument here as FireFox doesn't accept event
   * as a global variable.
   *
   * @param {String} field  {Event Object} event
   */
  _inputChange(field, event) {
    if (field === 'keywords') {
      this.setState({searchKeywords: event.target.value});
    } else if (field === 'option') {
      this.setState({searchOption: event.target.value});
    }
  }

  /**
   * _submitSearchRequest(value)
   * Submit the search request based on the values of the input fields.
   *
   * @param {String} value
   */
  _submitSearchRequest(value) {
    // Store the data that the user entered
    let requestParameters = {
        keywords: this.state.searchKeywords.trim(),
        // If the value is null, it indicates the function is triggered on desktop version.
        // Then it should get the value for option from state.
        option: value || this.state.searchOption
      },
      // The variable for request URL
      requestUrl,
      encoreBaseUrl = 'http://browse.nypl.org/iii/encore/search/',
      catalogBaseUrl = 'http://www.nypl.org/search/apachesolr_search/',
      gaSearchLabel,
      inputKeywords,
      pulse;

    // Decide the search option based on which button the user clicked on mobile version search box
    if (requestParameters.option === 'catalog') {
      gaSearchLabel = 'Submit Catalog Search';
      requestUrl = this._setEncoreUrl(requestParameters.keywords, encoreBaseUrl, 'eng');
    }  else if (requestParameters.option === 'website') {
      gaSearchLabel = 'Submit Search';
      requestUrl = this._setCatalogUrl(requestParameters.keywords, catalogBaseUrl);
    }

    // This portion is for the interactions if the user doesn't enter any input
    if (!requestParameters.keywords) {
      // The selector for inputKeywords DOM element
      inputKeywords = this.refs.keywords;
      // The new placeholder that tells users there's no keywords input
      this.setState({placeholder: 'Please enter a search term.'});
      // Trigger the validation animation
      this._animationTimer(inputKeywords);
    } else {
      // Fire GA event to track Search
      gaUtils._trackEvent('Search', gaSearchLabel);

      // Go to the search page
      window.location.assign(requestUrl);
    }
  }

  /**
   * _triggerSubmit(event)
   * The fuction listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {Event} event
   */
  _triggerSubmit(event) {
    if (event && event.charCode === 13) {
      this._submitSearchRequest(null);
    }
  }

  /**
   * _animationTimer(element)
   * Add the CSS animation to the placeholder of the keywords Input.
   * It adds the proper class to the html element to trigger the animation,
   * and then removes the class to stop it.
   *
   * @param {DOM Element} element
   */
  _animationTimer(element) {
    let frame = 0,
      animation = setInterval(() => {
        frame ++;
        // Remove the class to stop the animation after 0.1s
        if (frame > 1) {
          clearInterval(animation);
          this.setState({placeholderAnimation: null});
          // Set animation to be sequential
          this.setState({noAnimationBefore: false});
        }
      }, 100);

    // Decide which CSS animation is going to perform
    // by adding different classes to the element.
    // It is based on if it is the first time the validation to be triggered.
    if (this.state.noAnimationBefore) {
      this.setState({placeholderAnimation: 'initial'});
    } else {
      this.setState({placeholderAnimation: 'sequential'});
    }
  }

  /**
   * _watchHoverIntentEnter()
   * If the lastActiveMenuItem passed as a prop
   * matches the search by hover. Then fire the
   * Action to store a reference to the lastActiveMenuItem as hoverSearch.
   */
  _watchHoverIntentEnter() {
    if (this.state.actionValue === 'hoverSearch') {
      Actions.setLastActiveMenuItem(this.state.actionValue);
    }
  }

  /**
   * _watchHoverIntentLeave()
   * Sets the Store's lastActiveMenuItem
   * property to an empty string when
   * hovered out.
   */
  _watchHoverIntentLeave() {
    Actions.setLastActiveMenuItem('');
  }

  /**
   * _setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */
  _setCatalogUrl(searchString, catalogBaseUrl) {
    let catalogUrl = catalogBaseUrl || 'http://www.nypl.org/search/apachesolr_search/';

    if (searchString) {
      return catalogUrl + encodeURIComponent(searchString);
    }
  }

  /**
   * _encoreEncodeSearchString(string)
   * base64_encoding_map includes special characters that need to be
   * encoded using base64 - these chars are "=","/", "\", "?"
   * character : base64 encoded 
   */
  _encoreEncodeSearchString(string) {
    let base64_enc_map = {
        '=': 'PQ==',
        '/': 'Lw==',
        '\\': 'XA==',
        '?': 'Pw=='
      },
      encodedString = string,
      charRegExString,
      base64Regex;

    Object.keys(base64_enc_map).forEach((specialChar) => {
      charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
      base64Regex = new RegExp(charRegExString, 'g');
      encodedString = encodedString.replace(base64Regex, base64_enc_map[specialChar]);
    });

    return encodedString;
  }

  /**
   * _setEncoreUrl(searchInput, baseUrl, language)
   * Returns the final URL for encore search which,
   * is first encoded, then concatenated by the
   * base encore root url. An optional scope and
   * language may be concatenated as well.
   */
  _setEncoreUrl(searchInput, baseUrl, language, scopeString) {
    let searchTerm = this._encoreEncodeSearchString(searchInput),
      rootUrl = baseUrl || 'http://browse.nypl.org/iii/encore/search/',
      defaultLang = (language) ? `?lang=${language}` : '',
      finalEncoreUrl;

    if (searchTerm) {
      finalEncoreUrl = this._encoreAddScope(rootUrl, searchTerm, scopeString) + defaultLang;
    }

    return finalEncoreUrl;
  }

  /**
   * _encoreAddScope(baseUrl, searchString, scopeString)
   * Enchances the encore url with a possible scope.
   * If no scope is set, adds the required string to
   * be returned as the final url.
   */
  _encoreAddScope(baseUrl, searchString, scopeString) {
    return scopeString ? 
      `${baseUrl}C__S${searchString}${scopeString}__Orightresult__U` :
      `${baseUrl}C__S${searchString}__Orightresult__U`;
  }
}

SearchBox.defaultProps = {
  lang: 'en',
  id: 'SearchBox',
  className: 'SearchBox'
};

// Radio button properties
const inputOptionData = [
    {
      id: 'catalog',
      name: 'inputOption',
      value: 'catalog',
      ref: 'optionCatalog',
      labelText: 'Search the Catalog'
    },
    {
      id: 'website',
      name: 'inputOption',
      value: 'website',
      ref: 'optionWebsite',
      labelText: 'Search NYPL.org'
    }
  ],

  // mobile submit button properties
  mobileSubmitButtonData = [
    {
      columnClass: 'left-column',
      value: 'catalog',
      text: 'catalog'
    },
    {
      columnClass: 'right-column',
      value: 'website',
      text: 'nypl.org'
    }
  ];

// Export the component
module.exports = SearchBox;