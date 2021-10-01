
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link,Redirect } from 'react-router-dom';

import AllAuthors from './components/AllAuthors/AllAuthors';
import AuthorDetail from './components/AllAuthors/AuthorDetail/AuthorDetail';


class App extends Component {
  constructor() {
    super();

    this.apiurl = 'http://localhost:3000/api/authors';

    this.state = {
      authors: [],
    };
  }
  async componentDidMount() {
    const response = await axios.get(this.apiurl);
    this.setState({ authors: response.data.authors })
    console.log(response.data);
  }
  
  addAuthor = async (event) => {
    event.preventDefault();
    const response = await axios.post(this.apiurl, {
      name: event.target.name.value
    });
    event.target.name.value ='';
    const tempAuthors = this.state.authors;
    tempAuthors.push(response.data.author);
    console.log(response.data);
    this.setState({authors: tempAuthors});
      };

    deleteAuthor = async (delId)=>{
     const listTitleUrl= `${this.apiUrl}/profile/${delId}`;
     const deletAuthorResponse = await axios.get(listTitleUrl)
     if (deletAuthorResponse.data.Titles.length == 0){
       const response = await axios.delete(`${this.apiUrl}/${delId}`)
       const responseRedirect= await axios.get(this.apiUrl);
       this.setState({titles: responseRedirect.data.titles});

     }
      
      }
     
 
  addTitle = async (event) => { 
    event.preventDefault();

    const authorId = event.target.authorId.value;
    const titleUrl = `${this.apiurl}/${authorId}/newtitle`;

    const response = await axios.post(titleUrl,{
      title: event.target.title.value

    });
    const authorRes = response.data.author;
    const tempAuthors = this.state.authors;

    const newAuthors = tempAuthors.map(author => {
      if(author.id == authorRes.id) {
        return authorRes;
      } else {
        return author;
      }
    });

    this.setState({ authors: newAuthors });
    
   };
   deleteTitle = async (authId,titleId) =>{
    const deleteUrl = `${this.apiurl}/${authId}/titles/${titleId}`
     const response = await axios.delete(deleteUrl);
    const responseRedirect = await axios.get(this.apiurl);
    this.setState({titles: responseRedirect.data.titles});
   
    console.log(deleteUrl);
   }
  

  render() {

    return (
      <div className="App">
        <h1>My Reading List</h1>
        <h2>Helping me keep track of what I've read!</h2>
        <nav>
          <Link to='/' >Home</Link>|
          <Link to='/authors'>Authors List</Link>
        </nav>
        <Switch>
          <Route path='/authors'
            exact
            component={() => <AllAuthors
              authors={this.state.authors}
              addAuthor={this.addAuthor} 
              deleteAuthor={this.deleteAuthor}
              />}
          />
          <Route 
          path='/authors/:id' 
          component={(routerProps) => <AuthorDetail
          {...routerProps}
          authors={this.state.authors}
          titles={this.state.titles}
          addTitle={this.addTitle}
          deleteTitle={this.deleteTitle}
           />}
           />
        </Switch>
      </div>
    );
  }
}

export default App;
