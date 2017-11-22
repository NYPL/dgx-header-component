/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import FundraisingBanner from './../src/components/FundraisingBanner/FundraisingBanner';
import config from './../src/appConfig';

describe('FundraisingBanner Component', () => {
  describe('Component with default required properties and data passed to bannerData prop', () => {
    const dummyData = { url: 'url', imageUrl: 'imageUrl', title: 'title', description: 'desc' };
    let component;

    before(() => {
      component = mount(
        <FundraisingBanner hideBannerCookieName="closeFundraisingBanner" bannerData={dummyData} />
      );
    });

    it('should match the property bannerData to the state bannerData and populate', () => {
      expect(component.state().bannerData).to.equal(dummyData);
    });

    it('should contain a .FundraisingBanner-wrapper div and class', () => {
      expect(component.find('.FundraisingBanner-wrapper').length).to.equal(1);
    });

    it('should contain a the <a> tag using the proper url', () => {
      expect(component.find('a').length).to.equal(1);
      expect(component.find('a').prop('href')).to.equal(dummyData.url);
    });

    it('should contain a the headline title', () => {
      expect(component.find('.FundraisingBanner-headline').length).to.equal(1);
      expect(component.find('.FundraisingBanner-headline').text()).to.equal(dummyData.title);
    });

    it('should contain a the image tag with proper src', () => {
      expect(component.find('.FundraisingBanner-imageWrapper').length).to.equal(1);
      expect(component.find('.FundraisingBanner-imageWrapper img').length).to.equal(1);
      expect(component.find('.FundraisingBanner-imageWrapper img').prop('src')).to.equal(dummyData.imageUrl);
    });

    it('should set the background-image url property to match the config file sources', () => {
      const fundraisingConfig = config.fundraising;
      const styles = component.find('.FundraisingBanner').prop('style');
      expect(styles).to.have.property(
        'backgroundImage',
        'url(//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_wht_bg.png), url(//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_wht_bg.png), url(//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_teal_bg.png)'
      );
    });

    it('should contain close button', () => {
      expect(component.find('.FundraisingBanner-closeButton').length).to.equal(1);
      expect(component.find('.FundraisingBanner-closeButton').text()).to.equal('Close');
    });

    it('should contain the close button with the proper aria-label', () => {
      expect(
        component.find('.FundraisingBanner-closeButton').prop('aria-label')
      ).to.equal('Close Fundraising banner');
    });

    it('should set the isBannerVisible boolean flag to true when the close button is clicked', () => {
      component.find('.FundraisingBanner-closeButton').simulate('click');
      expect(component.state().isBannerVisible).to.equal(false);
      expect(component.find('.FundraisingBanner').hasClass('show')).to.equal(false);
    });
  });

  describe('Component with default required properties and no data passed to bannerData prop', () => {
    let component;

    before(() => {
      component = mount(<FundraisingBanner hideBannerCookieName="closeFundraisingBanner" />);
    });

    it('should render a <div> wrapper', () => {
      expect(component.find('.FundraisingBanner').length).to.equal(1);
    });

    it('should have the bannerData state property set to an empty object if no props are defined', () => {
      expect(component.state().bannerData).to.be.an('object').that.is.empty;
    });

    it('should set the hideBannerCookieName props to the established string (closeFundraisingBanner)', () => {
      expect(component.props().hideBannerCookieName).to.equal('closeFundraisingBanner');
    });

    it('should immediately call componentDidMount, verify the existence of the cookie and call fetchFundraisingData if the bannerData is empty', () => {
      sinon.spy(FundraisingBanner.prototype, 'componentDidMount');
      sinon.spy(FundraisingBanner.prototype, 'fetchFundraisingData');
      const wrapper = mount(<FundraisingBanner hideBannerCookieName="closeFundraisingBanner" />);

      expect(FundraisingBanner.prototype.componentDidMount.calledOnce).to.equal(true);
      expect(FundraisingBanner.prototype.fetchFundraisingData.calledOnce).to.equal(true);
    });
  });
});
