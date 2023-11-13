import { useState, useEffect } from "react";
import React from 'react';
import './App.css';
import searchIcon from './Search.svg';
import MovieCard from './MovieCard';

//2eecfd57
const API_URL = 'https://www.omdbapi.com/?apikey=2eecfd57'

const movie1 = {
    "Title": "Team Thor: Part 2", 
    "Year": "2017",
    "imdbID": "tt6599818",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODczODMwOTgtODhkOC00YjFiLWIzYmUtZTI3NThhZDE1NDhkXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
}
const App = () => {
    const [movies, setMovie] = useState([]);
    const [searchTerm , setSearchTerm] = useState('');
    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovie(data.Search);
    }
    useEffect(() => {
        searchMovie('thor');
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => (searchMovie(searchTerm))}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie = {movie}/>
                            ))}
                        </div>
                    ):
                     (
                        <div className = "empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }



        </div>
       )
}
export default App;