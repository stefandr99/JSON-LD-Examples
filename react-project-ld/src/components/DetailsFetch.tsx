import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsFetch = (props: { updateCurrentlyOpenedMovie: (movieInfo: any, id: any) => void }) => {
  const { creativeId } = useParams();

  const getMovie = (imdbId: string) => {
    axios
      .get(`http://www.omdbapi.com/?i=${imdbId}&apikey={yourkeyhere}`)
      .then((response) => {
        props.updateCurrentlyOpenedMovie(response.data, imdbId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (creativeId) {
      getMovie(creativeId);
    }
  }, [creativeId]);

  return <div>Loading...</div>;
};

export default DetailsFetch;
