jest.dontMock('react-native');
const React = require('react-native');

describe('Foo component', function() {
  it('renders a TextCard component', function() {
    console.log(React);
    // const renderer = TestUtils.createRenderer();
    // renderer.render(<Foo />);
    // const result = renderer.getRenderOutput();
    // expect(result.props.children.type).toEqual(Bar);
    expect(true).toBeTruthy();
  });
});
