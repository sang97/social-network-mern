import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import { getProfileById } from '../../../redux/actions/profile';
import { Link } from 'react-router-dom';

import ProfileTop from '../ProfileTop/ProfileTop';
import ProfileAbout from '../ProfileAbout/ProfileAbout';
import ProfileExperience from '../ProfileExperience/ProfileExperience';
import ProfileEducation from '../ProfileEducation/ProfileEducation';
import ProfileGithub from '../ProfileGithub/ProfileGithub';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  const id = match.params.id;
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/profiles" className="btn btn-dark">
              Back
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
          </div>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
