import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Card, { sampleProps } from '../Card'

Enzyme.configure({ adapter: new Adapter() })

describe('Card', () => {
  test('renders no symbol when card is not flipped', () => {
    const wrapper = shallow(<Card {...sampleProps} />)
    expect(wrapper.text()).toEqual('')
  })

  test('renders symbol when card is flipped', () => {
    const wrapper = shallow(<Card {...sampleProps} flipped />)
    expect(wrapper.text()).toEqual(sampleProps.symbol)
  })

  test('should call onClick when the button is clicked', () => {
    const mockClick = jest.fn()
    const wrapper = shallow(<Card {...sampleProps} onClick={mockClick} />)
    expect(mockClick.mock.calls.length).toBe(0)
    wrapper.find('button').simulate('click')
    expect(mockClick.mock.calls.length).toBe(1)
  })
})
