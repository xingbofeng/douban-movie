import * as types from './mutation-types';
import { ajax } from '../util';

export const changeCurrentMovie = ({ commit, state }, currentMovieId) => {
  if (state.currentMovie.id !== currentMovieId) {
    ajax(`/v2/movie/subject/${currentMovieId}`).then((currentMovie) => {
      commit(types.CURRENT_MOVIE, currentMovie);
    }).catch((error) => {
      commit(types.NET_STATUS, error);
    });
  }
};

export const seeMore = ({ commit, state }, subjects) => {
  if (state.currentSeeMore.title !== subjects.title) {
    commit(types.CURRENT_SEE_MORE, subjects);
  }
};
