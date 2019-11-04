import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeEducation } from '../../../redux/actions/profile';

const Education = ({ education, removeEducation }) => {
  const educations = education.map(({ _id: id, school, degree, from, to }) => (
    <tr key={id}>
      <td>{school}</td>
      <td className="hdie-sm">{degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => removeEducation(id)}>
          Delete{' '}
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      {education.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
            {educations}
          </thead>
          <tbody></tbody>
        </table>
      ) : (
        <span>No educations found. Please add some</span>
      )}
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  removeEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeEducation }
)(Education);
