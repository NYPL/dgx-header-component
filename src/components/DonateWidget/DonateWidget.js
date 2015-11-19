import React from 'react';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';
import DonateBox from './DonateBox.js';

class DonateWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    // This is pending removal once we establish the Data from API.
    let mockedFeaturedLocation = {
      headline: {
        en: {
          text: 'George Bruce Library Celebrates 100 Years'
        }
      },
      category: {
        en: {
          text: 'Mocked Location Spotlight'
        }
      },
      images: [
        {
          uri: 'http://fpoimg.com/88x88'
        }
      ],
      description: {
        en: {
          text: 'The original George Bruce Library was located on 42nd Street.'
        }
      },
      link: {
        en: {
          text: 'nypl.org'
        }
      }
    };

    let featuredItem = this.props.featuredItem || mockedFeaturedLocation;

    return (
      <div className={this.props.className}>
        <DonateBox 
          className={this.props.className + '-DonateBox'}
          tag={'Donate'}
          title={'Donate to the Library'}
          donationLinks={this.props.donationLinks}
          desc={'We rely on your generosity to provide books, literacy classes, children\'s story hours, and much more FREE for all New Yorkers.'} />
        <MegaMenuFeatureItem
          feature={featuredItem} navLabel={this.props.navLabel} />
      </div>
    );
  }
}

DonateWidget.defaultProps = {
  lang: 'en',
  className: 'DonateWidget'
};

export default DonateWidget;
