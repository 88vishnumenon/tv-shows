import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import * as api  from "../../../services/api";
import * as DebounceUse from "../../../shared/hooks/useDebounceHook";

import Dashboard from "../dashboard";
import { renderWithContext } from "../../../test-utils";



const listShowsBySearchSpy = jest.spyOn(api,"listShowsBySearch")
listShowsBySearchSpy.mockResolvedValue([]);

const listAllShowsSpy = jest.spyOn(api,"listallTvShows");
listAllShowsSpy.mockResolvedValue([]);

describe("dashboard component", () => {
  test("should match snapshot", async () => {
    const { asFragment } = renderWithContext(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });


  it("should render the search bar", () => {
    const element = screen.findByTestId("search-bar");
    expect(element).toBeInTheDocument;
  });



  it("should render all shows from the api",async()=>{
    renderWithContext(<Dashboard />);
    await waitFor(() => expect(listAllShowsSpy).toHaveBeenCalled(), {
      timeout: 500,
    });
  })

});
