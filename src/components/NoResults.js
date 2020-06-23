import React from 'react';

// NoResults component renders a message when the API retrieves no results matching the searched topic.
const NoResults = () => (
    <li className="not-found">
        <h3>No Results Found</h3>
        <p>Your search did not return any results - please try again.</p>
    </li>
);

export default NoResults;