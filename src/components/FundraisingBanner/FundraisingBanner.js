import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import axios from 'axios';
import utils from '../../utils/utils';
import config from '../../appConfig.js';
const { fundraising: { apiUrl, bgBannerImages, bgBannerImages_2  } } = config;

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
    if (utils.getCookie(this.props.hideBannerCookieName) !== 'true') {
      this.fetchFundraisingData(apiUrl, this.state.bannerData);
    }
  }

  /**
   * closeFundraisingBanner()
   * Sets the `closeFundraisingBanner` cookie to expire in 24 hours and updates the `isBannerVisible`
   * boolean to false which will hide the banner.
   */
  closeFundraisingBanner() {
    utils.setCookie(this.props.hideBannerCookieName, true);
    this.setState({ isBannerVisible: false });
  }

  /**
   * fetchFundraisingData(apiUrl, currentBannerData)
   * Performs a GET request to the fundraising API only if no data exists. Upon a successful GET
   * request, it will update the `isBannerVisible` boolean to true and populate the `bannerData`
   * object with the API data.
   *
   * @param {string} apiUrl - The API endpoint to fetch fundraising data
   * @param {object} currentBannerData - The object containing the fundraising data
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

  /**
   * getBackgroundImageStyles(bgImageUrl)
   * Assigns the proper background CSS styles if the `bgImageUrl` is not empty
   *
   * @param {string} bgImageUrl - The full path of the background image
   */
  getBackgroundImageStyles(bgImageUrl, bgImageUrl2) {
    const styles = {};
    if (!_isEmpty(bgImageUrl)) {
      styles.backgroundColor = `#07818d`;
      styles.backgroundImage = `url(${bgImageUrl}), url(${bgImageUrl}), url(${bgImageUrl2})`;
      styles.backgroundRepeat = `repeat-x, repeat-x, repeat`;
      styles.backgroundPosition = `0 150%, 55% -110%, 50% 50%`;
    }

    return styles;
  }

  /**
   * renderBannerImage(imageUrl)
   * Generates the DOM for the main fundraising image if the `imageUrl` parameter is not empty
   *
   * @param {string} imageUrl - The full path of the main fundraising image
   */
  renderBannerImage(imageUrl) {
    return !_isEmpty(imageUrl) ? (
      <div className={`${this.props.className}-imageWrapper`}>
        <img src={imageUrl} alt="" />
      </div>
    ) : null;
  }

  /**
   * renderBannerHeadline(headline)
   * Generates the DOM for the headline text if the `headline` parameter is not empty
   *
   * @param {string} headline - String representation of the headline text
   */
  renderBannerHeadline(headline) {
    return !_isEmpty(headline) ? (
      <span className={`${this.props.className}-headline`}>
        {headline}
      </span>
    ) : null;
  }

  /**
   * renderBannerDescription(desc)
   * Generates the DOM for the description text if the `desc` parameter is not empty
   *
   * @param {string} desc - String representation of the description text
   */
  renderBannerDescription(desc) {
    return !_isEmpty(desc) ? (
      <span className={`${this.props.className}-description`}>
        {desc}
      </span>
    ) : null;
  }

  /**
   * renderCloseButton(closeText)
   * Generates the DOM for the description text if the `desc` parameter is not empty
   *
   * @param {string} closeText - String of the close text button element (default: `Close`)
   */
  renderCloseButton(closeText = 'Close') {
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
        style={this.getBackgroundImageStyles(bgBannerImages, bgBannerImages_2)}
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
            {this.renderCloseButton()}
          </div>
        }
      </div>
    );
  }
}

FundraisingBanner.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  hideBannerCookieName: PropTypes.string.isRequired,
};

FundraisingBanner.defaultProps = {
  className: 'FundraisingBanner',
  id: 'FundraisingBanner',
};

export default FundraisingBanner;
