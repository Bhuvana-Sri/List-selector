import { render } from "@testing-library/react";

import FileTable from "./components/FileTable/FileTable";
import App from "./App";

test("renders FileTable component", () => {
  render(<App />);
  expect(<FileTable />).toBeInTheDocument;
});
