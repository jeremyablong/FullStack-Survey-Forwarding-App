import React, { Component } from 'react';
import "./main-content.css";
import { Link } from "react-router-dom";


class MainContentDashboard extends Component {
	render() {
		return (
			<div className="bottom_right">
				<Link to="surveys/new">
					<i className="fas fa-plus-circle fa-6x"></i>
				</Link>
			</div>
		);
	}
}
export default MainContentDashboard;