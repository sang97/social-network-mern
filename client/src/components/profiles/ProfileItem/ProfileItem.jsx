import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id: id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="Developer Avatar" />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> at {company} </span>}
          </p>
          <p className="my-1">{location && <span> {location}</span>}</p>
          <Link to={`/profile/${id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li className="text-primary" key={index}>
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
