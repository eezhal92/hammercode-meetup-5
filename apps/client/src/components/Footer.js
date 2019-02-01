import React from 'react';

const { version } = require('../../package.json');
const mode = process.env.NODE_ENV;

function Footer () {
  return (
    <div>
      <p>Version {version}. Env: {mode}</p>
    </div>
  );
}

export default Footer;
