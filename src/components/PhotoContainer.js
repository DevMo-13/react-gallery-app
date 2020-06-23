import React, {Component} from 'react';
import Photo from './Photo';
import Loading from './Loading'
import NoResults from './NoResults';

class PhotoContainer extends Component {  
    render() {
        const data = this.props.data;
        const topic = this.props.topic;
        const loading = this.props.loading;
        let photos;
    
        if(loading) {
            photos = <Loading />
        } else if (data.length > 0) {
            photos = data.map(photo => <Photo key={photo.id} farmId={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret} title={photo.title} />)
        } else {
            photos = <NoResults />
        };

        return(
            <div className="photo-container">
                <h2>{topic}</h2> 
                <ul>
                    {photos}
                </ul>
            </div>
        );
    };
};

export default PhotoContainer;
