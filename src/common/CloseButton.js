import React from 'react'
import { noop } from 'lodash'

export default function CloseButton({ onClick }) {
  return (
    <button 
    	type="button" 
      className="close" 
      aria-label="Close"
      onClick={onClick || noop}>
      <span aria-hidden="true">&times;</span>
    </button>);
}