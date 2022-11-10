import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import { Routes, Route } from 'react-router-dom';
import DetailsFetch from './components/DetailsFetch';
import DetailsCreative from './components/DetailsCreative';
import { useNavigate } from 'react-router-dom';
import { WebPage } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';

function App() {
  const [currentlyOpenedMovie, setCurrentlyOpenedMovie] = useState<any>({});
  const navigate = useNavigate();

  const updateCurrentlyOpenedMovie = (movie: any, id: any) => {
    setCurrentlyOpenedMovie(movie);
    navigate(`/details/${id}`);
  };
  return (
    <div className="flex w-screen flex-col h-screen bg-[#1F1F1F]">
      <Header></Header>
      <div className="h-[800px] pt-24 pb-16 flex lg:px-36 px-8">
        <Routes>
          <Route path="/" element={<SearchResults></SearchResults>}></Route>
          <Route
            path="/detailsFetch/:creativeId"
            element={<DetailsFetch updateCurrentlyOpenedMovie={updateCurrentlyOpenedMovie}></DetailsFetch>}
          ></Route>
          <Route
            path="details/:creativeId"
            element={<DetailsCreative movie={currentlyOpenedMovie}></DetailsCreative>}
          ></Route>
        </Routes>
      </div>
      <JsonLd<WebPage>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'SerSte Webpage',
          author: 'Serghei Cunev and Stefan Dragoi',
          countryOfOrigin: 'Romania and Republic of Moldova',
          dateCreated: 'Today',
          inLanguage: 'Romanian',
        }}
      />
    </div>
  );
}

export default App;
