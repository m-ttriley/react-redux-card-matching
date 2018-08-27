import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GameFinish, { sampleProps } from '../GameFinish'

Enzyme.configure({ adapter: new Adapter() })

describe('GameFinish', () => {
  test('renders moves and time spent', () => {
    const wrapper = shallow(<GameFinish {...sampleProps} />)
    expect(wrapper.text()).toContain(sampleProps.moves)
    expect(wrapper.text()).toContain(sampleProps.time)
  })

  test('calls restartGame on button click', () => {
    const mockClick = jest.fn()
    const wrapper = shallow(<GameFinish {...sampleProps} restartGame={mockClick} />)
    expect(mockClick.mock.calls.length).toBe(0)
    wrapper.find('button').simulate('click')
    expect(mockClick.mock.calls.length).toBe(1)
  })
})
