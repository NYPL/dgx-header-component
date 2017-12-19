import React from 'react';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import utils from '../../utils/utils.js';
// Dependent NYPL React Component
import DonateButton from '../DonateButton/DonateButton.js';

const styles = {
  base: {
    borderTop: '2px solid #363636',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0,
  },
  links: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal',
  },
  label: {
    fontSize: '16px',
    margin: '0 0 0 10px',
    textTransform: 'uppercase',
    display: 'inline-block',
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0',
  },
  subscribeLinkWrapper: {
    borderLeft: '1.25px solid #252525',
  },
  subscribeLinkLabel: {
    width: '85px',
  },
  libraryCardLinkWrapper: {
    borderRight: '1.25px solid #252525',
  },
  libraryCardLinkLabel: {
    width: '110px',
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595',
    backgroundColor: '#2B2B2B',
  },
  donateLink: {
    padding: '1.75em 0',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    lineHeight: 'normal',
  },
};

const NavMenuMobileButtons = ({
  className,
  libraryCardLink,
  subscribeLink,
}) => {
  const libraryCardClass = 'libraryCardLink';
  const subscribeLinkClass = 'subscribeLink';

  return (
    <div className={className} style={styles.base}>
      <a
        href={libraryCardLink}
        className={libraryCardClass}
        style={styles.links}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Library Card')}
      >
        <span
          className={`${libraryCardClass}-wrapper`}
          style={_extend(styles.wrapper, styles.libraryCardLinkWrapper)}
        >
          <span
            className={`${libraryCardClass}-icon nypl-icon-card`}
            style={styles.icon}
            aria-hidden="true"
          >
          </span>
          <span
            className={`${libraryCardClass}-label`}
            style={_extend(styles.libraryCardLinkLabel, styles.label)}
          >
            Get a Library Card
          </span>
        </span>
      </a>
      <a
        href={subscribeLink}
        className={subscribeLinkClass}
        style={styles.links}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Email Updates')}
      >
        <span
          className={`${subscribeLinkClass}-wrapper`}
          style={_extend(styles.wrapper, styles.subscribeLinkWrapper)}
        >
          <span
            className={`${subscribeLinkClass}-icon nypl-icon-mail`}
            style={styles.icon}
            aria-hidden="true"
          >
          </span>
          <span
            className={`${subscribeLinkClass}-label`}
            style={_extend(styles.subscribeLinkLabel, styles.label)}
          >
            Get Email Updates
          </span>
        </span>
      </a>
      <DonateButton
        id="mobileNav-donateButton"
        className="donateLink"
        style={styles.donateLink}
        gaLabel="Mobile Buttons Donate"
      />
    </div>
  );
};

NavMenuMobileButtons.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  libraryCardLink: PropTypes.string,
  subscribeLink: PropTypes.string,
};

NavMenuMobileButtons.defaultProps = {
  lang: 'en',
  className: 'navMenuMobileButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: '//pages.email.nypl.org/page.aspx' +
    '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default NavMenuMobileButtons;
