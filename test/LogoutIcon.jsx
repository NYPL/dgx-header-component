import React from 'react';

const LogoutIcon = ({ viewBox, height, width, title, className, style, fill, ariaHidden }) => (
  <svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={`${className} svgIcon`}
    style={style}
    fill={fill}
    aria-hidden={ariaHidden}
  >
   <title>logout.icon</title>
    <g>
       <path d="M23.084,9.91992a1.49987,1.49987,0,1,0-2.168,2.07324L23.79181,15H11a1.5,1.5,0,0,0,0,3H23.877L20.8291,21.30273a1.50035,1.50035,0,0,0,2.20508,2.03516l6.3252-6.85645Z" />
       <path d="M15.97949,25H7V7h9.21875a1.5,1.5,0,0,0,0-3H4V28H15.97949a1.5,1.5,0,0,0,0-3Z" />
    </g>
  </svg>
);

LogoutIcon.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  viewBox: React.PropTypes.string,
  fill: React.PropTypes.string,
  style: React.PropTypes.object,
  ariaHidden: React.PropTypes.bool,
};

LogoutIcon.defaultProps = {
  className: 'logoutIcon',
  title: 'NYPL Logout SVG Icon',
  width: '16',
  height: '32',
  viewBox: '0 0 32 32',
};

export default LogoutIcon;
