import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../../redux/actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: ''
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const [toDateDisable, toggleToDateDisable] = useState(false);

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            value={school}
            onChange={onChangeHandler}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={degree}
            onChange={onChangeHandler}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={fieldofstudy}
            onChange={onChangeHandler}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={onChangeHandler}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={event => {
                setFormData({ ...formData, current: !current });
                toggleToDateDisable(!toDateDisable);
              }}
            />
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            value={to}
            onChange={onChangeHandler}
            type="date"
            name="to"
            disabled={toDateDisable}
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={onChangeHandler}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
