import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeExperience } from '../../../redux/actions/profile';

const Experience = ({ experience, removeExperience }) => {
  const experiences = experience.map(
    ({ _id: id, company, title, from, to }) => (
      <tr key={id}>
        <td>{company}</td>
        <td className="hdie-sm">{title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
          {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => removeExperience(id)}
          >
            Delete{' '}
          </button>
        </td>
      </tr>
    )
  );

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      {experience.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
            {experiences}
          </thead>
          <tbody></tbody>
        </table>
      ) : (
        <span>No experiences found. Please add some</span>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  removeExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeExperience }
)(Experience);
