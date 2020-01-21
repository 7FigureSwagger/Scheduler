import React from "react";
import classnames from "classnames/bind";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerListItem.scss";

export default InterviwerList = props => {
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">
				<InterviewerListItem
					interviewers={"[]"}
					interviewer={props.id}
					setInterviewer={props.setInterviewer}
				/>
			</ul>
		</section>
	);
};
