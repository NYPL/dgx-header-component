// Import React libraries
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
// Import components
import BasicButton from '../Buttons/BasicButton.js';
import SearchBox from '../SearchBox/SearchBox.js';
// ALT Flux Store
import HeaderStore from '../../stores/HeaderStore.js';
// GA Utility Library
import utils from '../../utils/utils.js';

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
  }

  /**
   * handleOnClick()
   * Handles when the Search menu item is clicked.
   */
  handleOnClick(e) {
    e.preventDefault();
    if (this.state.active) {
      this.handleOnClickOut();
    } else {
      this.setState({ active: true });

      // Fire GA event to track when the Search Menu is open
      utils._trackHeader('Search', 'Open Menu');
    };
  }

  /**
   * handleOnClickOut()
   * Handles closing the nav item.
   */
  handleOnClickOut() {
    if (this.state.active) {
      utils._trackHeader('Search', 'Close Menu');
    }

    setTimeout(() => {
      this.setState({ active: false });
    }, 250);
  }

  render() {
    const rootClass = this.props.className;
    // Give active class if the button is activated by hover
    const classes = cx({ active: this.state.active });
    // Detect if the header is sticky
    const stickyStatus = cx({ isSticky: HeaderStore.getState().isSticky });
    const searchLabel = (
      <span className={`${rootClass}-searchButton-text ${classes} ${stickyStatus}`}>
        Search
      </span>
    );

    return (
      <div className={`${rootClass}-searchBox-Wrapper`}>
        <ClickOutHandler onClickOut={this.handleOnClickOut}>
          <BasicButton
            id={`${rootClass}-searchButton`}
            className={
              `nypl-icon-magnifier-fat ${rootClass}-searchButton ${classes} ${stickyStatus}`
            }
            name="Search Button"
            label={searchLabel}
            onClick={(e) => this.handleOnClick(e)}
          />
          <SearchBox
            active={this.state.active}
            id={`${rootClass}-searchBox`}
            className={`${rootClass}-searchBox`}
          />
        </ClickOutHandler>
      </div>
    );
  }
}

SearchButton.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

// Export the component
export default SearchButton;
