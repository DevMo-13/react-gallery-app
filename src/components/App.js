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
            searchTopic: '',
            searchPhotos: [],
            defaultTopics: ['mountains', 'animals', 'oceans'],
            mountains: [],
            animals: [],
            oceans: [],
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
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
        });
    };

    performSearch = (topic = 'mountains') => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${topic}&content_type=1&is_getty=true&per_page=24&page=1&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({
                searchTopic: topic,
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
                <SearchForm onSearch={this.performSearch} loading={this.state.loading} />
                <Nav />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/mountains" />} />   
                    <Route path="/search/:topic" render={() => <PhotoContainer data={this.state.searchPhotos} topic={this.state.searchTopic} loading={this.state.loading} />} />
                    <Route path="/mountains" render={() => <PhotoContainer data={this.state.mountains} topic="mountains" loading={this.state.loading} />} />
                    <Route path="/animals" render={() => <PhotoContainer data={this.state.animals} topic="animals" />} />
                    <Route path="/oceans" render={() => <PhotoContainer data={this.state.oceans} topic="oceans" />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    };
}

export default App;
