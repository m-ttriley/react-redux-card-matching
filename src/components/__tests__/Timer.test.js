import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Timer, { sampleProps, formatTime } from '../Timer'

Enzyme.configure({ adapter: new Adapter() })

describe('formatTime', () => {
  test('Test invalid time ', () => {
    expect(formatTime(-1)).toBe('--:--')
  })

  test('Test t=0', () => {
    expect(formatTime(0)).toBe('0:00')
  })

  test('Test t < 1min', () => {
    expect(formatTime(55)).toBe('0:55')
  })

  test('Test 1min < t < 1hr', () => {
    expect(formatTime(65)).toBe('1:05')
  })

  test('Test t > 1hr', () => {
    expect(formatTime(3601)).toBe('1:00:01')
  })
})

describe('Timer', () => {
  test('renders time spent', () => {
    const wrapper = shallow(<Timer {...sampleProps} />)
    expect(wrapper.text()).toEqual(`Time Spent: ${formatTime(sampleProps.time)}`)
  })
})
