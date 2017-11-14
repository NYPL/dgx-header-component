import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import axios from 'axios';
import utils from '../../utils/utils';
import config from '../../appConfig.js';
const { fundraising: { apiUrl, bgBannerImage } } = config;

class FundraisingBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerData: {},
      isBannerVisible: false,
    };

    this.closeFundraisingBanner = this.closeFundraisingBanner.bind(this);
  }

  componentDidMount() {
    // Only fetch data if the cookie is not set or false
    if (utils.getCookie('closeFundraisingBanner') !== 'true') {
      this.fetchFundraisingData(apiUrl, this.state.bannerData);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.open == true && this.state.open == false) {
      this.props.onWillOpen();
    }
  }

  /**
   * closeFundraisingBanner()
   * Sets the `closeFundraisingBanner` cookie to expire in 24 hours and updates the `isBannerVisible`
   * boolean to false which will hide the banner.
   */
  closeFundraisingBanner() {
    utils.setCookie('closeFundraisingBanner', true);
    this.setState({ isBannerVisible: false });
  }

  /**
   * fetchFundraisingData()
   * Performs a GET request to the fundraising API only if no data exists. Upon a successful GET
   * request, it will update the `isBannerVisible` boolean to true and populate the `bannerData`
   * object with the API data.
   */
  fetchFundraisingData(apiUrl, currentBannerData) {
    if (!_isEmpty(apiUrl) && _isEmpty(currentBannerData)) {
      return axios
        .get(apiUrl)
        .then(result => {
          if (result.data) {
            this.setState({ bannerData: result.data, isBannerVisible: true });
          }
        })
        .catch(error => {
          console.warn(`Error on Axios GET request: ${apiUrl}`);
          if (error instanceof Error) {
            console.warn(error.message);
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.warn(error.data);
            console.warn(error.status);
          }
        });
    }
  }

  getBackgroundImageStyles(bgImageUrl) {
    const styles = {};
    if (!_isEmpty(bgImageUrl)) {
      styles.background = `#07818d url(${bgImageUrl}) repeat-x 35% 0%`;
    }

    return styles;
  }

  renderBannerImage(imageUrl) {
    return !_isEmpty(imageUrl) ? (
      <div className={`${this.props.className}-imageWrapper`}>
        <img src={imageUrl} alt="" />
      </div>
    ) : null;
  }

  renderBannerHeadline(headline) {
    return !_isEmpty(headline) ? (
      <span className={`${this.props.className}-headline`}>
        {headline}
      </span>
    ) : null;
  }

  renderBannerDescription(desc) {
    return !_isEmpty(desc) ? (
      <span className={`${this.props.className}-description`}>
        {desc}
      </span>
    ) : null;
  }

  renderCloseButton(closeText) {
    return (
      <button
        className={`${this.props.className}-closeButton`}
        onClick={this.closeFundraisingBanner}
      >
        {closeText}
      </button>
    );
  }

  render() {
    const { bannerData, isBannerVisible } = this.state;
    const animationClass = isBannerVisible ? 'show': '';

    return (
      <div
        className={`${this.props.className} ${animationClass}`}
        id={this.props.id}
        style={this.getBackgroundImageStyles(bgBannerImage)}
      >
        { !_isEmpty(bannerData) &&
          <div
            className={`${this.props.className}-wrapper`}
          >
            <a href={!_isEmpty(bannerData.url) ? bannerData.url : '#'}>
              {this.renderBannerImage(bannerData.imageUrl)}
              {this.renderBannerHeadline(bannerData.title)}
              {this.renderBannerDescription(bannerData.description)}
              <span className={`${this.props.className}-button`}>Donate</span>
            </a>
            {this.renderCloseButton('Close')}
          </div>
        }
      </div>
    );
  }
}

FundraisingBanner.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

FundraisingBanner.defaultProps = {
  className: 'FundraisingBanner',
  id: 'FundraisingBanner',
};

export default FundraisingBanner;
