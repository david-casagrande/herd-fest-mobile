jest.dontMock('../toolbar');

const testUtils = require('../../../test-utils');

describe('toolbar', () => {
  let onPress = null;
  let component = null;
  let toolbar = null;

  beforeEach(() => {
    onPress = jest.fn();
    component = require('../toolbar').default;
    toolbar = testUtils.render(component, { onPress });
  });

  it('renders', () => {
    const navItems = 3;
    expect(toolbar.output.props.children.props.children.length).toEqual(navItems);
  });

  it('handles schedule click', () => {
    const child = toolbar.output.props.children.props.children[0];
    child.props.onPress();

    expect(onPress).toBeCalledWith('Schedule');
  });

  it('handles bands click', () => {
    const child = toolbar.output.props.children.props.children[1];
    child.props.onPress();

    expect(onPress).toBeCalledWith('Bands');
  });

  it('handles venues click', () => {
    const child = toolbar.output.props.children.props.children[2];
    child.props.onPress();

    expect(onPress).toBeCalledWith('Venues');
  });
});
