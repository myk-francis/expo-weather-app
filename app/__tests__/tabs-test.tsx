import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import TabOneScreen from "../(tabs)/index";

describe("calculate", function () {
  it("examples of some things", async () => {
    const btnName = "Weather";

    render(<TabOneScreen />);

    // Using `findBy` query to wait for asynchronous operation to finish
    const testOutput = await screen.findByTestId("weather-btn");

    // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
    expect(testOutput).toHaveTextContent(btnName);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
