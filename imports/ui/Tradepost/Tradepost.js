import React from 'react';

import Logout from '../Logout';
import AddShift from '../Tradepost/AddShift';
import ShiftList from '../Tradepost/ShiftList';

export default () => {
  return (
    <div>
      <Logout title="WR Buddy"/>
      <div className="page-content">
        <AddShift/>
        <ShiftList/>
      </div>
    </div>
  );
};
