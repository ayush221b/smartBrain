import React from 'react';
import './history.css'

export class History extends React.Component{ 
	constructor (props) {
		super(props);
		this.state= {
			historyImages: []
		}
    }
    
    componentDidMount() {
        fetch('https://immense-thicket-86460.herokuapp.com/gethistory', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.userInfo.id, 
          }) 
        }).then(response=> response.json())
        .then(response => this.setState({historyImages: response}))
        .catch(err=> console.log(err))
    }
	render() {
        const {historyImages} = this.state
		
		return(
        <div>
            <h1 className='white'>Hello, {this.props.userInfo.name}</h1>
            <h2 className='white'>Here are your previous searches</h2>
			<div className='grid-container'>
                { historyImages.map(imageData => {
                    return (
                        <article className="br3 ba b--black-10 mv4 center shadow-5">
                            <img src={imageData.imageurl} style={{"width": "100px", "height":"100px"}}/>
                            <h3 className='ph5 white'>{imageData.celebname}</h3>
				        </article>
                    );
                }) }
				
			</div>
            </div>
		);
	}
}
