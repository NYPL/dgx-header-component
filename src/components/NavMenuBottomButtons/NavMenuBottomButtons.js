import React from 'react';
import { extend as _extend } from 'underscore';
import utils from '../../utils/utils.js';
// Dependent NYPL React Component
import DonateButton from '../DonateButton/DonateButton.js';

const styles = {
  base: {
    borderTop: '2px solid #363636',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0,
  },
  links: {
    display: 'inline-table',
    color: '#FFF',
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

const NavMenuBottomButtons = ({
  className,
  libraryCardLink,
  subscribeLink,
}) => {
  const libraryCardClass = 'LibraryCardLink';
  const subscribeLinkClass = 'SubscribeLink';

  return (
    <div className={className} style={styles.base}>
      <a
        href={libraryCardLink}
        className={libraryCardClass}
        style={styles.links}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Library Card')}
      >
        <span
          className={`${libraryCardClass}-Wrapper`}
          style={_extend(styles.wrapper, styles.libraryCardLinkWrapper)}
        >
          <span
            className={`${libraryCardClass}-Icon nypl-icon-card`}
            style={styles.icon}
            aria-hidden="true"
          >
          </span>
          <span
            className={`${libraryCardClass}-Label`}
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
          className={`${subscribeLinkClass}-Wrapper`}
          style={_extend(styles.wrapper, styles.subscribeLinkWrapper)}
        >
          <span
            className={`${subscribeLinkClass}-Icon nypl-icon-mail`}
            style={styles.icon}
            aria-hidden="true"
          >
          </span>
          <span
            className={`${subscribeLinkClass}-Label`}
            style={_extend(styles.subscribeLinkLabel, styles.label)}
          >
            Get Email Updates
          </span>
        </span>
      </a>
      <DonateButton
        id="MobileNav-DonateButton"
        className="DonateLink"
        style={styles.donateLink}
        gaLabel="Mobile Buttons Donate"
      />
    </div>
  );
};

NavMenuBottomButtons.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  libraryCardLink: React.PropTypes.string,
  subscribeLink: React.PropTypes.string,
};

NavMenuBottomButtons.defaultProps = {
  lang: 'en',
  className: 'NavMenuBottomButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: '//pages.email.nypl.org/page.aspx' +
    '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default NavMenuBottomButtons;
