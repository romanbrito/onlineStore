import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('renders', () => {
    shallow(<CartCount count={10} />); // render test
  });

  it('matches the snapshot', () => {
    const wrapper = shallow(<CartCount count={11} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={50} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 }); // update props
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

// could use mount instead of shallow and will run it in a "browser environment" instead
// of going only one level deep like shallow