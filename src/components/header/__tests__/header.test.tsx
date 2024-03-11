import userEvent from "@testing-library/user-event";
import { renderWithContext } from "../../../test-utils";
import Header from "../header";
import { cleanup, screen, waitFor } from "@testing-library/react";
import * as React from "react";

let mockPathName = "/testroute";
const mockUsedNavigate = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as {}),
  useLocation: jest.fn().mockImplementation(() => {
    return { pathname: mockPathName };
  }),
  useNavigate: () => mockUsedNavigate,
}));

describe("render header component", () => {
  it("snap shot testing", () => {
    const { asFragment } = renderWithContext(<Header></Header>);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should not render homebutton in homepage", () => {
    renderWithContext(<Header></Header>);
    const headerBtn = screen.queryByTestId("header-home-btn");
    expect(headerBtn).toBe(null);
  });
  it("should render home buuton in details page ", () => {
    mockPathName = "/showDetails";
    renderWithContext(<Header></Header>);
    const headerBtn = screen.queryByTestId("header-home-btn");
    expect(headerBtn).toBeInTheDocument();
  });

  it("should direct to home page on home button click", async () => {
    mockPathName = "/showDetails";
    renderWithContext(<Header></Header>);
    const headerBtn = screen.getByTestId("header-home-btn");
    userEvent.click(headerBtn);
    await waitFor(() => expect(mockUsedNavigate).toHaveBeenCalled(), {
      timeout: 500,
    });
  });
});
