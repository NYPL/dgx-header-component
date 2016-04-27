import React from 'react';
import { map as _map } from 'underscore';
import Radium from 'radium';
import utils from '../../utils/utils.js';

const styles = {
  topLink: {
    textDecoration: 'none',
    color: '#FFF',
  },
};

class MegaMenuSubNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = _map(this.props.items, (m, i) => {
      const target = m.link[this.props.lang].text || '#';
      return (
        <li key={i}>
          <a href={target}
            onClick={utils._trackHeader.bind(
              this,
              'Go to...',
              `${this.props.label[this.props.lang].text}--${m.name[this.props.lang].text}`)
            }
          >
            {m.name[this.props.lang].text}
          </a>
        </li>
      );
    });

    return (
      <div className="MegaMenu-SubNav">
        <h2>
          <a
            style={styles.topLink}
            href={this.props.topLink}
            onClick={
              utils._trackHeader.bind(
                this,
                'Go to...',
                `SubNav Title--${this.props.label[this.props.lang].text}`
              )
            }
          >
            {this.props.label[this.props.lang].text}
          </a>
        </h2>
        <ul>{items}</ul>
      </div>
    );
  }
}

MegaMenuSubNav.propTypes = {
  lang: React.PropTypes.string,
  topLink: React.PropTypes.string,
  navId: React.PropTypes.string,
  label: React.PropTypes.object,
  items: React.PropTypes.array,
};

MegaMenuSubNav.defaultProps = {
  lang: 'en',
  topLink: '#',
};

export default Radium(MegaMenuSubNav);
