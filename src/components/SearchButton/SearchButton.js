// Import React libraries
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
// Import components
import {
  SearchIcon,
  XIcon,
} from 'dgx-svg-icons';
import SearchBox from '../SearchBox/SearchBox.js';
// GA Utility Library
import utils from '../../utils/utils.js';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
  }

  /**
   * handleOnClick(e)
   * Handles the event when the Search button is clicked
   */
  handleOnClick(e) {
    e.preventDefault();
    if (this.state.active) {
      this.handleOnClickOut();
    } else {
      this.setState({ active: true });
      // Fire GA event to track when the Search Menu is open
      utils.trackHeader('Search', 'Open Menu');
    }
  }

  /**
   * handleOnClickOut()
   * Handles closing SearchBox via click event
   */
  handleOnClickOut() {
    // Update active state only if ACTIVE is true
    if (this.state.active) {
      setTimeout(() => {
        this.setState({ active: false });
        utils.trackHeader('Search', 'Close Menu');
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
    const classes = cx({ active: this.state.active });
    const label = this.state.active ? 'Close' : 'Search';

    const icon = this.state.active
      ? (<XIcon
        className={`${this.props.className}-searchButton-icon`}
        ariaHidden
        fill="#FFF"
        width="20"
        height="20"
      />)
      : (<SearchIcon
        className={`${this.props.className}-searchButton-icon`}
        width="20"
        height="20"
        ariaHidden
      />);
    return (
      <button
        className={`${this.props.className}-searchButton ${classes}`}
        id={`${this.props.className}-searchButton`}
        name="Search Button"
        onClick={e => this.handleOnClick(e)}
      >
        <span className={`${this.props.className}-searchButton-text`}>
          { label }
        </span>
        {icon}
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
    return (this.state.active) ? (
      <div className={`${this.props.className}-desktopSearchBox animatedFast fadeIn`}>
        <SearchBox className="desktopSearch-Form" />
      </div>
    ) : null;
  }

  render() {
    return (
      <div className={`${this.props.className}-searchBox-Wrapper`}>
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: this.handleOnClickOut,
            clickOutsideDeactivates: true,
          }}
          active={this.state.active}
        >
          {this.renderSearchButton()}
          {this.renderSearchBox()}
        </FocusTrap>
      </div>
    );
  }
}

SearchButton.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

export default SearchButton;
