// Import React libraries
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
// Import components
import {
  SearchIcon,
  XIcon,
} from '@nypl/dgx-svg-icons';
import SearchBox from '../SearchBox/SearchBox';
// GA Utility Library
import utils from '../../utils/utils';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
  }

  /**
   * Calculate and return rendered width of inactive button label
   */
  getInactiveLabelWidth() {
    if (!this.searchButtonLabel) return null;

    // Calculate horiz padding to remove from clientWidth:
    const horizontalPadding = ['paddingLeft', 'paddingRight']
      .map(prop => getComputedStyle(this.searchButtonLabel)[prop])
      .map(v => parseInt(v, 10))
      .filter(val => val && val > 0)
      .reduce((sum, val) => sum + val, 0);
    return this.searchButtonLabel.clientWidth - horizontalPadding;
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
      const inactiveLabelWidth = this.getInactiveLabelWidth();
      this.setState({ active: true, inactiveLabelWidth });
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

    let label = 'Search';
    let iconComponentType = SearchIcon;
    const labelStyle = {};
    // If active, change to "Close x" mode:
    if (this.state.active) {
      label = 'Close';
      iconComponentType = XIcon;
      // If we have recorded the rendered clientWidth of the inactive label,
      // use it on the *active* label:
      if (this.state.inactiveLabelWidth) labelStyle.width = `${this.state.inactiveLabelWidth}px`;
    }
    const icon = React.createElement(iconComponentType, {
      className: `${this.props.className}-searchButton-icon`,
      ariaHidden: true,
      fill: '#FFF',
      width: '20',
      height: '20',
    });

    return (
      <button
        className={`${this.props.className}-searchButton ${classes}`}
        id={`${this.props.className}-searchButton`}
        name="Search Button"
        onClick={e => this.handleOnClick(e)}
      >
        <span
          className={`${this.props.className}-searchButton-text`}
          ref={(el) => {
            this.searchButtonLabel = el;
          }}
          style={labelStyle}
        >
          {label}
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
        <SearchBox className="desktopSearch-form" />
      </div>
    ) : null;
  }

  render() {
    return (
      <div className={`${this.props.className}-searchBox-wrapper`}>
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
