import './Styles.css';
import React from 'react'

export default function User(props) {
    var url="";
    var name="";
    var login="";

    if (props.photoUrl  !== undefined)
    {
        url=props.photoUrl;
    }
    if (props.name  !== undefined)
    {
        name=props.name;
    }
    if (props.login  !== undefined)
    {
        login=props.login;
    }
    return (
        <div>
            <img src={url}></img>
            <p>{name}</p>
            <a href={props.userUrl} rel="noreferrer" target="_blank" >  {login} </a>
            <div >{props.followers}</div>
            <div >{props.following}</div>
        </div>
    )
}
