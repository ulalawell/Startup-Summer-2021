import React from 'react'
import RepositoryItem from './RepositoryItem';

export default function RepositoryList(props) {
    var repositoryElements = [];
    var title = "";
    if (props.name !== undefined) {
        title = `Repositories(${props.number})`;

        for (let i = 0; i < props.name.length; i++) {
            repositoryElements.push(
                <div className="container-main-list-item">
                    <RepositoryItem name={props.name[i]}
                        url={props.url[i]}
                        description={props.description[i]}>
                    </RepositoryItem>
                </div>
            );

        }
    }
    return (
        <>
            <h1 className="container-main-title">{title}</h1>
            <div className="container-main-list "> {repositoryElements}
            </div>
        </>
    )
}
