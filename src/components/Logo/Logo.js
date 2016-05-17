import React from 'react';
import { LionLogoWithText } from 'dgx-svg-icons';
import utils from '../../utils/utils.js';

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        onClick={() => utils._trackHeader('Click Logo', '')}
        style={this.props.style}
      >
        <LionLogoWithText />
        <span className="visuallyHidden">{this.props.alt}</span>
      </a>
    );
  }
}
Logo.propTypes = {
  target: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  alt: React.PropTypes.string,
  style: React.PropTypes.object,
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library',
};

export default Logo;
