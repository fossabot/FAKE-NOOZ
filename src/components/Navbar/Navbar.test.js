// eslint-ignore

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const Component = () => (
        <Router>
            <Navbar />
        </Router>
    );
    render(<Component />, div);
    unmountComponentAtNode(div);
});
