import React, { Component } from 'react'

export default class RepositoryItem extends Component {
    render() {
        return (
            <div>
                <a href={this.props.url} rel="noreferrer" target="_blank">  {this.props.name} </a>
                <p>{this.props.description}</p>
            </div>
        )
    }
}
