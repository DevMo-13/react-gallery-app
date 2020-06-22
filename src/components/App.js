import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import apiKey from '../config';

// App components
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

const key = apiKey;

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchTopic: null,
            searchPhotos: [],
            defaultTopics: ['animals', 'oceans', 'mountains'],
            animals: [],
            oceans: [],
            mountains: [],
            loading: true
        };
    };

    componentDidMount() {
        this.defaultSearches();
        this.performSearch();
    };

    defaultSearches = () => {
        const topics = this.state.defaultTopics;

        topics.forEach(topic => {
            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${topic}&content_type=1&is_getty=true&per_page=24&page=1&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    [topic]: response.data.photos.photo,
                    loading: false
                });
                console.log(this.state);
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
        });
    };

    performSearch = (query = 'sunsets') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&content_type=1&is_getty=true&per_page=24&page=1&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({
                searchTopic: query,
                searchPhotos: response.data.photos.photo,
                loading: false
            });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    };

    render() {
        return (
            <BrowserRouter>
            <div className="container">
                <SearchForm onSearch={this.performSearch} />
                <Nav />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/search" />} />   
                    <Route exact path="/search" render={() => <PhotoContainer onSearch={this.performSearch} data={this.state.searchPhotos} topic={this.state.searchTopic} />} />
                    <Route path="/search/animals" render={() => <PhotoContainer data={this.state.animals} topic="animals" />} />
                    <Route path="/search/oceans" render={() => <PhotoContainer data={this.state.oceans} topic="oceans" />} />
                    <Route path="/search/mountains" render={() => <PhotoContainer data={this.state.mountains} topic="mountains" />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    };
}

export default App;
