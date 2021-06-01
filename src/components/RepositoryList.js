import React from 'react'
import Loader from './Loader';
import RepositoryItem from './RepositoryItem';
import RepositoryEmpty from './RepositoryEmpty';

export default function RepositoryList(props) {
    if (props.isLoading) {
        return (
            <Loader/>
        )
    }
    if (props.amount === 0) {
        return (
            <RepositoryEmpty/>
        )
    }

    return (
        <>
            <h1 className="container-main-repository-title">
                {`Repositories(${props.amount})`}
            </h1>
            <div className="container-main-repository-list ">
                {
                    props.data.map(item => {
                        return (
                            <div className="container-main-repository-list-item">
                                <RepositoryItem name={item.name}
                                                url={item.html_url}
                                                description={item.description}>
                                </RepositoryItem>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )

}
