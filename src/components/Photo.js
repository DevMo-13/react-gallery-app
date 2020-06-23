import React from 'react';

const Photo = ({farmId, serverId, id, secret, title}) => (
    <li>
        <img src={`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`} alt={`${title}`}/>
    </li>
);

export default Photo;
