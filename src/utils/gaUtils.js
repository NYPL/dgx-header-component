import ga from 'react-ga';

function gaUtils() {
  /**
   * _trackGeneralEvent(category)
   * Track a GA event.
   *
   * @param {category} String Category for GA event.
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackGeneralEvent = (category, action, label) => {
    return ga.event({
      category: category,
      action: action,
      label: label
    });
  };


  /**
   * _trackEvent(category)
   * Track a GA click event, wrapped in a curried function.
   *
   * @param {category} String Category for GA event.
   * @returns {function} Returns a function with the category set.
   *  Then you pass in the action and the label.
   */
  this._trackEvent = category => {
    return (action, label) => {
      return ga.event({
        category: category,
        action: action,
        label: label
      });
    };
  };
}

export default new gaUtils();
