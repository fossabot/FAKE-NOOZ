import React from 'react';
import { string, bool, func } from 'prop-types';
import classNames from 'classnames';
import { Modal, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestionCircle,
    faCheckCircle,
    faTimesCircle,
    faRssSquare
} from '@fortawesome/pro-solid-svg-icons';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import feedMetadata from '../../feedMetadata';

const SourceLink = ({ source, href, label }) => (
    <td>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${source} ${label}`}
        >
            <FontAwesomeIcon
                icon={label === 'RSS feed' ? faRssSquare : faExternalLink}
                fixedWidth
            />
        </a>
    </td>
);

SourceLink.propTypes = {
    source: string.isRequired,
    href: string.isRequired,
    label: string.isRequired
};

const About = ({ show, onHide }) => (
    <Modal size="lg" aria-labelledby="about-title" show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title id="about-title">
                <FontAwesomeIcon
                    icon={faQuestionCircle}
                    fixedWidth
                    className="mr-2"
                />
                About <b>FAKE NOOZ</b>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                <b>FAKE NOOZ</b> is a simple game to test how well you can
                determine what is real news apart from fake news. We&apos;re not
                really talking about{' '}
                <a
                    href="https://en.wikipedia.org/wiki/Fake_news"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i>fake</i> news
                </a>{' '}
                here—content which is designed to deceive you—instead our fake
                news sources are parody/satire sites that don&apos;t hesitate to
                acknowledge their work as comedy. Here are all the news and
                parody RSS feeds we use for <b>FAKE NOOZ</b>:
            </p>
            <Table
                variant="dark"
                className={classNames('my-3', 'rounded', 'text-center')}
            >
                <tr>
                    <th className="text-left">Source</th>
                    <th>Type</th>
                    <th>Site</th>
                    <th>RSS Feed</th>
                </tr>
                {feedMetadata.map(({ source, site, rss, isReal }) => (
                    <tr key={source}>
                        <td className="text-left">{source}</td>
                        <td>
                            <FontAwesomeIcon
                                icon={isReal ? faCheckCircle : faTimesCircle}
                                className="mr-2"
                            />
                            {isReal ? 'Real' : 'Fake'}
                        </td>
                        <SourceLink href={site} label="site" />
                        <SourceLink href={rss} label="RSS feed" />
                    </tr>
                ))}
            </Table>
            <p>
                We make no claims on and take no responsibility for the content
                of these RSS feeds which are the property of their respective
                owners. <b>FAKE NOOZ</b> is created by{' '}
                <a
                    href="https://github.com/Burry"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Grant Burry
                </a>{' '}
                and{' '}
                <a
                    href="https://github.com/varugonda"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vamshi Arugonda
                </a>{' '}
                &copy; {new Date().getFullYear()}.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

About.propTypes = {
    show: bool.isRequired,
    onHide: func.isRequired
};

export default About;
