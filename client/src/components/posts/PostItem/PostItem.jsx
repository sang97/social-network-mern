import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateLikes, deletePost } from '../../../redux/actions/post';

const PostItem = ({
  auth,
  post: { _id: id, text, name, avatar, user, likes, comments, date },
  updateLikes,
  deletePost,
  showActions = true
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="Avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          {' '}
          Posted on {<Moment format="YYYY/MM/DD">{date}</Moment>}
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => updateLikes(id)}
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span> {likes.length} </span>}
            </button>
            <Link to={`/post/${id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading &&
              auth.isAuthenticated &&
              user.toString() === auth.user._id.toString() && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deletePost(id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateLikes, deletePost }
)(PostItem);
