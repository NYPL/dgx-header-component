import React from 'react';
// Config and Utility Library
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

const styles = {
  catalogInfo: {
    bottom: '26px',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    position: 'absolute',
    right: '30px',
    textDecoration: 'underline',
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'Kievit-Book',
    fontSize: '14px',
    letterSpacing: '.03em',
    marginTop: '20px',
    padding: '9px 17px 7px',
  },
};

class MyNypl extends React.Component {
  componentDidMount() {
    this.refs.catalogLink.focus();
  }

  componentWillUnmount() {
    this.refs.catalogLink.blur();
  }

  render() {
    return (
      <div className={this.props.className} role="dialog">
        <ul className={`${this.props.className}-Login-List`}>
          <li>
            <a
              ref="catalogLink"
              href={this.props.catalogLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Catalog-Btn`}
              onClick={() => utils.trackHeader('Log In', 'Catalog')}
            >
              <span className="nypl-icon-login icon"></span>
              LOG INTO THE CATALOG
            </a>
          </li>
          <li>
            <a
              href={this.props.researchLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Research-Btn`}
              onClick={() => utils.trackHeader('Log In', 'Research')}
            >
              <span className="nypl-icon-bldg icon"></span>
              LOG INTO THE RESEARCH CATALOG
            </a>
          </li>
        </ul>

        <a
          href={this.props.infoLink}
          className={`${this.props.className}-Catalog-Link`}
          onClick={() => utils.trackHeader('Log In', 'Catalog Info')}
          style={styles.catalogInfo}
        >
          Catalog Info
        </a>
      </div>
    );
  }
}

MyNypl.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  catalogLink: React.PropTypes.string,
  researchLink: React.PropTypes.string,
  infoLink: React.PropTypes.string,
};

MyNypl.defaultProps = {
  className: 'MyNypl',
  lang: 'en',
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  infoLink: appConfig.myNyplLinks.moreInfo,
};

export default MyNypl;
