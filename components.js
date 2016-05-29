import React, { Component } from 'react';

export class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.addItem = this.addItem.bind(this);
  }  

  addItem(name){
  	 this.setState({
      tracks: [].concat(this.state.tracks).concat([name])
    });
  }   

  render() {
    return (
      <div>
        <InputArea onSubmit={this.addItem}/>
        <TrackList items={this.state.tracks}/>
      </div>
    );
  }
}

export class InputArea extends Component {
   constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.setText = this.setText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setText(event) {
    this.setState({text: event.target.value});
  }

  handleClick() {
    this.props.onSubmit(this.state.text);
  }

  render() {
    return (
		<div>
			<input value={this.state.text} onChange={this.setText}/>
				<button onClick={this.handleClick}>Add</button>
		</div> 
	)
  }
}

InputArea.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export class TrackList extends Component {
    render() {
    return this.props.items ?
      (<ul>
        {this.props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>)
    : null;
  }
}

TrackList.propTypes = {
	  items: React.PropTypes.array.isRequired
	};
