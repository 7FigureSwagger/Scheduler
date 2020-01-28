import React from "react";
import classnames from "classnames/bind";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
	const interviewerClass = classnames("interviewers__item", {
		"interviewers__item--selected": props.selected
	});
	
	// const num = Object.keys(props.interviewers);

	var result = Object.keys(props.interviewers).map(function(key) {
		return [Number(key), props.interviewers[key]];
	});
	
	// console.log('inside interviewerlist', result);
	
	const InterviewerList = result.map(interviewer => {
		return (
			<InterviewerListItem
				className={interviewerClass}
				key={interviewer[1].id}
				name={interviewer[1].name}
				avatar={interviewer[1].avatar}
				selected={interviewer[1].id === props.value}
				setInterviewer={() => props.onChange(interviewer[1].id)}
			/>
			
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewers</h4>
			<ul className="interviewers__list">{InterviewerList}</ul>
		</section>
	);
}