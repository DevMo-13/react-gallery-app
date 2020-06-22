import React from 'react';
import Photo from './Photo';
import NoResults from './NoResults';

const PhotoContainer = ({data, topic}) => {    

    console.log(data);
    console.log(topic);

    let photos;

    if(data.length > 0) {
        photos = data.map(photo => <Photo farmId={photo.farm} serverId={photo.server} id={photo.id} secret={photo.secret} title={photo.title} key={photo.id} />)
    } else {
        photos = <NoResults />
    };

    return(
        <div className="photo-container">
            {(data.length > 0) ? <h2>{topic}</h2> : null}
            <ul>
                {photos}
            </ul>
        </div>
    );
};

export default PhotoContainer;
