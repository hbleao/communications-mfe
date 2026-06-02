import { render } from "@testing-library/react";
import Root from "./root.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText, getAllByText } = render(<Root name="Testapp" />);
    expect(getByText(/Testapp \(standalone\)/i)).toBeInTheDocument();
    expect(getAllByText(/Abrir modal/i).length).toBeGreaterThan(0);
  });
});
