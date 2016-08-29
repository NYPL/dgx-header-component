'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Alt Store
// import HeaderStore from '../../stores/HeaderStore.js';
// NYPL Dependent React Components
// import MegaMenu from '../MegaMenu/MegaMenu.js';
// import MegaMenuArrow from '../MegaMenu/MegaMenuArrow.js';

var NavMenuItem = function NavMenuItem(_ref) {
  var className = _ref.className;
  var label = _ref.label;
  var lang = _ref.lang;
  var navId = _ref.navId;
  var target = _ref.target;
  var urlType = _ref.urlType;

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     activeItem: null,
  //     lastActiveMenuItem: '',
  //   };
  //
  //   this.activateHover = this.activateHover.bind(this);
  //   this.deactivateHover = this.deactivateHover.bind(this);
  // }

  /**
   * Sets the state's lastActiveMenuItem and activeItem after a given time delay.
   */
  // activateHover() {
  //   if (this.props.cookie !== '1') {
  //     this.hoverTimer = setTimeout(() => {
  //       this.setState({
  //         lastActiveMenuItem: this.props.navId,
  //         activeItem: this.props.index,
  //       });
  //     }, 80);
  //   }
  // }

  /**
   * Initially clears the hoverTimer initialized by the activateHover function.
   * Then removes the state's activeItem after a given time delay.
   */
  // deactivateHover() {
  //   if (!this.props.cookie !== '1') {
  //     clearTimeout(this.hoverTimer);
  //
  //     setTimeout(() => {
  //       this.setState({ activeItem: null });
  //     }, 250);
  //   }
  // }

  // render() {
  // const target = this.props.target;
  // const linkClass = cx({
  //   active: this.props.index === this.state.activeItem
  //     || HeaderStore.getLastActiveMenuItem() === this.props.navId,
  // });

  // const cookie = this.props.cookie;

  // const megaMenuArrow = (this.props.subNav && this.props.features && (cookie !== '1')) ?
  //   <MegaMenuArrow
  //     navId={this.props.navId}
  //     index={this.props.index}
  //     currentActiveItem={this.state.activeItem}
  //   /> : null;
  // const megaMenu = (this.props.subNav && this.props.features && (cookie !== '1')) ?
  //   <MegaMenu
  //     label={this.props.label}
  //     lang={this.props.lang}
  //     urlType={this.props.urlType}
  //     items={this.props.subNav}
  //     navId={this.props.navId}
  //     features={this.props.features}
  //     topLink={target}
  //     index={this.props.index}
  //     lastActiveMenuItem={this.state.lastActiveMenuItem}
  //     currentActiveItem={this.state.activeItem}
  //   /> : null;

  var convertUrlRelative = function convertUrlRelative(url) {
    if (typeof url !== 'string') {
      return '#';
    }
    var regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);
    // Test regex matching pattern
    return regex.test(url) ? url.replace(regex, '') : url;
  };

  return _react2.default.createElement(
    'li',
    {
      id: navId ? className + '-' + navId : className,
      className: className
    },
    _react2.default.createElement(
      'a',
      {
        href: urlType === 'absolute' ? target : convertUrlRelative(target),
        className: 'NavMenuItem-Link',
        id: navId ? 'NavMenuItem-Link-' + navId : 'NavMenuItem-Link',
        onClick: function onClick() {
          return _utils2.default._trackHeader('Go to...', '' + label[lang].text);
        }
      },
      label[lang].text
    )
  );
  // }
};
// import cx from 'classnames';
// Google Analytics Utility Library


NavMenuItem.propTypes = {
  className: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.object,
  lang: _react2.default.PropTypes.string,
  navId: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

NavMenuItem.defaultProps = {
  className: 'NavMenuItem',
  lang: 'en',
  target: '#'
};

exports.default = NavMenuItem;
module.exports = exports['default'];