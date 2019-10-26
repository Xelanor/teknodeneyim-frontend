import React, { Component } from 'react';

import './Tooltip.css'

class Tooltip extends React.Component {
  state = {
    displayTooltip: false
  }

  hideTooltip = () => {
    this.setState({ displayTooltip: false })

  }
  showTooltip = () => {
    this.setState({ displayTooltip: true })
  }

  render() {
    let { message, position } = this.props
    return (
      <span className='tooltip'
        onMouseLeave={this.hideTooltip}
      >
        {this.state.displayTooltip &&
          <div className={`tooltip-bubble tooltip-${position}`}>
            <div className='w-auto h-auto bg-white border border-tekno z-40'>
              <div className="flex">
                <div>
                  <img className="h-36 w-36" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=441&amp;hei=529&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1567022175704"></img>
                </div>
                <div className="font-semibold text-2xl text-tekno">
                  iPhone 11 Pro 256GB
                </div>
              </div>
            </div>
          </div>
        }
        <span
          className='tooltip-trigger'
          onMouseOver={this.showTooltip}
        >
          {this.props.children}
        </span>
      </span>
    )
  }
}

export default Tooltip;