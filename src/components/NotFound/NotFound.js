import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerQuestion } from '@fortawesome/pro-solid-svg-icons';
import styles from './NotFound.module.scss';

const NotFound = () => (
    <Container className="py-5 text-center">
        <Helmet title="FAKE NOOZ » Not Found" />
        <Row>
            <Col
                xs={12}
                sm={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 3 }}
                lg={{ span: 4, offset: 4 }}
            >
                <FontAwesomeIcon
                    icon={faMapMarkerQuestion}
                    size="5x"
                    className={classNames('mb-4', 'text-muted')}
                />
                <h1>
                    404: <b>FAKE PAGE</b>
                </h1>
                <p className="mb-4">Looks like this page doesn&apos;t exist.</p>
                <Button
                    as={Link}
                    to="/"
                    variant="light"
                    type={null}
                    className={styles.link}
                >
                    Back to Game
                </Button>
            </Col>
        </Row>
    </Container>
);

export default NotFound;
