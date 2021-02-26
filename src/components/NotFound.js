import React from 'react';

// NotFound component renders a 404-like error for when the path does not match an existing route.
const NotFound = () => (
    <div className="not-found">
        <h3>Page Not Found</h3>
        <p>Sorry, this page does not exist.</p>
    </div>
);

export default NotFound;