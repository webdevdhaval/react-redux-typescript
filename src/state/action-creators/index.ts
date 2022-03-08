import axios from 'axios';
import { Dispatch } from 'react';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    await axios
      .get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term,
        },
      })
      .then(({ data }) => {
        const names = data.objects.map((result: any) => result.package.name);

        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
          payload: names,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_FAILURE,
          payload: err.message,
        });
      });
  };
};
