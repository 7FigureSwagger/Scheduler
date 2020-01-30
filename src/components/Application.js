import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "./Appointments";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay
} from "../helpers/selectors";
import useApplicationData from '../hooks/useApplicationData'


export default function Application(props) {
	
	const {
		state,
    setDay,
    bookInterview,
    cancelInterview
	} = useApplicationData();
	
	console.log('state', state);

	const interviewers = getInterviewersForDay(state, state.days);

	const appointments = getAppointmentsForDay(state, state.day).map(
		appointment => {
			return (
			<Appointment
					id={appointment.id}
					key={appointment.id}
					empty={appointment.EMPTY}
					status={appointment.SAVING}
					show={appointment.SHOW}
					interviewers={state.interviewers}
					interview={getInterview(state, appointment.interview)}
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
					{...appointment}
					/>
			)
		}
	)
	
	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appointments}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}


//FROM APPLICATION FUNCTION
	// const [state, setState] = useState({
	// 	day: "",
	// 	days: [],
	// 	appointments: {
	// 		"1": {
	// 			id: 1,
	// 			time: "12pm",
	// 			interview: null
	// 		}
	// 	},
	// 	interviewers: []
	// });


	// const schedule = appointments.map(appointment => {
	// 	// const interview = getInterview(state, appointment.interview);
	// 	return (
	// 		<>
	// 			<Appointment
	// 				id={appointment.id}
	// 				key={appointment.id}
	// 				empty={appointment.EMPTY}
	// 				status={appointment.SAVING}
	// 				show={appointment.SHOW}
	// 				interviewers={interviewers}
	// 				interview={getInterview(state, appointment.interview)}
	// 				bookInterview={bookInterview}
	// 				cancelInterview={cancelInterview}
	// 				{...appointment}
	// 			/>
	// 		</>
	// 	);
	// });