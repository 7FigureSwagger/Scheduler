import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import "components/Application.scss";
import Appointment from "./Appointments";
import Axios from "axios";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay
} from "../helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

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
		day: "",
		days: [],
		appointments: {
			"1": {
				id: 1,
				time: "12pm",
				interview: null
			}
		},
		interviewers: []
	});

	function bookInterview(id, interview, callback) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};
		return Axios.put(`/api/appointments/${id}`, {
			interview
		})
			.then(function(response) {
				setState({
					...state,
					appointments
				});
				console.log("trying to return");
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	function cancelInterview(id, interview){
		return( 
		Axios.delete(`/api/appointments/${id}`, {
			interview: null
		})
		.then(function(response) {
			setState({
				...state
			});
		})
		.catch(function(error) {
			console.error(error);
		})
		)
	}

	const setDay = day => setState(prev => ({ ...prev, day }));
	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	useEffect(() => {
		const daysP = Axios.get("http://localhost:8001/api/days");
		const appointmentsP = Axios.get("http://localhost:8001/api/appointments");
		const interviewersP = Axios.get("http://localhost:8001/api/interviewers");

		Promise.all([daysP, appointmentsP, interviewersP])
			.then(results_array => {
				const [days, appointments, interviewers] = results_array;
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

	const schedule = appointments.map(appointment => {
		// const interview = getInterview(state, appointment.interview);
		return (
			<>
				<Appointment
					id={appointment.id}
					key={appointment.id}
					empty={appointment.EMPTY}
					status={appointment.SAVING}
					show={appointment.SHOW}
					interviewers={interviewers}
					interview={getInterview(state, appointment.interview)}
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
					{...appointment}
				/>
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
