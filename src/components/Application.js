import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointments";
import Axios from "axios";
import {getAppointmentsForDay, getInterview} from '../helpers/selectors'


const appointments = [
	{
		id: 1,
		time: "12pm"
	},
	{
		id: 2,
		time: "1pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png"
			}
		}
	},
	{
		id: 3,
		time: "2pm",
		interview: {
			student: "David",
			interviewer: {
				id: 5,
				name: "Sven Jones",
				avatar: "https://i.imgur.com/twYrpay.jpg"
			}
		}
	},
	{
		id: 4,
		time: "3pm",
		interview: {
			student: "Jun",
			interviewer: {
				id: 4,
				name: "Cohana Roy",
				avatar: "https://i.imgur.com/FK8V841.jpg"
			}
		}
	}
];

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: []
	});
	
	const setDay = day => setState(prev => ({ ...prev, day }));
	const appointments = getAppointmentsForDay(state, state.day);
	
	
	// console.log('state', state, 'state day', state.day);

	useEffect(() => {
		const daysP = Axios.get("http://localhost:8001/api/days");
		const appointmentsP = Axios.get("http://localhost:8001/api/appointments");
		const interviewersP = Axios.get("http://localhost:8001/api/interviewers");

		// console.log(interviewersP.data);

		Promise.all([daysP, appointmentsP, interviewersP])
			.then((results_array) => {
				const [days, appointments, interviewers] = results_array;
				// console.log('interviewers', interviewers.data);
				setState({
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	const schedule = appointments.map((appointment) => {

	const interview = getInterview(state, appointment.interview);
		console.log('current interview', interview);
		return (
			<>
				<Appointment key={appointment.id} {...appointment} />
			</>
		);
	});

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
				{schedule}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
