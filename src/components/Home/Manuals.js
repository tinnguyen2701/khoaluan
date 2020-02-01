import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ListPostNavigation from './ListPostNavigation';
import { GET_ALL_POST_NAVIGATION_REQUEST } from './ducks';
import Post from './Post';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  background: ghostwhite;

  .currentPage {
    color: steelblue;
    border-bottom: 2px solid steelblue;
  }

  > a {
    text-decoration: none;
    font-size: 30px;
    color: steelblue;
  }

  > button {
    padding: 5px;
    border: none;
    background: none;
    font-weight: bold;
    font-size: 17px;

    :hover {
      color: steelblue;
      cursor: pointer;
      border-bottom: 2px solid steelblue;
    }
  }

  span {
    input {
      padding: 5px 10px;
      border: 1px solid steelblue;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    button {
      padding: 5px;
      color: steelblue;
    }
  }
`;
const Div = styled.div`
  display: flex;
  > ul {
    flex: 1;
    background: ghostwhite;
    margin-top: 1px;
    height: 95vh;
    overflow-y: scroll;

    > li {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10 20px;

      cursor: pointer;
      button {
        cursor: pointer;
        background: none;
        border: none;
      }
    }
  }

  > div {
    flex: 3;
  }
`;

const Manuals = ({ ListPostDocumentNavigation = [], dispatch, history }) => {
  const [keySearch, setKeySearch] = useState('');
  const onSearchHandler = () => {};

  useEffect(() => {
    dispatch({
      type: GET_ALL_POST_NAVIGATION_REQUEST,
      payload: 'Document',
    });
  }, []);

  return (
    <div>
      <Nav>
        <a href="/">MONGO-LEARN</a>
        <button type="button" onClick={() => history.push('/')}>
          GETTING STARTED
        </button>
        <button type="button" onClick={() => history.push('/Manuals')} className="currentPage">
          MANUAL DOCUMENT
        </button>
        <span>
          <input
            type="text"
            placeholder="Search.."
            value={keySearch}
            onChange={e => setKeySearch(e.target.value)}
          />
          <button type="button" onClick={() => onSearchHandler()}>
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </span>
      </Nav>
      <Div>
        <ListPostNavigation
          ListPostNavigation={ListPostDocumentNavigation}
          page="Manuals"
          history={history}
        />
        <Post />
      </Div>
    </div>
  );
};

export default connect(state => ({
  ListPostDocumentNavigation: state.ListPostDocumentNavigation,
}))(Manuals);
