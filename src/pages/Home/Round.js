import React from 'react';
import { func, shape } from 'prop-types';
import classNames from 'classnames';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';

const Round = ({ article, handleRealButton, handleFakeButton }) => (
    <>
        <Card bg="dark" border="dark">
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <article /* eslint-disable react/no-danger */
                    dangerouslySetInnerHTML={{
                        __html: article.content
                            .replace(/<img[^>]*>/g, '')
                            .replace(/<a[^>]*>.*<\/a>/g, '')
                            .replace(/<\/?p[^>]*>/g, '')
                            .replace(/\n.*/g, '')
                            .replace(
                                /\s*makeamericathebest.com Your Trusted Source for Faux News\./g,
                                ''
                            )
                    }}
                />
            </Card.Body>
        </Card>
        <div
            className={classNames(
                'd-flex',
                'align-items-center',
                'justify-content-center',
                'mt-4'
            )}
        >
            <Button
                variant="success"
                size="lg"
                className="mr-3"
                onClick={handleRealButton}
            >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Real
            </Button>
            <Button
                variant="danger"
                size="lg"
                className="ml-3"
                onClick={handleFakeButton}
            >
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                Fake
            </Button>
        </div>
    </>
);

Round.propTypes = {
    article: shape({}).isRequired,
    handleRealButton: func.isRequired,
    handleFakeButton: func.isRequired
};

export default Round;
