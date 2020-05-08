import React from 'react';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import {
  LibraryCardIcon,
  EnvelopeIcon,
  ShoppingBagIcon,
} from '@nypl/dgx-svg-icons';

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
  subscribeLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2b2b2b',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal',
  },
  galcLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal',
  },
  label: {
    fontSize: '16px',
    margin: '0 3px 0 5px',
    display: 'inline-block',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '1.75em 0',
    width: '100%',
  },
  subscribeLinkWrapper: {
    borderLeft: '0',
  },
  libraryCardLinkWrapper: {
    borderRight: '1px solid #363636',
  },
  shopLinkWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595',
    backgroundColor: '#2B2B2B',
  },
  shopLink: {
    backgroundColor: '#2B2B2B',
    borderTop: '2px solid #363636',
    color: '#FFF',
    display: 'inline-table',
    lineHeight: 'normal',
    margin: '0 0 0 3px',
    padding: 0,
    textAlign: 'center',
    textDecoration: 'none',
  },
};

const NavMenuMobileButtons = ({
  className,
  libraryCardLink,
  subscribeLink,
  shopLink,
}) => {
  const libraryCardClass = 'libraryCardLink';
  const subscribeLinkClass = 'subscribeLink';
  const shopLinkClass = 'shopLink';

  return (
    <div className={className} style={styles.base}>
      <a
        href={libraryCardLink}
        className={libraryCardClass}
        style={styles.galcLinks}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Library Card')}
      >
        <span
          className={`${libraryCardClass}-wrapper`}
          style={_extend({}, styles.wrapper, styles.libraryCardLinkWrapper)}
        >
          <LibraryCardIcon iconId="libraryCardSVG" ariaHidden focusable={false} />
          <span
            className={`${libraryCardClass}-label`}
            style={_extend({}, styles.label)}
          >
            Get a Library Card
          </span>
        </span>
      </a>
      <a
        href={subscribeLink}
        className={subscribeLinkClass}
        style={styles.subscribeLinks}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Email Updates')}
      >
        <span
          className={`${subscribeLinkClass}-wrapper`}
          style={_extend({}, styles.wrapper, styles.subscribeLinkWrapper)}
        >
          <EnvelopeIcon iconId="envelopSVG" ariaHidden focusable={false} />
          <span
            className={`${subscribeLinkClass}-label`}
            style={_extend({}, styles.label)}
          >
            Get Email Updates
          </span>
        </span>
      </a>

      <a
        href={shopLink}
        className={shopLinkClass}
        style={styles.shopLink}
        onClick={() => utils.trackHeader('Click', 'Mobile Bottom Buttons - Shop NYPL')}
      >
        <span
          className={`${shopLinkClass}-wrapper`}
          style={_extend({}, styles.wrapper, styles.shopLinkWrapper)}
        >
          <ShoppingBagIcon iconId="shoppingBagSVG" ariaHidden focusable={false} />
          <span
            className={`${shopLinkClass}-label`}
            style={_extend(styles.shopLinkLabel, styles.label)}
          >
            Shop NYPL
          </span>
        </span>
      </a>


      <DonateButton
        id="mobileNav-donateButton"
        className="donateLink"
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
  shopLink: PropTypes.string,
};

NavMenuMobileButtons.defaultProps = {
  lang: 'en',
  className: 'navMenuMobileButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: 'http://pages.email.nypl.org/page.aspx' +
    '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
  shopLink: 'http://shop.nypl.org/?utm_campaign=NYPLMobileHeaderButton&utm_source=nypl.org&utm_medium=referral',
};

export default NavMenuMobileButtons;
