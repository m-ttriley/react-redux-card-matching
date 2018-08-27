import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GameBoard, { sampleProps } from '../GameBoard'

Enzyme.configure({ adapter: new Adapter() })

describe('Game', () => {
  test('renders moves, level, and matched cards', () => {
    const wrapper = shallow(<GameBoard {...sampleProps} />)
    expect(wrapper.text()).toContain(sampleProps.moves)
    expect(wrapper.text()).toContain(sampleProps.matchedCards)
    expect(wrapper.text()).toContain(sampleProps.level)
  })

  test('renders reset button', () => {
    const mockClick = jest.fn()
    const wrapper = shallow(<GameBoard {...sampleProps} resetBoard={mockClick} />)
    expect(mockClick.mock.calls.length).toBe(0)
    wrapper.find('button').simulate('click')
    expect(mockClick.mock.calls.length).toBe(1)
  })

  test('renders two cards', () => {
    const wrapper = shallow(<GameBoard {...sampleProps} />)
    expect(wrapper.find('Card').length).toEqual(sampleProps.cards.length)
  })
})
