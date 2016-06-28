'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _MyNypl = require('../MyNypl/MyNypl.js');

var _MyNypl2 = _interopRequireDefault(_MyNypl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Alt Store/Actions

// GA Utilities

// Component Dependencies


var styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal'
  },
  MyNyplButton: {
    display: 'inline-block',
    border: 'none',
    padding: '9px 10px 10px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    minHeight: '190px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

var MyNyplButton = function (_React$Component) {
  _inherits(MyNyplButton, _React$Component);

  function MyNyplButton(props) {
    _classCallCheck(this, MyNyplButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyNyplButton).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    return _this;
  }

  /**
   * handleClick()
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */


  _createClass(MyNyplButton, [{
    key: 'handleClick',
    value: function handleClick() {
      var visibleState = _HeaderStore2.default._getMyNyplVisible() ? 'Closed' : 'Open';
      _Actions2.default.toggleMyNyplVisible(!_HeaderStore2.default._getMyNyplVisible());
      _utils2.default._trackHeader('Log In', 'MyNyplButton - ' + visibleState);
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (_HeaderStore2.default._getMyNyplVisible()) {
        if (_HeaderStore2.default._getMobileMyNyplButtonValue() === '') {
          _utils2.default._trackHeader('Log In', 'MyNyplButton - Closed');
        }
        _Actions2.default.toggleMyNyplVisible(false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // Assign a variable to hold the reference of state boolean
      var showDialog = _HeaderStore2.default._getMyNyplVisible();
      var buttonClasses = (0, _classnames2.default)({ active: showDialog });
      var myNyplClasses = (0, _classnames2.default)({ 'active animatedFast fadeIn': showDialog });
      var iconClass = (0, _classnames2.default)({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

      return _react2.default.createElement(
        _reactOnclickout2.default,
        { onClickOut: this.handleOnClickOut },
        _react2.default.createElement(
          'div',
          {
            className: 'MyNyplButton-Wrapper',
            ref: 'MyNypl',
            style: [styles.base, this.props.style]
          },
          _react2.default.createElement(
            'button',
            {
              id: 'MyNyplButton',
              className: 'MyNyplButton ' + buttonClasses,
              onClick: this.handleClick,
              style: [styles.MyNyplButton, this.props.style]
            },
            this.props.label,
            _react2.default.createElement('span', { className: iconClass + ' icon', style: styles.MyNyplIcon })
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'MyNypl-Wrapper ' + myNyplClasses,
              style: styles.MyNyplWrapper
            },
            _react2.default.createElement(_MyNypl2.default, null)
          )
        )
      );
    }
  }]);

  return MyNyplButton;
}(_react2.default.Component);

MyNyplButton.propTypes = {
  lang: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In'
};

exports.default = (0, _radium2.default)(MyNyplButton);