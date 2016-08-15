// Import React libraries
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
// Import components
import { SearchIcon } from 'dgx-svg-icons';
import SearchBox from '../SearchBox/SearchBox.js';
// ALT Flux Store
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// GA Utility Library
import utils from '../../utils/utils.js';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
  }

  /**
   * handleOnClick(e)
   * Handles the event when the Search button is clicked
   */
  handleOnClick(e) {
    e.preventDefault();
    // Only handle click event if cookie is set
    if (this.props.cookie === '1') {
      if (this.state.active) {
        this.handleOnClickOut();
      } else {
        this.setState({ active: true });
        // Fire GA event to track when the Search Menu is open
        utils._trackHeader('Search', 'Open Menu');
      }
    }
  }

  /**
   * handleOnClickOut()
   * Handles closing SearchBox via click event
   */
  handleOnClickOut() {
    // Only handle ClickOut events if cookie is SET
    if (this.props.cookie === '1') {
      // Update active state only if ACTIVE is true
      if (this.state.active) {
        utils._trackHeader('Search', 'Close Menu');
        setTimeout(() => {
          this.setState({ active: false });
        }, 200);
      }
    }
  }

  /**
   * Update the Store's searchButtonActionValue
   * with hoverSearch after a set time delay.
   */
  activateHover() {
    // Only handle the hover event if the cookie is NOT set
    if (this.props.cookie !== '1') {
      this.hoverTimer = setTimeout(() => {
        Actions.searchButtonActionValue('hoverSearch');
        // Fire GA event to track when the Search Menu is open
        utils._trackHeader('Search', 'Open Menu');
      }, 80);
    }
  }

  /**
   * Clear the activateHover timer if it exists.
   * Reset the Store's searchButtonActionValue to empty
   * after a set time delay.
   */
  deactivateHover() {
    // Only handle the hover event if the cookie is NOT set
    if (this.props.cookie !== '1') {
      clearTimeout(this.hoverTimer);

      setTimeout(() => {
        Actions.searchButtonActionValue('');
        utils._trackHeader('Search', 'Close Menu');
      }, 200);
    }
  }

  /**
  * renderSearchButton()
  * Generates the button DOM element for the Desktop Search Button.
  * Uses SVG icon & label.
  * @returns {Object} React DOM.
  */
  renderSearchButton() {
    const classes = cx({
      active: this.state.active ||
        HeaderStore._getSearchButtonActionValue() === 'hoverSearch' ||
        HeaderStore._getLastActiveMenuItem() === 'hoverSearch'
    });
    const stickyStatus = cx({ isSticky: HeaderStore.getState().isSticky });

    return (
      <button
        className={`${this.props.className}-searchButton ${classes} ${stickyStatus}`}
        id={`${this.props.className}-searchButton`}
        name="Search Button"
        onClick={(e) => this.handleOnClick(e)}
      >
        <span className={`${this.props.className}-searchButton-text`}>
          Search
        </span>
        <SearchIcon
          className={`${this.props.className}-searchButton-icon`}
          width="20"
          height="20"
          ariaHidden
        />
      </button>
    );
  }

  /**
  * renderSearchBox()
  * Generates the DOM element for the Desktop Search Box.
  * Verifies if isActive is TRUE and returns the proper DOM.
  * @returns {Object} React DOM.
  */
  renderSearchBox() {
    const isActive = (this.state.active ||
      HeaderStore._getSearchButtonActionValue() === 'hoverSearch' ||
      HeaderStore._getLastActiveMenuItem() === 'hoverSearch'
    );
    const sticky = cx({ isSticky: HeaderStore.getState().isSticky });

    return (isActive) ? (
      <div
        className={`${this.props.className}-desktopSearchBox animatedFast fadeIn ${sticky}`}
      >
        <SearchBox className="desktopSearch-Form" />
      </div>
    ) : null;
  }

  render() {
    return (
      <div
        className={`${this.props.className}-searchBox-Wrapper`}
        onMouseEnter={this.activateHover}
        onMouseLeave={this.deactivateHover}
      >
        <ClickOutHandler onClickOut={this.handleOnClickOut}>
          {this.renderSearchButton()}
          {this.renderSearchBox()}
        </ClickOutHandler>
      </div>
    );
  }
}

SearchButton.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  cookie: React.PropTypes.string,
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

export default SearchButton;
