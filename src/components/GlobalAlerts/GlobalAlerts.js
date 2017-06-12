import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { filter as _filter } from 'underscore';
import axios from 'axios';
import config from '../../appConfig.js';
import AlertsBox from '../AlertsBox/AlertsBox.js';

const styles = {
  backgroundColor: '#fee24a',
  width: '100%',
  margin: 0,
  padding: '15px 0',
  color: '#333333',
};

class GlobalAlerts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false,
    };
  }

  componentDidMount() {
    // Fetch the Global Alerts via Client
    this.fetchGlobalAlerts();
  }

  /**
   * _closeAlertsBox()
   * updates both state properties
   * (animateAlertsBox & hideAlertsBox)
   * with a setTimeout to allow css transition.
   * NOTE: Disabled for now until further notice.
   */
  closeAlertsBox() {
    this.setState({ animateAlertsBox: true });

    setTimeout(() => {
      this.setState({ hideAlertsBox: true });
    }, 400);
  }

  /**
   * _fetchGlobalAlerts()
   * using axios, fetch the alerts data
   * and assign to state globalAlerts property.
   */
  fetchGlobalAlerts() {
    axios
      .get(config.alertsApiUrl)
      .then(result => {
        if (result.data && result.data.data) {
          this.setState({ globalAlerts: result.data.data });
        }
      })
      .catch(response => {
        console.warn(`Error on Axios GET request: ${config.alertsApiUrl}`);
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.warn(response.data);
          console.warn(response.status);
          console.warn(response.headers);
          console.warn(response.config);
        }
      });
  }

  /**
   * _filterCurrentClosingAlerts(data)
   * Returns a filtered array with current
   * closing alerts. If no data is passed,
   * an empty array will be returned.
   *
   * @param {Array} data
   * @return {Array} Alerts
   */
  filterCurrentClosingAlerts(data) {
    if (!data) {
      return [];
    }

    const today = moment();
    let sDate;
    let eDate;

    return _filter(data, (elem) => {
      if (elem.attributes) {
        if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
          sDate = moment(elem.attributes['display-date-start']);
          eDate = moment(elem.attributes['display-date-end']);

          if (sDate.valueOf() <= today.valueOf() && eDate.valueOf() >= today.valueOf()) {
            return elem;
          }
        }
      }
    });
  }

  render() {
    const currentGlobalAlerts = this.filterCurrentClosingAlerts(this.state.globalAlerts);
    const classes = cx({
      'animatedFast fadeOutUp': this.state.animateAlertsBox,
      hide: this.state.hideAlertsBox,
    });

    return currentGlobalAlerts && currentGlobalAlerts.length ? (
      <div
        className={`${this.props.className} ${classes}`}
        id={this.props.id}
        style={styles}
      >
        <div className={`${this.props.className}-Wrapper`}>
          <AlertsBox
            alerts={currentGlobalAlerts}
            id={`${this.props.className}-Box`}
            className={`${this.props.className}-Box`}
          />
        </div>
      </div>
    ) : null;
  }
}

GlobalAlerts.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'GlobalAlerts',
  id: 'GlobalAlerts',
};

export default GlobalAlerts;
