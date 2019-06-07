import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, requestedHistory}) => {
	if (isSignedIn && !requestedHistory) {
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick= {() => onRouteChange('history')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> History </p>
				<p onClick= {() => onRouteChange('signout')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> Sign Out </p>
			</nav>
		);
	}
	else if(isSignedIn && requestedHistory) {
		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick= {() => onRouteChange('home')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> Home </p>
			<p onClick= {() => onRouteChange('signout')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> Sign Out </p>
			</nav>
		);
	} else {

		return (
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick= {() => onRouteChange('signin')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> Sign In </p>
			<p onClick= {() => onRouteChange('register')} className= 'f3 link dim white pa2 ma3 pointer ba shadow-1 shd'> Register </p>
			</nav>
		);
	}
}

export default Navigation;