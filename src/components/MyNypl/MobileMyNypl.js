import React from 'react';
import { extend as _extend } from 'underscore';
// Config and Utility
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

const styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0,
  },
  links: {
    display: 'block',
    backgroundColor: '#E43534',
    color: '#FFF',
    padding: 0,
    margin: '60px 0 0 0',
    width: '50%',
    minHeight: '90px',
    float: 'left',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal',
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0',
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0',
  },
  catalogInfoLink: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    clear: 'both',
  },
  researchLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a',
    padding: '1.2em 0 1.75em',
  },
  researchLinkLabel: {
    width: '125px',
  },
  catalogLinkWrapper: {
    borderRight: '1.25px solid #b92b1a',
  },
  catalogLinkLabel: {
    width: '102px',
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)',
  },
};

const MobileMyNypl = ({
  lang,
  className,
  catalogLink,
  researchLink,
  infoLink,
}) => {
  const catalogLinkClass = 'CatalogLink';
  const researchLinkClass = 'ResearchLink';

  return (
    <div
      className={className}
      style={styles.base}
      role="dialog"
    >
      <a
        href={catalogLink}
        className={catalogLinkClass}
        style={styles.links}
        onClick={() => utils._trackHeader('Mobile Log In', 'Catalog')}
      >
        <span
          className={`${catalogLinkClass}-Wrapper`}
          style={_extend(styles.wrapper, styles.catalogLinkWrapper)}
        >
          <span className={`${catalogLinkClass}-Icon nypl-icon-login`} style={styles.icon}>
          </span>
          <span
            className={`${catalogLinkClass}-Label`}
            style={_extend(styles.catalogLinkLabel, styles.label)}
          >
            Log into the Catalog
          </span>
        </span>
      </a>
      <a
        href={researchLink}
        className={researchLinkClass}
        style={styles.links}
        onClick={() => utils._trackHeader('Mobile Log In', 'Research')}
      >
        <span
          className={`${researchLinkClass}-Wrapper`}
          style={_extend(styles.wrapper, styles.researchLinkWrapper)}
        >
          <span className={`${researchLinkClass}-Icon nypl-icon-bldg`} style={styles.icon}></span>
          <span
            className={`${researchLinkClass}-Label`}
            style={_extend(styles.researchLinkLabel, styles.label)}
          >
            Log into the Research Catalog
          </span>
        </span>
      </a>
      <a
        className="Mobile-Catalog-Info"
        href={infoLink}
        lang={lang}
        onClick={() => utils._trackHeader('Mobile Log In', 'Catalog Info')}
        style={styles.catalogInfoLink}
      >
        Catalog Info
      </a>
    </div>
  );
};

MobileMyNypl.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  catalogLink: React.PropTypes.string,
  researchLink: React.PropTypes.string,
  infoLink: React.PropTypes.string,
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  infoLink: appConfig.myNyplLinks.moreInfo,
};

export default MobileMyNypl;
