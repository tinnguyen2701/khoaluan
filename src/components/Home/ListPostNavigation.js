import React from 'react';
import store from 'store';
import { GET_POST_REQUEST } from './ducks';

export default ({ ListPostNavigation, page, history }) => {
  const onClickHandler = name => {
    store.dispatch({ type: GET_POST_REQUEST, payload: { page, name } });
    history.push(`/${page}/${name}`);
  };
  return (
    <ul>
      {ListPostNavigation &&
        ListPostNavigation.length > 0 &&
        ListPostNavigation.map((postItem, index) => (
          <li key={index.toString()}>
            <button type="button" onClick={() => onClickHandler(postItem.name)}>
              {postItem.name}
            </button>
          </li>
        ))}
    </ul>
  );
};
