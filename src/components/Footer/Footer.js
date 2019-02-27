import React from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => (
    <Container className={classNames('py-5', 'text-center', 'text-muted')}>
        &copy; {new Date().getFullYear()} Grant Burry & Vamshi Arugonda
        <span className={classNames(styles.spacer, 'mx-2')}>&middot;</span>
        {process.env.NODE_ENV === 'development' ? (
            <span className="text-primary">Development Mode</span>
        ) : (
            'All rights reserved'
        )}
    </Container>
);

export default Footer;
