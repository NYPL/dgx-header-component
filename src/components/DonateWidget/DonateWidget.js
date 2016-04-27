import React from 'react';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';
import DonateBox from './DonateBox.js';

class DonateWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const featuredItem = this.props.featuredItem;

    return (
      <div className={this.props.className}>
        <DonateBox
          className={`${this.props.className}-DonateBox`}
          tag={'Donate'}
          title={'Donate to the Library'}
          donationLinks={this.props.donationLinks}
          desc={'We rely on your generosity to provide books, literacy classes, children\'s ' +
            'story hours, and much more FREE for all New Yorkers.'}
        />
        <MegaMenuFeatureItem
          feature={featuredItem}
          navLabel={this.props.navLabel}
        />
      </div>
    );
  }
}

DonateWidget.propTypes = {
  className: React.PropTypes.string,
  featuredItem: React.PropTypes.object,
  donationLinks: React.PropTypes.array,
  navLabel: React.PropTypes.string,
};

DonateWidget.defaultProps = {
  lang: 'en',
  className: 'DonateWidget',
};

export default DonateWidget;
