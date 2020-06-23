/******************************************
Treehouse Techdegree:
FSJS project 7 - React Gallery App
--aiming for exceeds expectations--
******************************************/

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        };
    };

    // Changes the loading state to false once the search is complete.
    stopLoading = () => {
        this.setState({
            loading: false
        });
    };

    // Changes the loading state back to true when a new search is submitted.
    resetLoadState = () => {
        this.setState({
            loading: true
        });
    };

    render() {
        return (
            <BrowserRouter>
            <div className="container">
                <SearchForm resetLoadState={this.resetLoadState} />
                <Nav />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/search/mountains" />} />   
                    <Route path="/search/:topic" render={() => <PhotoContainer loading={this.state.loading} stopLoading={this.stopLoading} />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    };
}

export default App;
