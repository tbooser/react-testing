import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { TrackListContainer } from './components';
import { InputArea, TrackList } from './components';
import { spy } from 'sinon';

describe('TrackListContainer', () => {
  
  it('should render InputArea and TrackList', () => {
    const wrapper = shallow(<TrackListContainer/>);
    expect(wrapper.containsAllMatchingElements([
      <InputArea/>,
      <TrackList/>
    ])).to.equal(true);
  });
  

  it('should start with an empty list', () => {
	const wrapper = shallow(<TrackListContainer/>);
	expect(wrapper.state('tracks')).to.eql([]);
  });


  it('adds items to the list', () => {
    const wrapper = shallow(<TrackListContainer/>);
    wrapper.instance().addItem('Hanna - I Needed');
    expect(wrapper.state('tracks')).to.eql(['Hanna - I Needed']);
  });


  it('passes addItem to InputArea', () => {
    const wrapper = shallow(<TrackListContainer/>);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    expect(inputArea.prop('onSubmit')).to.eql(addItem);
  });


   it('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<TrackListContainer/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Hanna - I Needed');
    expect(wrapper.state('tracks')).to.eql(['Hanna - I Needed']);
  });


   it('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea/>);
    expect(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>
    ])).to.equal(true);
  });


   it('should accept input', () => {
    const wrapper = mount(<InputArea/>);
    const input = wrapper.find('input');
    input.simulate('change', {target: { value: 'MoodyMann - I Like To Know' }});
    expect(wrapper.state('text')).to.equal('MoodyMann - I Like To Know');
    expect(input.prop('value')).to.equal('MoodyMann - I Like To Know');
  });


   it('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({text: 'Peace Division - Back 2 Back'});
    const addButton = wrapper.find('button');

    addButton.simulate('click');

    expect(addItemSpy.calledOnce).to.equal(true);
    expect(addItemSpy.calledWith('Peace Division - Back 2 Back')).to.equal(true);
  });
 

  it('should render zero items', () => {
    const wrapper = shallow(<TrackList items={[]}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });


  it('should render undefined items', () => {
    const wrapper = shallow(<TrackList items={undefined}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });


  it('should render some items', () => {
    const items = ['Hanna - I Needed', 'MoodyMann - I Like To Know', 'Peace Division - Back 2 Back'];
    const wrapper = shallow(<TrackList items={items}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });


  it('renders the items', () => {
    const wrapper = mount(<TrackListContainer/>);
    wrapper.instance().addItem('Hanna - I Needed');
    wrapper.instance().addItem('MoodyMann - I Like To Know');
    expect(wrapper.find('li').length).to.equal(2);
  });



});
