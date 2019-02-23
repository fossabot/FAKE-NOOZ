import React from 'react';
import Helmet from 'react-helmet';
import { Container } from 'react-bootstrap';

const Home = () => (
    <Container className="py-5">
        <Helmet title="My App » Home" />
        <h3>It works!</h3>
    </Container>
);

export default Home;
