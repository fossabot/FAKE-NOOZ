import React from 'react';
import { bool, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Container, Row, Col, Alert, Media } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';
import styles from './Loading.module.scss';

const Loading = ({ isLoading, pastDelay, error }) =>
    (isLoading && pastDelay) || error ? (
        <Container className={classNames('py-5', 'text-primary')}>
            <Row className="py-5">
                <Col md={{ span: 6, offset: 3 }} className="py-md-t">
                    <div className="text-center">
                        {isLoading && pastDelay && (
                            <FontAwesomeIcon
                                icon={faSpinnerThird}
                                size="3x"
                                spin
                            />
                        )}
                    </div>
                    {error && (
                        <Alert variant="primary" className="m-0">
                            <Media className="align-items-center">
                                <Media className="mr-3">
                                    <FontAwesomeIcon
                                        icon={faExclamationTriangle}
                                        fixedWidth
                                    />
                                </Media>
                                <Media.Body className={styles.alertContent}>
                                    {process.env.NODE_ENV === 'development' ? (
                                        <>
                                            <b>Page Load Error</b>
                                            <pre className="m-0">
                                                {error.message}
                                                <br />
                                                {error.stack}
                                            </pre>
                                        </>
                                    ) : (
                                        <>
                                            Sorry, there was a problem loading
                                            this page. Please{' '}
                                            <button
                                                type="button"
                                                className={classNames(
                                                    styles.refreshBtn,
                                                    'alert-link',
                                                    'p-0',
                                                    'bg-transparent',
                                                    'border-0'
                                                )}
                                                onClick={() =>
                                                    window.location.reload()
                                                }
                                            >
                                                refresh
                                            </button>
                                            .
                                        </>
                                    )}
                                </Media.Body>
                            </Media>
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    ) : null;

Loading.propTypes = {
    isLoading: bool.isRequired,
    pastDelay: bool,
    error: shape({
        message: string
    })
};

Loading.defaultProps = {
    pastDelay: false,
    error: undefined
};

export default Loading;
