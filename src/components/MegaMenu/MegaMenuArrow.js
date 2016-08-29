import React from 'react';
import cx from 'classnames';
// ALT Flux Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';

const MegaMenuArrow = ({ index, navId, currentActiveItem }) => {
  // Dynamic class assignment based on activeItem property matching current index.
  const classes = cx('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', {
    'active animateMegaMenuArrowEnter fadeIn': index === currentActiveItem,
    active: HeaderStore.getLastActiveMenuItem() === navId &&
      index !== currentActiveItem,
  });

  return (
    <span className={`NavMenuItem-Arrow-${navId} ${classes}`} />
  );
};

MegaMenuArrow.propTypes = {
  index: React.PropTypes.number,
  currentActiveItem: React.PropTypes.number,
  navId: React.PropTypes.string,
};

export default MegaMenuArrow;
