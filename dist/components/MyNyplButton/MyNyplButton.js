'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var _MyNyplMyNyplJs = require('../MyNypl/MyNypl.js');

var _MyNyplMyNyplJs2 = _interopRequireDefault(_MyNyplMyNyplJs);

var styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '9px 10px 11px 20px'
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

var MyNyplButton = (function (_React$Component) {
  _inherits(MyNyplButton, _React$Component);

  function MyNyplButton(props) {
    _classCallCheck(this, MyNyplButton);

    _get(Object.getPrototypeOf(MyNyplButton.prototype), 'constructor', this).call(this, props);

    this.state = {
      myNyplVisible: _storesHeaderStoreJs2['default']._getMyNyplVisible(),
      target: this.props.target
    };
  }

  _createClass(MyNyplButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHeaderStoreJs2['default'].listen(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHeaderStoreJs2['default'].unlisten(this._onChange.bind(this));
    }

    /**
     * _handleClick(e)
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */
  }, {
    key: '_handleClick',
    value: function _handleClick(e) {
      if (this.state.target === '#') {
        e.preventDefault();

        var visibleState = this.state.myNyplVisible ? 'Closed' : 'Open';
        _actionsActionsJs2['default'].toggleMyNyplVisible(!this.state.myNyplVisible);
        _utilsUtilsJs2['default']._trackHeader('Log In', 'MyNyplButton - ' + visibleState);
      }
    }

    /**
     * _handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */
  }, {
    key: '_handleOnClickOut',
    value: function _handleOnClickOut() {
      if (_storesHeaderStoreJs2['default']._getMyNyplVisible()) {
        if (_storesHeaderStoreJs2['default']._getMobileMyNyplButtonValue() === '') {
          _utilsUtilsJs2['default']._trackHeader('Log In', 'MyNyplButton - Closed');
        }
        _actionsActionsJs2['default'].toggleMyNyplVisible(false);
      }
    }

    /**
     * _onChange()
     * Updates the state of the form based off the Header Store.
     */
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({ myNyplVisible: _storesHeaderStoreJs2['default']._getMyNyplVisible() });
    }
  }, {
    key: 'render',
    value: function render() {
      // Assign a variable to hold the reference of state boolean
      var showDialog = this.state.myNyplVisible;
      var buttonClasses = (0, _classnames2['default'])({ active: showDialog });
      var myNyplClasses = (0, _classnames2['default'])({ 'active animatedFast fadeIn': showDialog });
      var iconClass = (0, _classnames2['default'])({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

      return _react2['default'].createElement(
        _reactOnclickout2['default'],
        { onClickOut: this._handleOnClickOut.bind(this) },
        _react2['default'].createElement(
          'div',
          {
            className: 'MyNyplButton-Wrapper',
            ref: 'MyNypl',
            style: [styles.base, this.props.style]
          },
          _react2['default'].createElement(
            'a',
            {
              id: 'MyNyplButton',
              className: 'MyNyplButton ' + buttonClasses,
              href: this.props.target,
              onClick: this._handleClick.bind(this),
              style: [styles.SimpleButton, this.props.style]
            },
            this.props.label,
            _react2['default'].createElement('span', { className: iconClass + ' icon', style: styles.MyNyplIcon })
          ),
          _react2['default'].createElement(
            'div',
            {
              className: 'MyNypl-Wrapper ' + myNyplClasses,
              style: [styles.MyNyplWrapper]
            },
            _react2['default'].createElement(_MyNyplMyNyplJs2['default'], null)
          )
        )
      );
    }
  }]);

  return MyNyplButton;
})(_react2['default'].Component);

MyNyplButton.propTypes = {
  lang: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: '#'
};

exports['default'] = (0, _radium2['default'])(MyNyplButton);
module.exports = exports['default'];