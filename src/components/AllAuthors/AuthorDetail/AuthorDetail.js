import React from "react";
import "./AuthorDetail.css";

export default function AuthorDetail(props) {
    const author = props.authors.find(author => {
        return author.id == props.match.params.id;
    });
console.log(props.authors);


    const titles = author.Titles.map(title => <li key={title.Id}>{title.title}
    <button onClick={(event)=>props.deleteTitle(author.id,title.id)}>Delete</button> </li>);
   

    return (
        <div className="AuthorDetail">
            <h2>{author.name}</h2>

            <h3>Titles</h3>
            <ul>{titles}</ul>

            <form onSubmit={props.addTitle}>
                <input type='hidden' name='authorId' value={author.id} />
                <input type='text' name='title' />
                <input type='submit' value='Add Title' />
            </form>
            


        </div>
    );
}