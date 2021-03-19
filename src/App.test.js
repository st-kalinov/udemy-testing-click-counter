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

test("clicking on the decrement button decrements the counter display", () => {
   const wrapper = setup();
   const decrementButton = findByTestAttr(wrapper, 'decrement-button');

   decrementButton.simulate('click');
   const count = findByTestAttr(wrapper, 'count').text();

   expect(count).toBe("-1");
});
