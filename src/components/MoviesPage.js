import React, {Component} from 'react';
import Movie from './Movie';
import '../styles/MoviesPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const MOVIES_API = "https://api.themoviedb.org/3/movie/popular?api_key=17d9b4847fdd4db487cdec8cb73cb0c5&language=en-US&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=17d9b4847fdd4db487cdec8cb73cb0c5&page=1&query=";

class MoviesPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            movies: [],
            search: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        fetch(MOVIES_API)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                movies: data.results
            });
        })
    }

    // function to keep a track of the changes in the input through react state
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        fetch(SEARCH_API + this.state.search)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movies: data.results,
                search: ""
            });
        });
    }

    render(){
        return(
            <div id='movie-page'>
                <div id='header'>
                    <FontAwesomeIcon icon={faVideoCamera} size="3x" color='red' />
                    <form onSubmit={this.handleSubmit}>
                        <input
                         id="search-bar"
                         type="search" 
                         name="search" 
                         value={this.state.search} 
                         onChange={this.handleChange}
                         placeholder='Search'
                         />
                    </form>
                    <FontAwesomeIcon icon={faUser} size="2x" color='white' display="flex" justify-content="flex-end" />
                </div>
                {this.state.movies.map(movie => 
                    <Movie key={movie.id} data={movie} />
                )}
            </div>
        )
    }
}

export default MoviesPage;