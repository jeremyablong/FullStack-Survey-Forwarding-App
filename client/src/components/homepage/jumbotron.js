import React, { Component } from 'react';
import "./homepage.css";



class Jumbotron extends Component {
	render() {
		return (
			<div>
				<div className="jumbotron">
					<div className="container jumbo_inner">
					  <h1 className="display-4">"Mail Me Back" Survey's!</h1>
					  <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
					  <hr className="my-4"/>
					  <p className="lead">It uses utility classes for typography and spacing to space content out within the larger container.</p>
					  <a id="to_google_link" href="/auth/google">
				     	 <button type="button" className="btn btn-info google_signin_button"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign In With Google </button>
				      </a>
					</div>
				</div>
			</div>
		);
	}
}
export default Jumbotron;