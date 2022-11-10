import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APIKey } from '../env';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchParam, setSearchParam] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const navigate = useNavigate();

  const getMoviesBySearchQuery = (searchQuery: string) => {
    axios
      .get(APIKey, {
        params: {
          s: searchQuery,
        },
      })
      .then((response) => {
        setSearchStatus(true);
        setSearchResult([...response.data.Search]);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-full flex mb-auto flex-col ">
      <div className="w-full flex flex-wrap justify-center gap-4">
        <input
          className="w-full px-2 py-4 bg-[#121212] text-white rounded-xl"
          defaultValue={searchParam}
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              getMoviesBySearchQuery(searchParam);
            }
          }}
        ></input>
        <button
          onClick={() => {
            getMoviesBySearchQuery(searchParam);
          }}
          className="bg-[#E2B616] px-4 rounded-lg font-bold xl:w-20 py-2  w-full"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col gap-2 max-h-full mt-8 overflow-auto w-full items-center">
        {searchStatus === false && searchResult.length >= 0 ? (
          <div className="text-2xl font-bold text-white">Please search a movie</div>
        ) : (
          <div className="w-full flex flex-col ">
            {searchResult.map((movie: any) => (
              <div className="w-full max-h-48 flex mb-8 bg-[#404040] px-4 py-4 shadow-md rounded-md">
                <img
                  className="h-40 w-24 object-cover border-[1px] border-gray-500 rounded-lg shadow-md"
                  src={movie.Poster}
                ></img>
                <div className="px-4">
                  <h2 className="text-3xl font-bold text-white mb-4">{movie.Title}</h2>
                  <button
                    onClick={() => {
                      console.log(movie);
                      navigate(`/detailsFetch/${movie.imdbID}`);
                    }}
                    className="bg-[#E2B616] px-4 py-2 rounded-lg font-bold"
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
