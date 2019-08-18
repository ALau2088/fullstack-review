import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount(){
    this.props.getTop25()
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.post('http://localhost:1128/repos', {
      username: term
    })
      .done((repos) => console.log(repos))
      .fail((err) => console.log(err))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App getTop25 = {
      ()=>{
        $.get('http://localhost:1128/repos')
          .done((repos) => {
            console.log(repos)
          })
          .fail((err) => {
            console.log(err)
          })
      }
    }
  />, document.getElementById('app'));