import React from "react";
import './AllAuthors.css';
import { Link } from 'react-router-dom';

export default function AllAuthors(props) {
    const authors = props.authors.map((author) => {
        return (
            <li key={author.id}>
                <Link to={`/authors/${author.id}`}>{author.name}</Link>
                {/* <button onClick={() =>props.deleteAuthor(author.id)}>Delete</button> */}
            </li>
        );
    });
console.log(props);
    return (
        <div className='AllAuthors'>
            <h2> All Authors</h2>
            <form onSubmit={props.addAuthor}>
                <input type='text' name='name' />
                <input type='submit' value='Add Author' />
            </form>
            <ul>
                {authors}
            </ul>
        </div>
    );
}
