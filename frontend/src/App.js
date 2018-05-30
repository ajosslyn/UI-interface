import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messageFromExpress: '',
      databaseStuff: [],
      bookName: '',
      bookData: []

    }
  }

  componentDidMount() {
    this.getStuffFromExpress()
    this.getDatabaseStuff()


  }

  getStuffFromExpress() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/hello',
    }).then(responseFromExpress => {

      this.setState({
        messageFromExpress: responseFromExpress.data
      })
    })
  }

  getDatabaseStuff() {
    axios({
      method: 'get',
      url: 'http://localhost:4000/getData'
    }).then(stuff => {
      this.setState({
        databaseStuff: stuff.data
      })
    })
  }

  formatData() {
    let array = this.state.bookData.length == 0 ? this.state.databaseStuff : this.state.bookData

    return array.map((data, idx) =>
      <tr key={idx}>
        <td>{data.title}</td>
        <td>{data.author}</td>
        <td>{data.genre}</td>
        <td>{data.first_published}</td>
      </tr>

    )
  }
  searchBook(query){
    this.updateText(query)

    axios({
      method: 'post',
      url: 'http://localhost:4000/getSearch',
      data: {
        find: query
      }
    }).then(stuff => {
      this.setState({
        bookData : stuff.data

      })

    })
  
  }

  updateText(query){
    this.setState({
      bookName : query
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Library</h1>
        <div>
        <input className="search" placeholder="Enter book name" type="text" value={this.state.bookName} onChange={event => this.searchBook(event.target.value)}/>
          <table>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>First Published</th>
            </tr>
            {this.formatData()}

          </table>


        </div>
      </div>
    );
  }
}

export default App;
