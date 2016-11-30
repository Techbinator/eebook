import './Layout.scss'
import ExtraMenu from '../layout/ExtraMenu'

import React, { Component } from 'react'
import { connect } from 'react-redux'

function AppLayout({ children, menu=null, map=null }) {
  let cls = ["mp-pusher"];
  menu && cls.push("mp-pushed");

  return (
    <div className="container-fluid">
      <div className={cls.join(" ")}>

        <div className="row-fluid scroller">
          <div className="hidden-xs col-sm-7 col-md-8 col-lg-9">
            <section className="map">{map}</section>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
            {children}
          </div>
        </div>

        <aside className="mp-menu">
          <ExtraMenu menu={menu}/>
        </aside>

      </div>
    </div>
  );
}

function getProperties(state) {
  return {
    menu: state.Layout.menu || null,
    map:  state.Layout.map  || null
  }
}

export default connect(getProperties)(AppLayout);
