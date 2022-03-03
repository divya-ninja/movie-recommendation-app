import React, { Component } from "react";
import "../styles/Movie.css";

const IMAGE_API = "https://image.tmdb.org/t/p/w1280";

class Movie extends Component {
    render(){
        const {title, overview, poster_path, vote_average, release_date, vote_count} = this.props.data;
        return(
            <div id="movie-container">
                <img src={poster_path ? IMAGE_API + poster_path : "https://png.pngtree.com/background/20210710/original/pngtree-fashion-movie-film-theme-background-poster-picture-image_1060677.jpg"} alt={title} className="movie-image" />
                <div id="movie-info">
                    <div id="movie-title" className="text-color">{title}</div>
                    <span className="text-color">⭐{vote_average}</span>
                </div>
                <div id="movie-overview">
                    <h3>Details: </h3>
                    <p><b>Overview :</b> {overview}</p>
                    <p><b>Release Date : </b>{release_date}</p>
                    <p><b>Votes : </b>{vote_count}</p>
                </div>
            </div>
        )
    }
}

export default Movie;