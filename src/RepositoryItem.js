import React, { Component } from 'react'

export default class RepositoryItem extends Component {
    render() {
        return (
            <>
                
                <a href={this.props.url} rel="noreferrer" target="_blank">  {this.props.name} </a>
                <p className="container-main-list-text">
                {this.props.description}
                </p>
            </>
        )
    }
}
