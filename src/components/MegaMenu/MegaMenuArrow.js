import React from 'react';
import cx from 'classnames';

// ALT Flux Store/Actions
import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

class MegaMenuArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    let classes = cx('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', 
      {
        'active animateMegaMenuArrowEnter fadeIn': this.props.index === this.props.currentActiveItem,
        'active': HeaderStore._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
      });

    return (
      <span
        className={`NavMenuItem-Arrow-${this.props.navId} ${classes}`}>
      </span> 
    );
  }
}

MegaMenuArrow.defaultProps = {
  lang: 'en'
};

export default MegaMenuArrow;