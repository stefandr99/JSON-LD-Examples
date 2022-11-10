import React, { useEffect } from 'react';
import { JsonLd } from 'react-schemaorg';
import { TVSeries, Movie } from 'schema-dts';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsCreative = (props: { movie: any }) => {
  const navigate = useNavigate();
  const { creativeId } = useParams();

  useEffect(() => {
    if (JSON.stringify(props.movie) === JSON.stringify({})) {
      navigate(`/detailsFetch/${creativeId}`);
    }
  }, [props.movie]);
  return (
    <div className="h-full pb-4 pt-4 flex flex-wrap max-w-full ">
      {props.movie && (
        <div className="w-full h-full flex gap-2 py-8 rounded-xl shadow-xl max-w-[100%] bg-white bg-opacity-[.15] backdrop-blur-lg ">
          <div className="h-full pl-12 pt-4  min-w-[240px]">
            <img src={props.movie?.Poster}></img>
          </div>
          <div className="px-4">
            <h1 className="text-7xl pb-4 text-white">{props.movie?.Title}</h1>
            <div className="text-lg pl-2 font-semibold text-white">IMDB : {props.movie?.imdbRating}</div>
            <h2 className="text-2xl pl-2 pt-4 py-1 text-white">
              <span className="font-bold">Genre :</span> {props.movie?.Genre}
            </h2>
            <h2 className="text-2xl pl-2 py-1 text-white">
              <span className="font-bold">Year :</span> {props.movie?.Year}
            </h2>
            <h2 className="text-2xl pl-2 py-1 text-white">
              <span className="font-bold">Runtime :</span> {props.movie?.Runtime}
            </h2>
            <h2 className="text-2xl pl-2 py-1 text-white">
              <span className="font-bold">Director:</span> {props.movie?.Director}
            </h2>
            <h2 className="text-2xl pl-2 py-1 text-white">
              <span className="font-bold">Country:</span> {props.movie?.Country}
            </h2>
            <h2 className="text-2xl pl-2 py-1 text-white">
              <span className="font-bold">Plot: </span>
              {props.movie?.Plot}
            </h2>
          </div>
        </div>
      )}

      {props.movie.Type === 'movie' && (
        <JsonLd<Movie>
          item={{
            '@context': 'https://schema.org',
            '@type': 'Movie',
            director: props.movie.Director,
            image: props.movie.Poster,
            dateCreated: props.movie.Released,
            name: props.movie.Title,
            duration: props.movie.Runtime,
            about: props.movie.Plot,
            countryOfOrigin: props.movie.Country,
          }}
        />
      )}
      {props.movie.Type === 'series' && (
        <JsonLd<TVSeries>
          item={{
            '@context': 'https://schema.org',
            '@type': 'TVSeries',
            director: props.movie.Director,
            image: props.movie.Poster,
            dateCreated: props.movie.Released,
            name: props.movie.Title,
            about: props.movie.Plot,
            countryOfOrigin: props.movie.Country,
            numberOfSeasons: props.movie.totalSeasons,
          }}
        />
      )}
    </div>
  );
};

export default DetailsCreative;
