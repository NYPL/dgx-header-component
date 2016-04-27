import Radium from 'radium';
import React from 'react';
// Config and Utility Library
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

const styles = {
  base: {
    backgroundColor: '#1DA1D4',
    padding: '0px',
    width: 'auto',
  },
  display: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  catalogInfo: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '200',
    position: 'absolute',
    bottom: '26px',
    right: '30px',
    textDecoration: 'underline',
  },
  loginButtons: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '9px 10px 7px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
    marginTop: '20px',
  },
};

class MyNypl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>
        <ul className={`${this.props.className}-Login-List`}>
          <li>
            <a
              href={this.props.catalogLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Catalog-Btn`}
              onClick={utils._trackHeader.bind(this, 'Log In', 'Catalog')}
            >
              <span className="nypl-icon-login icon"></span>
              LOG INTO THE CATALOG
            </a>
          </li>
          <li>
            <a
              href={this.props.classicLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Classic-Btn`}
              onClick={utils._trackHeader.bind(this, 'Log In', 'Classic')}
            >
              <span className="nypl-icon-bldg icon"></span>
              LOG INTO THE CLASSIC CATALOG
            </a>
          </li>
        </ul>

        <a
          href={this.props.infoLink}
          className={`${this.props.className}-Catalog-Link`}
          onClick={utils._trackHeader.bind(this, 'Log In', 'Catalog Info')}
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
  classicLink: React.PropTypes.string,
  infoLink: React.PropTypes.string,
};

MyNypl.defaultProps = {
  id: 'MyNypl',
  className: 'MyNypl',
  lang: 'en',
  catalogLink: appConfig.myNyplLinks.catalog,
  classicLink: appConfig.myNyplLinks.classic,
  infoLink: appConfig.myNyplLinks.moreInfo,
};

export default Radium(MyNypl);
