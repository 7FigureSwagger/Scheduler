import React from "react";
import classnames from "classnames/bind";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
	const interviewerClass = classnames("interviewers__item", {
		"interviewers__item--selected": props.selected
	});

	const InterviewerList = props.interviewers.map(props => {
		return (
			<InterviewerListItem
				className={interviewerClass}
				key={props.id}
				name={props.name}
				avatar={props.avatar}
				selected={props.id === props.value}
				setInterviewer={event => props.onChange(props.id)}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{InterviewerList}</ul>
		</section>
	);
}

// const interviewers = props.interviewers.map(interviewer =>
// 	{
// 		<InterviewerListItem
// 			key={props.id}
// 			name={props.name}
// 			avatar={props.avatar}
// 			selected={props.id === props.value}
// 			setInterviewer={event => props.setInterviewer(props.id)}
// 		/>
// 	}
