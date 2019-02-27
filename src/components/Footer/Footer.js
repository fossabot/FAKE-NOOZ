import React from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

const isDevelopment = process.env.NODE_ENV === 'development';

const Footer = () => (
    <Container className={classNames('py-5', 'text-center', 'text-muted')}>
        &copy; {new Date().getFullYear()} Grant Burry & Vamshi Arugonda
        <span
            className={classNames(
                styles.spacer,
                'd-none',
                'd-sm-inline',
                'mx-2'
            )}
        >
            &middot;
        </span>
        <span
            className={classNames(
                'd-block',
                'd-sm-inline',
                isDevelopment && 'text-primary'
            )}
        >
            {isDevelopment ? 'Development Mode' : 'All rights reserved'}
        </span>
    </Container>
);

export default Footer;
