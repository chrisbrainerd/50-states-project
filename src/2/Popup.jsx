import React from 'react';
import { FaTwitter, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import moment from 'moment';
const getStrippedHandle = (handle) => handle.replace('@', '');

const Twitter = ({ twitterHandle }) =>
  twitterHandle && (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='link mr12'
      href={`https://twitter.com/${getStrippedHandle(twitterHandle)}/`}
    >
      <FaTwitter />
      {'@' + getStrippedHandle(twitterHandle)}
    </a>
  );
const Instagram = ({ instagramHandle }) =>
  instagramHandle && (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='link'
      href={`https://instagram.com/${getStrippedHandle(instagramHandle)}/`}
    >
      <FaInstagram />
      {'@' + getStrippedHandle(instagramHandle)}
    </a>
  );

const Description = ({ description }) =>
  description && <p className='txt-em mb6'>{description}</p>;

const Title = ({ displayName, name }) => (
  <p className='txt-h4 txt-bold'>{displayName || name}</p>
);

const Link = ({ link }) =>
  link && (
    <a
      href={link}
      rel='noopener noreferrer'
      target='blank'
      className='link txt-s'
    >
      Website <FaExternalLinkAlt />
    </a>
  );

const Date = ({ date }) =>
  date && (
    <p>
      <span className='txt-bold txt-s mr6'>When?</span>
      <span className='txt-s'>
        {moment(date.date).format('LL')}
        {date.endDate &&
          date.endDate !== date.date &&
          ` to ${moment(date.endDate).format('LL')}`}
      </span>
      <span></span>
    </p>
  );

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
        link,
        date
      }
    }
  } = props;

  return (
    <div className='popup'>
      <Title displayName={displayName} name={name} />
      <Description description={description} />
      <Date date={date} />
      <Link link={link} />
      {(instagramHandle || twitterHandle) && (
        <>
          <hr className='txt-hr mb6' />
          <p className='txt-s'>
            suggested by: <br />
            <Twitter twitterHandle={twitterHandle} />
            <Instagram instagramHandle={instagramHandle} />
          </p>
        </>
      )}
    </div>
  );
};

export default PopupContent;
