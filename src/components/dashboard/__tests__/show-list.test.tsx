import userEvent from "@testing-library/user-event";
import { mockShowList } from "../../../shared/mocks/mock-data";
import { renderWithContext } from "../../../test-utils";
import ShowList from "../show-list";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { TVShow } from "../../../types/types";

const genereName = "DRAMA";
const mockUsedNavigate = jest.fn();
const mockUsedRoutes = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
  Routes: () => mockUsedRoutes,
}));

function renderShowListComponent(genereName: string, tvShowList: TVShow[]) {
  return renderWithContext(
    <ShowList genereName={genereName} tvShowsList={mockShowList}></ShowList>
  );
}
describe("show-list component", () => {
  it("snapshot is rendered", () => {
    const { asFragment } = renderWithContext(
      <ShowList genereName={genereName} tvShowsList={mockShowList}></ShowList>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("is genere name displayed", () => {
    renderShowListComponent(genereName, mockShowList);
    const genereElement = screen.getByTestId("genere-name");
    expect(genereElement).toHaveTextContent(genereName);
  });

  it("is tv shows  displayed under genere ", () => {
    renderShowListComponent(genereName, mockShowList);
    const cardsElements = screen.getAllByTestId("show-cards");
    expect(cardsElements).toHaveLength(1);
  });

  it("should click on cards navigate to details page", async () => {
    renderShowListComponent(genereName, mockShowList);
    const cardsElement = screen.getAllByTestId("show-cards")[0];
    userEvent.click(cardsElement);
    await waitFor(() => expect(mockUsedNavigate).toHaveBeenCalled(), {
      timeout: 500,
    });
  });

  it("is tv shows  not displayed when genere is not available ", () => {
    renderShowListComponent("HORROR", mockShowList);
    const cardsElements = screen.queryByTestId("show-cards");
    expect(cardsElements).toBe(null);
  });
});
