'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationFinder = function (_React$Component) {
  _inherits(LocationFinder, _React$Component);

  function LocationFinder(props) {
    _classCallCheck(this, LocationFinder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocationFinder).call(this, props));

    _this.state = {
      zipcode: null,
      disableSubmit: true,
      nearestLocation: null
    };

    _this._handleSubmit = _this._handleSubmit.bind(_this);
    _this._handleChange = _this._handleChange.bind(_this);
    return _this;
  }

  /**
   * _handleSubmit()
   * updates the state reference
   * which holds the nearestLocation
   * property
   *
   * @return {Object} location
   */


  _createClass(LocationFinder, [{
    key: '_handleSubmit',
    value: function _handleSubmit() {}

    /**
     * _enableSubmitButton()
     * sets the state's disableSubmit
     * property value to false
     *
     */

  }, {
    key: '_enableSubmitButton',
    value: function _enableSubmitButton() {
      this.setState({ disableSubmit: false });
    }

    /**
     * _getNearestLocations(zipcode)
     * returns the nearest location object
     * from the list of NYPL locations
     * based of an API.
     *
     * @param {Number} zipcode
     * @return {Object} location
     */
    // _getNearestLocations(zipcode) {
    //
    // }

    /**
     * _validateZipcode(zipcode)
     * returns a boolean value based
     * on the validity of the zipcode param.
     *
     * @param {Number} zipcode
     * @return {Boolean} true/false
     */

  }, {
    key: '_validateZipcode',
    value: function _validateZipcode(zipcode) {
      if (zipcode && !isNaN(zipcode) && zipcode.length === 5) {
        return true;
      }
      return false;
    }

    /**
     * _getZipcodeValue()
     * returns the current value
     * from the state zipcode property
     *
     * @return {Number} state.zipcode
     */

  }, {
    key: '_getZipcodeValue',
    value: function _getZipcodeValue() {
      return this.state.zipcode;
    }

    /**
     * _setZipcodeValue(value)
     * sets the state's zipcode
     * property with the param value
     *
     * @param {Number} value
     */

  }, {
    key: '_setZipcodeValue',
    value: function _setZipcodeValue(value) {
      this.setState({ zipcode: value });
    }

    /**
     * _handleChange()
     * handles the changing value
     * of the zipcode input and
     * is responsible for firing off
     * the nearest location suggestions
     *
     */

  }, {
    key: '_handleChange',
    value: function _handleChange() {
      var zipcode = _reactDom2.default.findDOMNode(this.refs.zipCodeInput).value;

      if (this._validateZipcode(zipcode)) {
        // Update the state.zipcode value
        this._setZipcodeValue(zipcode);

        // Enable the submitButton
        this._enableSubmitButton();

        // Execute Autocomplete Search Suggestions
        // console.log('Input is valid, suggestions should be enabled');
      } else {
          // Do not execute Autocomplete
        }
    }
  }, {
    key: 'render',
    value: function render() {
      // Reference the zipcode from the state.
      // const zipcode = this.state.zipcode;
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-Tag' },
            'Find a Library'
          ),
          _react2.default.createElement(
            'label',
            { htmlFor: 'LocationFinder-Input', className: this.props.className + '-IntroText' },
            'Type a zip code where you would like to find a NYPL Location.'
          ),
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-SearchBox' },
            _react2.default.createElement('input', {
              type: 'text',
              placeholder: 'Zip Code',
              id: 'LocationFinder-Input',
              ref: 'zipCodeInput',
              onChange: this._handleChange
            }),
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                id: 'LocationFinder-Submit',
                disabled: this.state.disableSubmit,
                onClick: this._handleSubmit
              },
              'FIND'
            )
          )
        )
      );
    }
  }]);

  return LocationFinder;
}(_react2.default.Component);

LocationFinder.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};

LocationFinder.defaultProps = {
  lang: 'en',
  className: 'LocationFinder'
};

exports.default = LocationFinder;