'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _config$fundraising = _appConfig2.default.fundraising,
    apiUrl = _config$fundraising.apiUrl,
    bgBannerImage = _config$fundraising.bgBannerImage;

var FundraisingBanner = function (_React$Component) {
  _inherits(FundraisingBanner, _React$Component);

  function FundraisingBanner(props) {
    _classCallCheck(this, FundraisingBanner);

    var _this = _possibleConstructorReturn(this, (FundraisingBanner.__proto__ || Object.getPrototypeOf(FundraisingBanner)).call(this, props));

    _this.state = {
      bannerData: {},
      isBannerVisible: false
    };

    _this.closeFundraisingBanner = _this.closeFundraisingBanner.bind(_this);
    return _this;
  }

  _createClass(FundraisingBanner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Only fetch data if the cookie is not set or false
      if (_utils2.default.getCookie(this.props.hideBannerCookieName) !== 'true') {
        this.fetchFundraisingData(apiUrl, this.state.bannerData);
      }
    }

    /**
     * closeFundraisingBanner()
     * Sets the `closeFundraisingBanner` cookie to expire in 24 hours and updates the `isBannerVisible`
     * boolean to false which will hide the banner.
     */

  }, {
    key: 'closeFundraisingBanner',
    value: function closeFundraisingBanner() {
      _utils2.default.setCookie(this.props.hideBannerCookieName, true);
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

  }, {
    key: 'fetchFundraisingData',
    value: function fetchFundraisingData(apiUrl, currentBannerData) {
      var _this2 = this;

      if (!(0, _underscore.isEmpty)(apiUrl) && (0, _underscore.isEmpty)(currentBannerData)) {
        return _axios2.default.get(apiUrl).then(function (result) {
          if (result.data) {
            _this2.setState({ bannerData: result.data, isBannerVisible: true });
          }
        }).catch(function (error) {
          console.warn('Error on Axios GET request: ' + apiUrl);
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

  }, {
    key: 'getBackgroundImageStyles',
    value: function getBackgroundImageStyles(bgImageUrl) {
      var styles = {};
      if (!(0, _underscore.isEmpty)(bgImageUrl)) {
        styles.background = '#07818d url(' + bgImageUrl + ') repeat-x 35% 0%';
      }

      return styles;
    }

    /**
     * renderBannerImage(imageUrl)
     * Generates the DOM for the main fundraising image if the `imageUrl` parameter is not empty
     *
     * @param {string} imageUrl - The full path of the main fundraising image
     */

  }, {
    key: 'renderBannerImage',
    value: function renderBannerImage(imageUrl) {
      return !(0, _underscore.isEmpty)(imageUrl) ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-imageWrapper' },
        _react2.default.createElement('img', { src: imageUrl, alt: '' })
      ) : null;
    }

    /**
     * renderBannerHeadline(headline)
     * Generates the DOM for the headline text if the `headline` parameter is not empty
     *
     * @param {string} headline - String representation of the headline text
     */

  }, {
    key: 'renderBannerHeadline',
    value: function renderBannerHeadline(headline) {
      return !(0, _underscore.isEmpty)(headline) ? _react2.default.createElement(
        'span',
        { className: this.props.className + '-headline' },
        headline
      ) : null;
    }

    /**
     * renderBannerDescription(desc)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} desc - String representation of the description text
     */

  }, {
    key: 'renderBannerDescription',
    value: function renderBannerDescription(desc) {
      return !(0, _underscore.isEmpty)(desc) ? _react2.default.createElement(
        'span',
        { className: this.props.className + '-description' },
        desc
      ) : null;
    }

    /**
     * renderCloseButton(closeText)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} closeText - String of the close text button element (default: `Close`)
     */

  }, {
    key: 'renderCloseButton',
    value: function renderCloseButton() {
      var closeText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Close';

      return _react2.default.createElement(
        'button',
        {
          className: this.props.className + '-closeButton',
          onClick: this.closeFundraisingBanner
        },
        closeText
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          bannerData = _state.bannerData,
          isBannerVisible = _state.isBannerVisible;

      var animationClass = isBannerVisible ? 'show' : '';

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className + ' ' + animationClass,
          id: this.props.id,
          style: this.getBackgroundImageStyles(bgBannerImage)
        },
        !(0, _underscore.isEmpty)(bannerData) && _react2.default.createElement(
          'div',
          {
            className: this.props.className + '-wrapper'
          },
          _react2.default.createElement(
            'a',
            { href: !(0, _underscore.isEmpty)(bannerData.url) ? bannerData.url : '#' },
            this.renderBannerImage(bannerData.imageUrl),
            this.renderBannerHeadline(bannerData.title),
            this.renderBannerDescription(bannerData.description),
            _react2.default.createElement(
              'span',
              { className: this.props.className + '-button' },
              'Donate'
            )
          ),
          this.renderCloseButton()
        )
      );
    }
  }]);

  return FundraisingBanner;
}(_react2.default.Component);

FundraisingBanner.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  hideBannerCookieName: _propTypes2.default.string.isRequired
};

FundraisingBanner.defaultProps = {
  className: 'FundraisingBanner',
  id: 'FundraisingBanner'
};

exports.default = FundraisingBanner;
module.exports = exports['default'];