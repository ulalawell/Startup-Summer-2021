import React from 'react'
import RepositoryItem from './RepositoryItem';

export default function RepositoryList(props) {
    var repositoryElements = [];
    var title="";
    if (props.name !== undefined) {
        title = `Repositories(${props.name.length})`;
        for (let i = 0; i < props.name.length; i++) {
            repositoryElements.push(
                <li key={props.name[i]}>
                    <RepositoryItem name={props.name[i]}
                        url={props.url[i]}
                        description={props.description[i]}>
                    </RepositoryItem>
                </li>
            );
        
        }
    }
    return (
        <div>
        <p className="title">{title}</p>
        <ul>
            {repositoryElements}
        </ul>
        </div>
    )
}
