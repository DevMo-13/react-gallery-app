import React from 'react';

// Photo component renders the gallery images.
const Photo = ({ farmId, serverId, id, secret, title }) => (
    <li>
        <img src={`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`} alt={`${title}`}/>
    </li>
);

export default Photo;
