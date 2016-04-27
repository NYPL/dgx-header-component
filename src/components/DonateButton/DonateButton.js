import React from 'react';
import Radium from 'radium';
import utils from '../../utils/utils.js';

const styles = {
  base: {
    backgroundColor: '#E43534',
    color: 'white',
    padding: '1em',
    margin: '0',
  },
};

class DonateButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        lang={this.props.lang}
        onClick={utils._trackHeader.bind(this, 'Donate', this.props.gaLabel)}
        style={[styles.base, this.props.style]}
      >
        {this.props.label}
      </a>
    );
  }
}

DonateButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  target: React.PropTypes.string,
  label: React.PropTypes.string,
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  gaLabel: React.PropTypes.string,
};

DonateButton.defaultProps = {
  label: 'Donate',
  lang: 'en',
  id: 'DonateButton',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN',
};

export default Radium(DonateButton);
