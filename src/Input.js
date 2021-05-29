import './Styles.css';
import React, { Component } from 'react'

export default class Input extends Component {

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            var inputVal = document.getElementById("myInput").value;
            this.props.getRepositoriesInfo(inputVal);
            this.props.getUserInfo(inputVal);
        }
      }

      render() {
        return (
          <div className="input">
          <input type="text" id="myInput" onKeyDown={this._handleKeyDown} />
          </div>
        )
    }

}
