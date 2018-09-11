import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from '../Header'

Enzyme.configure({ adapter: new Adapter() })

describe('Header', () => {
  test('renders header text', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.text()).toEqual('NYT Games Code TestBy Matthew Riley')
  })
})
