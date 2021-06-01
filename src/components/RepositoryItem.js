import React from 'react'

export default function RepositoryItem(props) {
        return (
            <>
                <a href={props.url} rel="noreferrer" target="_blank">  {props.name} </a>
                <p className="container-main-list-description">
                    {props.description}
                </p>
            </>
        )
}
