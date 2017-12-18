/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

// Import the component that is going to be tested
import MyNypl from './../src/components/MyNypl/MyNypl.js';
// Import related functions
import utils from './../src/utils/utils.js';
// Import the configs of the log in links
import configs from './../src/appConfig.js';

const {
  loginMyNyplLinks: {
    catalog,
    research,
    logOutLink,
  },
} = configs;

describe('MyNypl', () => {
  describe('<MyNypl> as default', () => {
    let onClick;
    let component;

    before(() => {
      component = mount(<MyNypl />);
    });

    beforeEach(() => {
      onClick = sinon.spy(utils, 'trackHeader');
    });

    afterEach(() => {
      onClick.restore();
    });

    it('should have a <div> with class name "myNypl" as a wrapper', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('.myNypl').type()).to.equal('div');
    });

    it('should have a <ul> with class name "myNypl-login-list" as a wrapper for log in links',
      () => {
        expect(component.find('ul')).to.have.length(1);
        expect(component.find('.myNypl-login-list').type()).to.equal('ul');
      }
    );

    it('should have two <li> links', () => {
      expect(component.find('li')).to.have.length(2);
    });

    it('should have two <a>. Their class names are "myNypl-catalog-btn" and "myNypl-research-btn"',
      () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.myNypl-catalog-btn').type()).to.equal('a');
        expect(component.find('.myNypl-research-btn').type()).to.equal('a');
      }
    );

    it('should call GA event tracker when "MyNypl-Catalog-Btn" is clicked', () => {
      component.find('.myNypl-catalog-btn').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Log In', 'Catalog')).to.equal(true);
    });

    it('should call GA event tracker when "MyNypl-Research-Btn" is clicked', () => {
      component.find('.myNypl-research-btn').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Log In', 'Research')).to.equal(true);
    });

    it('should have props with default values of isLoggedIn, isOauthLoginActivated, patronName, ' +
      'and logOutLink', () => {
      expect(component.props().isLoggedIn).to.equal(false);
      expect(component.props().patronName).to.equal('');
      expect(component.props().logOutLink).to.equal(logOutLink);
    });

    // Tests ignore `aria-hidden` attribute
    it('should have an <a> with class name "MyNypl-Catalog-Btn". Its text equals ' +
      '"Log in to your accountLOG INTO THE CATALOG"', () => {
      expect(component.find('.myNypl-catalog-btn').text())
        .to.equal('Log in to your accountLOG INTO THE CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals' +
      '"https://beta-oauth.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
      () => {
        expect(component.find('.myNypl-catalog-btn').props().href).to.equal(
          catalog
        );
      }
    );

    it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals ' +
      '"NYPL Building IconLOG INTO THE RESEARCH CATALOG"', () => {
      expect(component.find('.myNypl-research-btn').text()).to.equal(
        'NYPL Building IconLOG INTO THE RESEARCH CATALOG'
      );
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals' +
      '"https://beta-oauth.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top"',
      () => {
        expect(component.find('.myNypl-research-btn').props().href).to.equal(
          research
        );
      }
    );
  });

  describe('<MyNypl> with the prop isLoggedIn that is set to be true', () => {
    let onClick;
    let component;

    before(() => {
      component = mount(<MyNypl isLoggedIn />);
    });

    beforeEach(() => {
      onClick = sinon.spy(utils, 'trackHeader');
    });

    afterEach(() => {
      onClick.restore();
    });

    it('should have props isLoggedIn equals true, and logOutLink equals' +
      '"https://beta-oauth.nypl.org/auth/logout"',
        () => {
          expect(component.props().isLoggedIn).to.equal(true);
          expect(component.props().logOutLink).to.equal(
            logOutLink
          );
        }
      );

    it('should have three <a>. Their class names are "MyNypl-Catalog-Btn",' +
      '"MyNypl-Research-Btn", and "MyNypl-Catalog-Link"', () => {
      expect(component.find('a')).to.have.length(3);
      expect(component.find('.myNypl-catalog-link').type()).to.equal('a');
      expect(component.find('.myNypl-catalog-btn').type()).to.equal('a');
      expect(component.find('.myNypl-research-btn').type()).to.equal('a');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its text equals ' +
      '"Log in to your accountGO TO THE CATALOG"', () => {
      expect(component.find('.myNypl-catalog-btn').text())
        .to.equal('Log in to your accountGO TO THE CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals ' +
      '"NYPL Building IconGO TO THE RESEARCH CATALOG"', () => {
      expect(component.find('.myNypl-research-btn').text())
        .to.equal('NYPL Building IconGO TO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.myNypl-catalog-btn').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals ' +
      '"https://catalog.nypl.org/patroninfo/top"', () => {
      expect(component.find('.myNypl-research-btn').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });

    it('should call GA event tracker when "MyNypl-Catalog-Btn" is clicked', () => {
      component.find('.myNypl-catalog-btn').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Go To', 'Catalog')).to.equal(true);
    });

    it('should call GA event tracker when "MyNypl-Research-Btn" is clicked', () => {
      component.find('.myNypl-research-btn').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Go To', 'Research')).to.equal(true);
    });

    it('should have the method "renderLogOutLink" to render the proper log out link',
      () => {
        // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in the
        // render() life cycle and renders HTML elements for log out link.
        const renderedInstance = component.instance().renderLogOutLink();

        expect(renderedInstance.type).to.equal('a');
        expect(renderedInstance.props.href).to.equal(
          logOutLink
        );
        expect(renderedInstance.props.className).to.equal('MyNypl-Catalog-Link');
        expect(renderedInstance.props.children[1]).to.equal('LOG OUT');

        component.find('.myNypl-catalog-link').simulate('click');
        expect(onClick.calledOnce).to.equal(true);
        expect(onClick.calledWith('My Account', 'Log Out')).to.equal(true);
      }
    );
  });

  describe('<MyNypl> with the prop isLoggedIn that is set to be true and the value of logOutLink ' +
    'is passed',
    () => {
      let component;

      before(() => {
        component = mount(
          <MyNypl
            isLoggedIn
            logOutLink={`${logOutLink}?redirect_uri=https://www.nypl.org`}
          />
        );
      });

      it('should have props isLoggedIn equals true, and logOutLink equals' +
        '"https://beta-oauth.nypl.org/auth/logout?redirect_uri=https://www.nypl.org"',
        () => {
          expect(component.props().isLoggedIn).to.equal(true);
          expect(component.props().logOutLink).to.equal(
            `${logOutLink}?redirect_uri=https://www.nypl.org`
          );
        }
      );

      it('should have three <a>. Their class names are "myNypl-catalog-btn",' +
        '"myNypl-research-btn", and "myNypl-catalog-bink"', () => {
        expect(component.find('a')).to.have.length(3);
        expect(component.find('.myNypl-catalog-link').type()).to.equal('a');
        expect(component.find('.myNypl-catalog-btn').type()).to.equal('a');
        expect(component.find('.myNypl-research-btn').type()).to.equal('a');
      });

      it('should have the <a> with class name "myNypl-catalog-btn". Its text equals ' +
        '"Log in to your accountGO TO THE CATALOG"', () => {
        expect(component.find('.myNypl-catalog-btn').text())
          .to.equal('Log in to your accountGO TO THE CATALOG');
      });

      it('should have the <a> with class name "myNypl-research-btn". Its text equals ' +
        '"NYPL Building IconGO TO THE RESEARCH CATALOG"', () => {
        expect(component.find('.myNypl-research-btn').text())
          .to.equal('NYPL Building IconGO TO THE RESEARCH CATALOG');
      });

      it('should have the <a> with class name "myNypl-catalog-btn". Its href equals ' +
        '"https://browse.nypl.org/iii/encore/myaccount"', () => {
        expect(component.find('.myNypl-catalog-btn').props().href).to.equal(
          'https://browse.nypl.org/iii/encore/myaccount'
        );
      });

      it('should have the <a> with class name "myNypl-research-btn". Its href equals ' +
        '"https://catalog.nypl.org/patroninfo/top"', () => {
        expect(component.find('.myNypl-research-btn').props().href).to.equal(
          'https://catalog.nypl.org/patroninfo/top'
        );
      });

      it('should have the method "renderLogOutLink" to render the proper log out link',
        () => {
          // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in the
          // render() life cycle and renders HTML elements for log out link.
          const renderedInstance = component.instance().renderLogOutLink();

          expect(renderedInstance.type).to.equal('a');
          expect(renderedInstance.props.href).to.equal(
            `${logOutLink}?redirect_uri=https://www.nypl.org`
          );
          expect(renderedInstance.props.className).to.equal('myNypl-catalog-link');
          expect(renderedInstance.props.children[1]).to.equal('LOG OUT');

          const onClick = sinon.spy(utils, 'trackHeader');

          component.find('.myNypl-catalog-link').simulate('click');
          expect(onClick.calledOnce).to.equal(true);
          expect(onClick.calledWith('My Account', 'Log Out')).to.equal(true);

          onClick.restore();
        }
      );
    }
  );

  describe('<MyNypl> with the props patronName that has valid value but isLoggedIn is false',
    () => {
      let component;

      before(() => {
        component = mount(<MyNypl patronName={'Stewart, Darren'} />);
      });

      it('should have props patronName equals "Stewart, Darren"',
        () => {
          expect(component.props().patronName).to.equal('Stewart, Darren');
        }
      );

      it('should not render the <p> for patron greeting',
        () => {
          expect(component.find('p')).to.have.length(0);
        }
      );
    }
  );

  describe('<MyNypl> with the props patronName that has valid value and isLoggedIn is true', () => {
    let component;

    before(() => {
      component = mount(<MyNypl isLoggedIn patronName={'Stewart, Darren'} />);
    });

    it('should have props patronName equals "Stewart, Darren"',
      () => {
        expect(component.props().patronName).to.equal('Stewart, Darren');
      }
    );

    it('should have two <p>. One is with the class name ' +
      '"myNypl-patron-greeting.login-indication". And its text equals "You are logged in as:". ' +
      'The other is with the class name "myNypl-patron-greeting.Login-Name". ' +
      'And its text equals "Stewart, Darren"',
      () => {
        expect(component.find('p')).to.have.length(2);
        expect(component.find('.myNypl-patron-greeting.login-indication').type()).to.equal('p');
        expect(component.find('.myNypl-patron-greeting.login-indication').text()).to.equal(
          'You are logged in as:'
        );
        expect(component.find('.myNypl-patron-greeting.Login-Name').type()).to.equal('p');
        expect(component.find('.myNypl-patron-greeting.Login-Name').text()).to.equal(
          'Stewart, Darren'
        );
      }
    );
  });
});
