import './Layout.scss'
import ExtraMenu from '../layout/ExtraMenu'
import LeftSection from '../layout/LeftSection'

import React, { Component } from 'react'
import { connect } from 'react-redux'

function AppLayout({ children, menu=null, leftSection=null }) {
  let cls = ["mp-pusher"];
  menu && cls.push("mp-pushed");

  return (
    <div className="container-fluid">
      <div className={cls.join(" ")}>

        <div className="row-fluid scroller">
          <div className="hidden-xs col-sm-7 col-md-8 col-lg-9">
            <LeftSection component={leftSection}/>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
            {children}
          </div>
        </div>

        <aside className="mp-menu">
          <ExtraMenu component={menu}/>
        </aside>

      </div>
    </div>
  );
}

function getProperties(state) {
  return {
    menu: state.Layout.menu || null,
    leftSection:  state.Layout.leftSection  || null
  }
}

export default connect(getProperties)(AppLayout);
