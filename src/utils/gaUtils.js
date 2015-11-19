import ga from 'react-ga';

function gaUtils() {
  /**
   * _trackEvent(gaLabel)
   * Track a GA click event.
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackEvent = function _trackEvent(action, label) {
    ga.event({
      category: 'Global Header',
      action: action,
      label: label
    });
  };
}

export default new gaUtils();
