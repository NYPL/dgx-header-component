import React from 'react';
import Radium from 'radium';
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
    display: 'inline-table',
    backgroundColor: '#E43534',
    color: '#FFF',
    padding: 0,
    margin: '60px 0 0 0',
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none',
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
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
  },
  researchLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a',
    padding: '1.2em 0 1.75em',
  },
  researchLinkLabel: {
    width: '120px',
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

class MobileMyNypl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const catalogLinkClass = 'CatalogLink';
    const researchLinkClass = 'ResearchLink';

    return (
      <div className={this.props.className} style={styles.base}>
        <a
          href={this.props.catalogLink}
          className={catalogLinkClass}
          style={styles.links}
          onClick={utils._trackHeader.bind(this, 'Mobile Log In', 'Catalog')}
        >
          <span
            className={`${catalogLinkClass}-Wrapper`}
            style={[styles.wrapper, styles.catalogLinkWrapper]}
          >
            <span className={`${catalogLinkClass}-Icon nypl-icon-login`} style={styles.icon}>
            </span>
            <span
              className={`${catalogLinkClass}-Label`}
              style={[styles.label, styles.catalogLinkLabel]}
            >
              Log into the Catalog
            </span>
          </span>
        </a>
        <a
          href={this.props.researchLink}
          className={researchLinkClass}
          style={styles.links}
          onClick={utils._trackHeader.bind(this, 'Mobile Log In', 'Research')}
        >
          <span
            className={`${researchLinkClass}-Wrapper`}
            style={[styles.wrapper, styles.researchLinkWrapper]}
          >
            <span className={`${researchLinkClass}-Icon nypl-icon-bldg`} style={styles.icon}></span>
            <span
              className={`${researchLinkClass}-Label`}
              style={[styles.label, styles.researchLinkLabel]}
            >
              Log into the Research Catalog
            </span>
          </span>
        </a>
        <a
          className="Mobile-Catalog-Info"
          href={this.props.infoLink}
          lang={this.props.lang}
          onClick={utils._trackHeader.bind(this, 'Mobile Log In', 'Catalog Info')}
          style={[styles.catalogInfoLink]}
        >
          Catalog Info
        </a>
      </div>
    );
  }
}

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

export default Radium(MobileMyNypl);
