import { render, screen } from "@testing-library/react";

import FileTable from "./FileTable";

test("renders select all chechbox", () => {
  render(<FileTable />);
  const allChechbox = screen.getByTestId("all-checkbox");
  expect(allChechbox).toBeInTheDocument;
});

test("renders download selected button", () => {
  render(<FileTable />);
  const downloadSelected = screen.getByText(/Download Selected/i);
  expect(downloadSelected).toBeInTheDocument;
});

test("renders table", () => {
  render(<FileTable />);
  let tableList = screen.getByTestId("table-list");
  expect(tableList).toBeInTheDocument;
});
