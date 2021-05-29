import React, { Component } from 'react'
import { Octokit } from "@octokit/core";
import ReactPaginate from 'react-paginate';
import './index.css';
import './stylesheets/container.css';
import Input from './Input';
import User from './User';
import RepositoryList from './RepositoryList';

export default class App extends Component {

  state = {
    page: 1,
    pageCount: 0,

    publicRepos: 0,
    nameUser: "",
    photoUrl: "",
    loginUser: "",
    urlUser: "",
    followers: "",
    following: "",

    nameRepository: "",
    urlRepository: "",
    descriptionRepository: ""
  }

  getRepositoriesInfo = async (username) => {
    const octokit = new Octokit({
      baseUrl: 'https://api.github.com'
    })
    const responseRep = await octokit.request(`GET /users/${username}/repos`, {
      per_page: 4,
      page: this.state.page
    })
    const repositoriesData = responseRep.data;
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
      nameRepository: nameArray,
      urlRepository: urlArray,
      descriptionRepository: descriptionArray
    });
  }

  getUserInfo = async (username) => {
    const octokit = new Octokit({
      baseUrl: 'https://api.github.com'
    })
    const responseUser = await octokit.request(`GET /users/${username}`)
    const userData = responseUser.data;

    this.setState({
      publicRepos: userData.public_repos,
      pageCount: Math.ceil(userData.public_repos / 4),
      nameUser: userData.name,
      photoUrl: userData.avatar_url,
      loginUser: userData.login,
      urlUser: userData.html_url,
      followers: userData.followers,
      following: userData.following,
    });
  }

  handlePageClick = (data) => {
    let selected = data.selected;

    this.setState({
      page: selected
    });
    this.getRepositoriesInfo(this.state.loginUser)
  };



  render() {
    return (
      <div className="container">
        <div className="container-input">
          <div className="container-input-item">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5093 0C9.16808 0 0 9.16808 0 20.5093C0 29.5756 5.87436 37.2496 14.0238 39.966C15.0424 40.1698 15.416 39.5246 15.416 38.9813C15.416 38.5059 15.382 36.8761 15.382 35.1783C9.67742 36.4007 8.48897 32.7334 8.48897 32.7334C7.57216 30.3565 6.21392 29.7453 6.21392 29.7453C4.34635 28.489 6.34975 28.489 6.34975 28.489C8.42105 28.6248 9.50764 30.5942 9.50764 30.5942C11.3413 33.7182 14.2954 32.8353 15.4839 32.292C15.6537 30.9677 16.1969 30.0509 16.7742 29.5416C12.2241 29.0662 7.43633 27.3005 7.43633 19.4227C7.43633 17.1817 8.25127 15.348 9.5416 13.9219C9.33786 13.4126 8.62479 11.3073 9.74533 8.48896C9.74533 8.48896 11.4771 7.94567 15.382 10.5942C17.0119 10.1528 18.7776 9.91511 20.5093 9.91511C22.2411 9.91511 24.0068 10.1528 25.6367 10.5942C29.5416 7.94567 31.2733 8.48896 31.2733 8.48896C32.3939 11.3073 31.6808 13.4126 31.4771 13.9219C32.8014 15.348 33.5823 17.1817 33.5823 19.4227C33.5823 27.3005 28.7946 29.0323 24.2105 29.5416C24.9576 30.1868 25.6027 31.4092 25.6027 33.3446C25.6027 36.0951 25.5688 38.3022 25.5688 38.9813C25.5688 39.5246 25.9423 40.1698 26.961 39.966C35.1104 37.2496 40.9847 29.5756 40.9847 20.5093C41.0187 9.16808 31.8166 0 20.5093 0Z" fill="white" />
            </svg>
          </div>
          <div className="container-input-item">
            <Input getRepositoriesInfo={this.getRepositoriesInfo}
              getUserInfo={this.getUserInfo}></Input>
          </div>
        </div>

        <div className="container-main">
        <div className="container-main-user">
          <User
            name={this.state.nameUser}
            photoUrl={this.state.photoUrl}
            userUrl={this.state.urlUser}
            login={this.state.loginUser}
            followers={this.state.followers}
            following={this.state.following}
          ></User>
        </div>
        <div  className="container-main-repos">
          <RepositoryList
            number={this.state.publicRepos}
            name={this.state.nameRepository}
            url={this.state.urlRepository}
            description={this.state.descriptionRepository}
          ></RepositoryList>
        </div>

        </div>

        <div className="container-bottom">
          <div className="container-main-paginate">
 
         <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />

          </div>
        </div>
      </div>
    )
  }
}