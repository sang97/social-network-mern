import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import { getAllProfiles } from '../../../redux/actions/profile';
import ProfileItem from '../ProfileItem/ProfileItem';

const Profile = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Sign up and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found</h4>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profile);
