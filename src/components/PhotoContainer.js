import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import apiKey from '../config';
import Photo from './Photo';
import Loading from './Loading'
import NoResults from './NoResults';

// PhotoContainer component fetches the data from the API,
// and renders the gallery components based off of the results.
class PhotoContainer extends Component {  
    constructor() {
        super();
        this.state = {
            topic: '',
            data: [],
        };
    }; 

    // Calls on the performSearch method when the component is mounted.
    componentDidMount() {
        this.performSearch();
    };

    // Calls on performSearch again if a new topic is searched or the route is changed.
    componentDidUpdate(prevProps) {
        if (this.props.match.params.topic !== prevProps.match.params.topic) {
            this.performSearch();
        };
    };

    // Fetches the data from the API and updates state based off of the results.
    performSearch = () => {
        const { match } = this.props;

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${match.params.topic}&content_type=1&is_getty=true&per_page=24&page=1&format=json&nojsoncallback=1`)
        .then(response => {
            this.props.stopLoading();
            this.setState({
                topic: match.params.topic,
                data: response.data.photos.photo,
            });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    };
    
    render() {  
        const { topic, data } = this.state;
        const { loading } = this.props;
        let photos;

        // Renders different components depending on loading state and data from API results.
        if(loading) {
            photos = <Loading />
        } else if (data.length > 0) {
            photos = data.map(photo => <Photo key={photo.id} farmId={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret} title={photo.title} />)
        } else {
            photos = <NoResults />
        };

        return(
            <div className="photo-container">
                {(loading) ? null : <h2>{topic}</h2>} 
                <ul>
                    {photos}
                </ul>
            </div>
        );
    };
};

export default withRouter(PhotoContainer);
