import React, { Component } from 'react';
import "./homepage.css";



class Jumbotron extends Component {
	render() {
		return (
			<div>
				<div className="jumbotron">
					<div className="container jumbo_inner">
					  <h1 className="display-4">"Mail Me Back" Survey's!</h1>
					  <p className="lead">Please navigate this website to send mass emails to your friends, clients, family, etc... Sign in with google to gain access.</p>
					  <hr className="my-4" style={{ borderBottom: "3px solid aquamarine" }}/>
					  <p className="lead">You MUST sign in to gain access to the site. Please check the security credentials of the website to verfiy the legitimacy of this website. </p>
					  <a id="to_google_link" href="/auth/google">
				     	 <button type="button" className="btn btn-info google_signin_button_two"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign In With Google </button>
				      </a>
					</div>
				</div>
			</div>
		);
	}
}
export default Jumbotron;