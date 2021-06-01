import React, {Component} from 'react'
import {Octokit} from "@octokit/core";
import ReactPaginate from 'react-paginate';
import '../index.css';
import '../stylesheets/container.css';
import '../stylesheets/input.css';
import '../stylesheets/user.css';
import '../stylesheets/repository.css';
import '../stylesheets/pagination.css';
import Input from './Input';
import User from './User';
import RepositoryList from './RepositoryList';
import UserNotFound from './UserNotFound';
import PageIsInitial from './PageIsInitial';

export default class App extends Component {

    static octokit() {
        return new Octokit({
            baseUrl: 'https://api.github.com'
        });
    }

    state = {
        currentPage: 1,
        amountPage: 0,

        nameUser: "",
        loginUser: "",
        urlUser: "",
        urlPhoto: "",
        amountRepositories: 0,
        followers: 0,
        following: 0,

        dataRepositories: [],

        isError: false,
        isLoaderRepositories: false,
        isLoaderUser: false,
        isInitial: true,
    }

    getUserInfo = (username) => {
        const response = async () => {
            this.setState({
                isLoaderUser: true,
            })
            return await App.octokit().request(`GET /users/${username}`)
        }

        response().then(
            (result) => {
                this.setState({
                    amountRepositories: result.data.public_repos,
                    amountPage: Math.ceil(result.data.public_repos / 4),
                    nameUser: result.data.name,
                    urlPhoto: result.data.avatar_url,
                    loginUser: result.data.login,
                    urlUser: result.data.html_url,
                    followers: result.data.followers,
                    following: result.data.following,
                    isError: false,
                    isLoaderUser: false,
                })
            },
            (error) => {
                this.setState({
                    isError: true,
                    isLoaderUser: false,
                })
            });
    }

    getRepositoriesInfo = (username, page) => {
        const response = async () => {
            this.setState({
                isLoaderRepositories: true,
            })
            return await App.octokit().request(`GET /users/${username}/repos`, {
                per_page: 4,
                page: page
            })
        }

        response().then(
            (result) => {
                this.setState({
                    dataRepositories: result.data,
                    isLoaderRepositories: false,
                })
            },
            (error) => {
                this.setState({
                    isLoaderRepositories: false,
                })
            });
    }

    setInitialState = (value) => {
        this.setState({
            isInitial: value,
        })
    }

    setPage = () => {
        this.setState({
            currentPage: 1,
        })
    }

    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected + 1
        });
        this.getRepositoriesInfo(this.state.loginUser, data.selected + 1);
    };

    render() {
        return (
            <div className="container">
                <div className="container-input">
                    <div className="container-input-picture">
                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M20.5093 0C9.16808 0 0 9.16808 0 20.5093C0 29.5756 5.87436 37.2496 14.0238 39.966C15.0424 40.1698 15.416 39.5246 15.416 38.9813C15.416 38.5059 15.382 36.8761 15.382 35.1783C9.67742 36.4007 8.48897 32.7334 8.48897 32.7334C7.57216 30.3565 6.21392 29.7453 6.21392 29.7453C4.34635 28.489 6.34975 28.489 6.34975 28.489C8.42105 28.6248 9.50764 30.5942 9.50764 30.5942C11.3413 33.7182 14.2954 32.8353 15.4839 32.292C15.6537 30.9677 16.1969 30.0509 16.7742 29.5416C12.2241 29.0662 7.43633 27.3005 7.43633 19.4227C7.43633 17.1817 8.25127 15.348 9.5416 13.9219C9.33786 13.4126 8.62479 11.3073 9.74533 8.48896C9.74533 8.48896 11.4771 7.94567 15.382 10.5942C17.0119 10.1528 18.7776 9.91511 20.5093 9.91511C22.2411 9.91511 24.0068 10.1528 25.6367 10.5942C29.5416 7.94567 31.2733 8.48896 31.2733 8.48896C32.3939 11.3073 31.6808 13.4126 31.4771 13.9219C32.8014 15.348 33.5823 17.1817 33.5823 19.4227C33.5823 27.3005 28.7946 29.0323 24.2105 29.5416C24.9576 30.1868 25.6027 31.4092 25.6027 33.3446C25.6027 36.0951 25.5688 38.3022 25.5688 38.9813C25.5688 39.5246 25.9423 40.1698 26.961 39.966C35.1104 37.2496 40.9847 29.5756 40.9847 20.5093C41.0187 9.16808 31.8166 0 20.5093 0Z"
                                  fill="white"/>
                        </svg>
                    </div>
                    <div className="container-input-item">
                        <Input getRepositoriesInfo={this.getRepositoriesInfo}
                               getUserInfo={this.getUserInfo}
                               setInitialState={this.setInitialState}
                               setPage={this.setPage}/>
                    </div>
                </div>
                {
                    this.state.isInitial ? (
                        <PageIsInitial/>
                    ) : (
                        this.state.isError ? (
                            <UserNotFound/>
                        ) : (
                            <>
                                <div className="container-main">
                                    <div className="container-main-user">
                                        <User
                                            name={this.state.nameUser}
                                            urlPhoto={this.state.urlPhoto}
                                            urlUser={this.state.urlUser}
                                            login={this.state.loginUser}
                                            followers={this.state.followers}
                                            following={this.state.following}
                                            isLoading={this.state.isLoaderUser}
                                        />
                                    </div>
                                    <div className="container-main-repository">
                                        <RepositoryList
                                            data={this.state.dataRepositories}
                                            amount={this.state.amountRepositories}
                                            isLoading={this.state.isLoaderRepositories}
                                        />
                                    </div>
                                </div>
                                {
                                    this.state.amountRepositories > 4 && !this.state.isLoaderUser && (
                                        <div className="container-main-pagination">
                                            <div className="container-main-pagination-label">
                                                {(this.state.currentPage - 1) * 4 + 1}-{Math.min(this.state.currentPage * 4, this.state.amountRepositories)} of {this.state.amountRepositories} items
                                            </div>
                                            <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                initialPage={0}
                                                pageCount={this.state.amountPage}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"pagination-plink"}
                                                nextLinkClassName={"pagination-nlink"}
                                                disabledClassName={"pagination-disabled"}
                                                activeClassName={"pagination-active"}
                                            />
                                        </div>
                                    )
                                }
                            </>
                        )
                    )
                }
            </div>
        )
    }
}
