import React, { Component } from 'react'

import './Styles.css';
import Input from './Input';
import User from './User';
import RepositoryList from './RepositoryList';

export default class App extends Component {

  state = {
    nameUser: undefined,
    photoUrl: undefined,
    loginUser: undefined,
    urlUser: undefined,
    followers: undefined,
    following: undefined,

    nameRepository: undefined,
    urlRepository: undefined,
    descriptionRepository: undefined
  }

  gettingInfo = async (username) => {
    const repositoriesUrl = await fetch(`https://api.github.com/users/${username}/repos`);
    const userUrl = await fetch(`https://api.github.com/users/${username}`);
    const repositoriesData = await repositoriesUrl.json();
    const userData = await userUrl.json();
    const size = repositoriesData.length;

    var nameArray = [];
    var urlArray = [];
    var descriptionArray = [];

    for (let i = 0; i < size; i++) {
      nameArray.push(repositoriesData[i].name);
      urlArray.push(repositoriesData[i].html_url);
      descriptionArray.push(repositoriesData[i].description);
    }

    this.setState({
      nameUser: userData.name,
      photoUrl: userData.avatar_url,
      loginUser: userData.login,
      urlUser: userData.html_url,
      followers: userData.followers,
      following: userData.following,

      nameRepository: nameArray,
      urlRepository: urlArray,
      descriptionRepository: descriptionArray
    });
  }

  render() {
    return (
      <div>
        <Input infoMethod={this.gettingInfo}></Input>
        <User 
          name={this.state.nameUser}
          photoUrl={this.state.photoUrl}
          userUrl= {this.state.urlUser}
          login={this.state.loginUser}
          followers={this.state.followers}
          following={this.state.following}
        ></User>
        <RepositoryList
          name={this.state.nameRepository}
          url={this.state.urlRepository}
          description={this.state.descriptionRepository}
        ></RepositoryList>
      </div>
    )
  }
}