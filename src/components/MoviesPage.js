import React, {Component} from 'react';
import Movie from './Movie';
import '../styles/MoviesPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext';
import history from '../history';
import { Link } from 'react-router-dom';



const MOVIES_API = "https://api.themoviedb.org/3/movie/popular?api_key=17d9b4847fdd4db487cdec8cb73cb0c5&language=en-US";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=17d9b4847fdd4db487cdec8cb73cb0c5&page=1&query=";

const GENRES_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=17d9b4847fdd4db487cdec8cb73cb0c5&language=en-US";

// console.log(AuthContext.currentUser.email);


class MoviesPage extends Component {
    static contextType = AuthContext;
    
    constructor(props){
        super(props);

        this.state = {
            movies: [],
            search: "",
            genres: [],
            preferredGenres: [],
            error: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        
    }

    componentDidMount(){

        fetch(GENRES_API)
        .then(res => res.json())
        .then(data => {
            this.setState({
                genres: data.genres
            });
        })

        fetch(MOVIES_API)
        .then(res => res.json())
        .then(data => {
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

    async handleLogout(){
        this.setState({
            error: ""
        })

        try {
            await this.context.logout().then(() => {
                history.push("/login");
                window.location.reload(true);
            })
        } catch {
            this.setState({
                error: "Failed to log out"
            })
        }
    }

    addGenre(id){
        this.setState({
            preferredGenres: [...this.state.preferredGenres, id]
        })
    }

    saveGenres = () => {
        let genreQuery = "";
        for(let i = 0; i < this.state.preferredGenres.length; i++){
            if(i === this.state.preferredGenres.length-1){
                genreQuery = genreQuery + this.state.preferredGenres[i]
            }else{
                genreQuery = genreQuery + this.state.preferredGenres[i] + "|"
            }
        }

        console.log(genreQuery)
        const SELECTED_GENRES_API = `https://api.themoviedb.org/3/discover/movie?api_key=17d9b4847fdd4db487cdec8cb73cb0c5&language=en-US&with_genres=${genreQuery}`

        fetch(SELECTED_GENRES_API)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movies: data.results
            });
        })

        this.setState({
            preferredGenres: []
        })
    }

    handleNextPage = () => {

    }

    render(){
        if(this.context.currentUser === null){
            return <h2 style={{color: "white", textAlign: "center", marginTop: "10%"}}>Sorry! You are not logged in <Link to="/login"> Log In</Link> </h2>
        }
        
        return(
            <div style={{backgroundColor: "rgb(54, 22, 85)"}}>
                <div id='header'>
                    <div>
                        <FontAwesomeIcon icon={faVideoCamera} size="3x" color='red'  />
                        <h2 style={{marginTop: -2, color: "white"}}>Universal Cinema</h2>
                    </div>
                    

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

                    <div>
                        <strong>Email : </strong> {this.context.currentUser.email} <br />
                        <button onClick={this.handleLogout}>Log Out</button>
                    </div>
                    
                </div>

                <div id='genres'>
                    <h3>Genres</h3>
                    <div id='genre-tags'>
                        {this.state.genres.map(genre => 
                            <span key={genre.id} id="genre-name" onClick={() => this.addGenre(genre.id)}>{genre.name}</span>
                        )}
                    </div>
                    <button id='save-genre-btn' type='submit' onClick={this.saveGenres} >Show</button>
                </div>

                <div id='movie-page'>
                    {this.state.movies.map(movie => 
                        <Movie key={movie.id} data={movie} />
                    )}
                </div>
                
                <button onClick={this.handleNextPage} >Next</button>
                
            </div>
        )
    }
}

export default MoviesPage;