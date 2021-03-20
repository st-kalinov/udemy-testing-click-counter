import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Factory function to create ShallowWrapper for the App component
 *
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);


const findByTestAttr = (wrapper, dataTestValue) => wrapper.find(`[data-test='${dataTestValue}']`);

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');

  expect(appComponent.length).toBe(1);
})

test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');

  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');

  expect(counterDisplay.length).toBe(1);
});

test("counter start at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();

  expect(count).toBe("0");
});

test("clicking on button increments counter display", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');

  button.simulate('click');
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
})

test("dont decrement the counter if decrement button is clicked but counter is 0 before the click", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');

    decrementButton.simulate('click');

    const count = findByTestAttr(wrapper, "count").text();

    expect(count).toBe("0");
});

test("display error message if decrement button is clicked when the count is 0", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');

    decrementButton.simulate('click');

    const errorMessage = findByTestAttr(wrapper, 'error-message').text();

    expect(errorMessage).toBe("Cannot decrement below 0");
});

test("error message element should be visible if decrement button is clicked when counter is 0", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');

    decrementButton.simulate('click');

    const errorMessage = findByTestAttr(wrapper, 'error-message');

    expect(errorMessage).toBeTruthy();
});

test("error message element should be hidden if the increment button is clicked", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');

  decrementButton.simulate('click');

  incrementButton.simulate('click');

  const errorMessageElement = findByTestAttr(wrapper, 'error-message');

  //expect(errorMessageElement.length).toBe(0); //fails it receives 1
  expect(errorMessageElement.exists()).toBeFalsy(); //even more strange - Expected: undefined, Actual: undefined and the test fail
});
