import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import * as api  from "../../../services/api";
import * as DebounceUse from "../../../shared/hooks/useDebounceHook";

import Dashboard from "../dashboard";
import { renderWithContext } from "../../../test-utils";



const listShowsBySearchSpy = jest.spyOn(api,"listShowsBySearch")
listShowsBySearchSpy.mockResolvedValue([]);


beforeEach(() => {
    renderWithContext(<Dashboard />);
 } );

describe("dashboard component", () => {
  test("should match snapshot", async () => {
    const { asFragment } = renderWithContext(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });


  it("should render the search bar", () => {
    const element = screen.getByTestId("search-bar");
    expect(element).toBeInTheDocument;
  });

  it("should render the welcome message bar", () => {
    const element = screen.getByTestId("welcome-message");
    expect(element).toBeInTheDocument;
  });

});
