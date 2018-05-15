import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div className="tc">
			<p className='f3 white shd'>
				{'This smart brain can detect faces in your images. Give it a go!'}
			</p>
			<div className='pa4 br3 shadow-5 form center'>
				<input className= 'f4 pa2 w-70'type="text" onChange={onInputChange}/>
				<button 
				className= 'f4 w-30 grow link pa1 pv2 dib white back' 
				onClick={onButtonSubmit}>
				Detect
				</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;