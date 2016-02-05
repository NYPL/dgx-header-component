// Import React libraries
import React from 'react';
import cx from 'classnames';

// Import components
import BasicButton from '../Buttons/BasicButton.js';
import SearchBox from '../SearchBox/SearchBox.js';

// ALT Flux Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';

// GA Utility Library
import utils from '../../utils/utils.js';
import FeatureFlags from 'dgx-feature-flags';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      featureFlags: FeatureFlags.store.getState()
    }
  }

  componentDidMount() {
    FeatureFlags.store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({featureFlags: FeatureFlags.store.getState()});
  }

  render () {
    // Give active class if the button is activated by hover
    let classes = cx({
        'active': HeaderStore._getSearchButtonActionValue() === 'hoverSearch' ||
          HeaderStore._getLastActiveMenuItem() === 'hoverSearch',
      }),
      // Detect if the header is sticky now
      stickyStatus = cx({
        'isSticky': HeaderStore.getState().isSticky
      }),
      searchLabel = <div className={`Search-Text visuallyHidden ${classes} ${stickyStatus}`}>
        Search</div>,
      searchLabelFeature = <div className={`Search-Text ${classes} ${stickyStatus}`}>Search</div>;

    /*
     * Feature Flag -- 'search-label'
     * Return a DOM that includes the search-label text.
    */
    if (FeatureFlags.store._isFeatureActive('search-label')) {
      return (
        <div className={`${this.props.className}-SearchBox-Wrapper`}>
          <BasicButton
            onMouseEnter={this._activateHover.bind(this)}
            onMouseLeave={this._deactivateHover.bind(this)}
            id={`${this.props.className}-SearchButton`}
            className={`nypl-icon-magnifier-fat ${this.props.className}-SearchButton ${classes}`}
            name='Search Button'
            label={searchLabelFeature} />
          <SearchBox 
            id={`${this.props.className}-SearchBox`}
            className={`${this.props.className}-SearchBox`} />
        </div>        
      );
    }

    return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}>
        <BasicButton
          onMouseEnter={this._activateHover.bind(this)}
          onMouseLeave={this._deactivateHover.bind(this)}
          id={`${this.props.className}-SearchButton`}
          className={`nypl-icon-magnifier-fat ${this.props.className}-SearchButton ${classes}`}
          name='Search Button'
          label={searchLabel} />
        <SearchBox 
          id={`${this.props.className}-SearchBox`}
          className={`${this.props.className}-SearchBox`} />
      </div>
    );
  }

  /**
   * _activateHover()
   * Update the Store's searchButtonActionValue
   * with hoverSearch after a set time delay.
   */
  _activateHover() {
    this.hoverTimer = setTimeout(() => {
      Actions.searchButtonActionValue('hoverSearch');

      // Fire GA event to track when the Search Menu is open
      utils._trackHeader('Search', 'Open Menu');
    }, 150);
  }

  /**
   * _hoverClose()
   * Clear the activateHover timer if it exists.
   * Reset the Store's searchButtonActionValue to empty
   * after a set time delay.
   */
  _deactivateHover() {
    clearTimeout(this.hoverTimer);

    setTimeout(() => {
      Actions.searchButtonActionValue('');
    }, 250);
  }
}

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

// Export the component
export default SearchButton;
