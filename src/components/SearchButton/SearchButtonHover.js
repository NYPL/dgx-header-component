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

class SearchButtonHover extends React.Component {
  constructor(props) {
    super(props);

    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
  }

  /**
   * Update the Store's searchButtonActionValue
   * with hoverSearch after a set time delay.
   */
  activateHover() {
    this.hoverTimer = setTimeout(() => {
      Actions.searchButtonActionValue('hoverSearch');

      // Fire GA event to track when the Search Menu is open
      utils._trackHeader('Search', 'Open Menu');
    }, 80);
  }

  /**
   * Clear the activateHover timer if it exists.
   * Reset the Store's searchButtonActionValue to empty
   * after a set time delay.
   */
  deactivateHover() {
    clearTimeout(this.hoverTimer);

    setTimeout(() => {
      Actions.searchButtonActionValue('');
    }, 250);
  }

  render() {
    const rootClass = this.props.className;
    // Give active class if the button is activated by hover
    const classes = cx({
      active: HeaderStore._getSearchButtonActionValue() === 'hoverSearch' ||
        HeaderStore._getLastActiveMenuItem() === 'hoverSearch',
    });
    // Detect if the header is sticky
    const stickyStatus = cx({ isSticky: HeaderStore.getState().isSticky });
    const searchLabel = (
      <span className={`${rootClass}-searchButton-text ${classes} ${stickyStatus}`}>
        Search
      </span>
    );

    return (
      <div className={`${rootClass}-searchBox-Wrapper`}>
        <BasicButton
          onMouseEnter={this.activateHover}
          onMouseLeave={this.deactivateHover}
          id={`${rootClass}-searchButton`}
          className={
            `nypl-icon-magnifier-fat ${rootClass}-searchButton ${classes} ${stickyStatus}`
          }
          name="Search Button"
          label={searchLabel}
        />
        <SearchBox
          id={`${rootClass}-searchBox`}
          className={`${rootClass}-searchBox`}
        />
      </div>
    );
  }
}

SearchButtonHover.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
};

SearchButtonHover.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

// Export the component
export default SearchButtonHover;
