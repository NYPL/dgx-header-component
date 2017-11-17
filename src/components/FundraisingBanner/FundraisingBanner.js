import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'underscore';
import axios from 'axios';
import utils from '../../utils/utils';
import config from '../../appConfig';
// Fundraising configuration variables
const { fundraising: { apiUrl, primaryBgImage, secondaryBgImage, cookieExpInSeconds } } = config;

class FundraisingBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerData: props.bannerData,
      isBannerVisible: false,
    };

    this.closeFundraisingBanner = this.closeFundraisingBanner.bind(this);
    this.fetchFundraisingData = this.fetchFundraisingData.bind(this);
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
    utils.setCookie(this.props.hideBannerCookieName, 'true', cookieExpInSeconds);
    this.setState({ isBannerVisible: false });
    // Fire the GA event only if the prop gaLabel is not empty
    if (!_isEmpty(this.props.gaLabel)) {
      utils.trackHeader('Close banner button clicked', this.props.gaLabel);
    }
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
          } else {
            console.warn(`Missing response from GET request: ${apiUrl}`, result);
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
   * @param {string} primaryImage - The full path of the primary background image
   * @param {string} secondaryImage - The full path of the secondary background image
   */
  getBackgroundImageStyles(primaryImage, secondaryImage) {
    const styles = { backgroundColor: '#07818d' };

    if (!_isEmpty(primaryImage)) {
      if (_isEmpty(secondaryImage)) {
        styles.backgroundImage = `url(${primaryImage}), url(${primaryImage})`;
        styles.backgroundRepeat = 'repeat-x, repeat-x';
        styles.backgroundPosition = '0 150%, 55% -110%';
      } else {
        styles.backgroundImage = `url(${primaryImage}), url(${primaryImage}), url(${secondaryImage})`;
        styles.backgroundRepeat = 'repeat-x, repeat-x, repeat';
        styles.backgroundPosition = '0 150%, 55% -110%, 50% 50%';
      }
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
   * renderCloseButton(closeText, ariaLabel)
   * Generates the DOM for the description text if the `desc` parameter is not empty
   *
   * @param {string} closeText - String of the close text button element (default: `Close`)
   * @param {string} ariaLabel - String of the aria-label property (default: `Close Fundraising banner`)
   */
  renderCloseButton(closeText = 'Close', ariaLabel = 'Close Fundraising banner') {
    return (
      <button
        aria-label={ariaLabel}
        className={`${this.props.className}-closeButton`}
        onClick={this.closeFundraisingBanner}
      >
        {closeText}
      </button>
    );
  }

  render() {
    const { bannerData, isBannerVisible } = this.state;

    return (
      <div
        className={`${this.props.className} ${isBannerVisible ? 'show': ''}`}
        id={this.props.id}
        style={this.getBackgroundImageStyles(primaryBgImage, secondaryBgImage)}
      >
        { !_isEmpty(bannerData) &&
          <div
            className={`${this.props.className}-wrapper`}
          >
            <a
              onClick={() => {
                !_isEmpty(this.props.gaLabel) && !_isEmpty(bannerData.url) ?
                  utils.trackHeader(bannerData.url, this.props.gaLabel) : null
              }}
              href={!_isEmpty(bannerData.url) ? bannerData.url : '#'}>
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
  bannerData: PropTypes.object,
  gaLabel: PropTypes.string,
  hideBannerCookieName: PropTypes.string.isRequired,
};

FundraisingBanner.defaultProps = {
  className: 'FundraisingBanner',
  id: 'FundraisingBanner',
  bannerData: {},
};

export default FundraisingBanner;
