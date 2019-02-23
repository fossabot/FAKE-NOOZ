import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from '../../pages';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './App.scss';

const App = () => (
    <BrowserRouter>
        <>
            <Helmet defaultTitle="My App" />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </>
    </BrowserRouter>
);

export default App;
