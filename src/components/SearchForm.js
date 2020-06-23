import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// SearchForm component renders the search input field and button,
// and handles the functionality when a new search topic is submitted.
class SearchForm extends Component {
    // Resets the load state to true, updates history, and pushes new url based on search topic.  
    handleSubmit = (e) => {
        e.preventDefault();

        let searchTopic = this.topic.value;
        const path = `/search/${searchTopic}`;

        this.props.resetLoadState();
        this.props.history.push(path);
        e.currentTarget.reset();
    };

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search" 
                    name="search"
                    placeholder="Search..." 
                    ref={(input) => this.topic = input}
                    required/>
                <button type="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
            </form>
        );
    };
}

export default withRouter(SearchForm);