import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Game, { sampleProps } from '../Game'

Enzyme.configure({ adapter: new Adapter() })

describe('Game', () => {
  test('calls fetchLevels on mount', () => {
    const mockFetch = jest.fn()
    expect(mockFetch.mock.calls.length).toBe(0)
    shallow(<Game {...sampleProps} fetchLevels={mockFetch} />)
    expect(mockFetch.mock.calls.length).toBe(1)
  })

  describe('Game loading', () => {
    const wrapper = shallow(<Game {...sampleProps} loading />)
    test('renders LoadingDiv if game is loading', () => {
      expect(wrapper.find('LoadingDiv').length).toBe(1)
    })

    test('does not render GameBoard', () => {
      expect(wrapper.find('GameBoard').length).toBe(0)
    })
  })

  describe('Game not loading', () => {
    const wrapper = shallow(<Game {...sampleProps} />)
    test('does not render LoadingDiv', () => {
      expect(wrapper.find('LoadingDiv').length).toBe(0)
    })

    test('renders GameBoard', () => {
      expect(wrapper.find('GameBoard').length).toBe(1)
    })
  })

  describe('Game finished', () => {
    const wrapper = shallow(<Game {...sampleProps} finished />)
    test('does not render LoadingDiv', () => {
      expect(wrapper.find('LoadingDiv').length).toBe(0)
    })

    test('does not render GameBoard', () => {
      expect(wrapper.find('GameBoard').length).toBe(0)
    })

    test('renders a GameFinish', () => {
      expect(wrapper.find('GameFinish').length).toBe(1)
    })
  })
})
