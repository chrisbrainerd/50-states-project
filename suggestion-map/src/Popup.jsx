import React from 'react';
import { FaTwitter, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
const getStrippedHandle = (handle) => handle.replace('@', '');

const Twitter = ({ twitterHandle }) =>
  twitterHandle ? (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='link mr12'
      href={`https://twitter.com/${getStrippedHandle(twitterHandle)}/`}
    >
      <FaTwitter className='popup-social-icon' />
      {'@' + getStrippedHandle(twitterHandle)}
    </a>
  ) : null;
const Instagram = ({ instagramHandle }) =>
  instagramHandle ? (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='link'
      href={`https://instagram.com/${getStrippedHandle(instagramHandle)}/`}
    >
      <FaInstagram className='popup-social-icon' />
      {'@' + getStrippedHandle(instagramHandle)}
    </a>
  ) : null;

const Description = ({ description }) =>
  description ? <p className='txt-em mb6'>{description}</p> : null;

const Title = ({ displayName, name }) => (
  <p className='txt-h4 txt-bold popup-title'>{displayName || name}</p>
);

const Link = ({ link }) =>
  link ? (
    <a
      href={link}
      rel='noopener noreferrer'
      target='blank'
      className='link txt-s'
    >
      Website <FaExternalLinkAlt />
    </a>
  ) : null;

const SubmitterName = ({ submitterName }) =>
  submitterName ? <span className='txt-sm ml6'>{submitterName}</span> : null;

const PopupContent = (props) => {
  if (!props.info.properties) return null;
  const {
    info: {
      properties: {
        instagramHandle,
        twitterHandle,
        description,
        displayName,
        name,
        submitterName,
        link
      }
    }
  } = props;
  return (
    <div className='popup' style={{ color: '#213e8c' }}>
      <Title displayName={displayName} name={name} />
      <div className='popup-scrollable-section'>
        <Description description={description} />
        <Link link={link} />
        {(instagramHandle || twitterHandle || submitterName) && (
          <>
            <hr className='txt-hr mb6' />
            <p className='txt-s'>
              suggested by:
              <SubmitterName submitterName={submitterName} />
              <br />
              <Twitter twitterHandle={twitterHandle} />
              <Instagram instagramHandle={instagramHandle} />
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupContent;
