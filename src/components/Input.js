import React, {Component} from 'react'

export default class Input extends Component {
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const usernameInput = document.getElementById("usernameInput").value.trim();

            if (usernameInput) {
                this.props.setInitialState(false);
                this.props.setPage();
                this.props.getRepositoriesInfo(usernameInput, 1);
                this.props.getUserInfo(usernameInput);
            } else {
                this.props.setInitialState(true);
            }
        }
    }

    render() {
        return (
            <div className="container-input-item-inner">
                <input type="text" id="usernameInput" placeholder="Enter a github user" onKeyDown={this._handleKeyDown}/>
            </div>
        )
    }

}
