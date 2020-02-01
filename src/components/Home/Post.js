/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
  padding: 20px 10px;
  opacity: ${props => (props.isVisibleLoading ? '0.2' : '1')};
`;
const Post = ({ post, isVisibleLoading }) => {
  return (
    <div>
      {post ? (
        <Div isVisibleLoading={isVisibleLoading}>
          <div className="Container" dangerouslySetInnerHTML={{ __html: post.describe }}></div>
        </Div>
      ) : (
        <div>Kha la met </div>
      )}
    </div>
  );
};

export default connect(state => ({
  post: state.post,
  isVisibleLoading: state.isVisibleLoading,
}))(Post);
