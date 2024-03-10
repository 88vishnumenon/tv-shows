import { mockShowList } from "../../../shared/mocks/mock-data";
import { getStateWithItems, renderWithContext } from "../../../test-utils";
import ShowDetails from "../show-details";
import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams({ ids: "001,002" })],
}));

beforeEach(() => {
  const store = getStateWithItems(mockShowList);
  renderWithContext(<ShowDetails></ShowDetails>, store);
});
describe("render show details component", () => {
  it("snapshot is rendered", () => {
    const { asFragment } = renderWithContext(<ShowDetails></ShowDetails>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("image tag has value", () => {
    const showImage = screen.getByTestId("show-image") as HTMLImageElement;
    expect(showImage.src).toContain(mockShowList[0].showImage.original);
  });
  it("show detail section has values", () => {
    const scheduleElement = screen.getByTestId("schedule-value") as HTMLElement;
    const genereElement = screen.getByTestId("genere-value") as HTMLElement;
    const statusElement = screen.getByTestId("status-value") as HTMLElement;
    expect(scheduleElement.textContent).toContain(
      `${mockShowList[0]?.schedule?.days.join(",")} at 10:00`
    );
    expect(genereElement.textContent).toContain(mockShowList[0]?.genereList?.join(" | "));
    expect(statusElement.textContent).toContain(mockShowList[0].status);
  });

  // it.todo("show details has values")
});
