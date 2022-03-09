import React from 'react';
import './App.css';
import Gallery from './containers/gallery/gallery';
import Form from './containers/form/form';

const App = () => {
  return (
    <div className="app">
      <Form />
      <Gallery />
    </div>
  );
};

export default App;
