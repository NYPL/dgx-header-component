import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
import SimpleButton from '../Buttons/SimpleButton.js';

import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';

import axios from 'axios';

import utils from '../../utils/utils.js';

import MyNypl from '../MyNypl/MyNypl.js';


class MyNyplButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myNyplVisible: HeaderStore._getMyNyplVisible(),
      target: this.props.target
    };
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    let showDialog = this.state.myNyplVisible,
      buttonClasses = cx({'active': showDialog}),
      myNyplClasses = cx({
        'active animatedFast fadeIn': showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    return (
      <ClickOutHandler onClickOut={this._handleOnClickOut.bind(this)}>
        <div className='MyNyplButton-Wrapper' ref='MyNypl'
          style={[
            styles.base,
            this.props.style
          ]}>

          <a
            id={'MyNyplButton'}
            className={`MyNyplButton ${buttonClasses}`}
            href={this.props.target}
            onClick={this._handleClick.bind(this)}
            style={[
              styles.SimpleButton,
              this.props.style
            ]}>
            {this.props.label}
            <span className={`${iconClass} icon`} style={styles.MyNyplIcon}></span>
          </a>

          <div className={`MyNypl-Wrapper ${myNyplClasses}`}
            style={[
              styles.MyNyplWrapper
            ]}>
            <MyNypl />
          </div>
        </div>
      </ClickOutHandler>
    );
  }

  /**
   * _handleClick(e) 
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  _handleClick(e) {

    if (this.state.target === '#') {
      e.preventDefault();

      let visibleState = this.state.myNyplVisible ? 'Closed' : 'Open';
      Actions.toggleMyNyplVisible(!this.state.myNyplVisible);
      utils._trackHeader('Log In', `MyNyplButton - ${visibleState}`);
    }
  }

  /**
   * _handleOnClickOut(e) 
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  _handleOnClickOut(e) {
    if (HeaderStore._getMyNyplVisible()) {
      if (HeaderStore._getMobileMyNyplButtonValue() === '') {
        utils._trackHeader('Log In', 'MyNyplButton - Closed');
      }
      Actions.toggleMyNyplVisible(false);
    }
  }

  /**
   * _onChange()
   * Updates the state of the form based off the Header Store.
   */
  _onChange() {
    this.setState({myNyplVisible: HeaderStore._getMyNyplVisible()});
  }
}

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: '#'
};

const styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '9px 10px 11px 20px'
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    minHeight: '190px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px',
    boxSizing: 'content-box'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

export default Radium(MyNyplButton);
