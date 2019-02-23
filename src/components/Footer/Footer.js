import React from 'react';
import classNames from 'classnames';
import { Jumbotron, Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => (
    <Jumbotron
        fluid
        className={classNames('mb-0', 'bg-light', 'text-center', 'text-muted')}
    >
        <Container>
            &copy; {new Date().getFullYear()} Grant Burry
            <span className={classNames(styles.spacer, 'mx-2')}>&middot;</span>
            {process.env.NODE_ENV === 'development' ? (
                <span className="text-danger">Development Mode</span>
            ) : (
                'All rights reserved'
            )}
        </Container>
    </Jumbotron>
);

export default Footer;
