import { Provider } from "react-redux";
import { RootState, getStoreWithState, store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import * as React from "react";
import { TVShow } from "./types/types";

export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );
  return { store, ...utils };
}

export function getStateWithItems(
  tvShows: TVShow[]
): RootState {
  const state: RootState = {
    tvshow: {
      showList: tvShows,
      generesList: ["DRAMA"],
      searchString: "",
      error: false,
    },
  };

  return state;
}
