import { useEffect, useReducer } from "react";
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const DELETE_INTERVIEW = "DELETE_INTERVIEW";

function reducer(state, action) {
	const { appointments, day, days, id, interview, interviewers, type } = action;

	switch (type) {
		case SET_DAY:
			console.log("SET_DAY", action)
			return { ...state, day };

		case SET_APPLICATION_DATA:
			return { ...state, days, appointments, interviewers };

		case SET_INTERVIEW: {
			const appointment = {
				...state.appointments[id],
					interview: interview && { ...interview }
			};
			const appointments = {
				...state.appointments,
				[id]: appointment,
				days: action.days
			};

			return { ...state, appointments };
		}
		case DELETE_INTERVIEW: {
			return { ...state, days };
		}

		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});
	// console.log('state in useAppData', state);
	const setDay = day => dispatch({ type: SET_DAY, day });



	useEffect(() => {
		const daysP = Axios.get("http://localhost:8001/api/days");
		const appointmentsP = Axios.get("http://localhost:8001/api/appointments");
		const interviewersP = Axios.get("http://localhost:8001/api/interviewers");

		Promise.all([daysP, appointmentsP, interviewersP])
			.then(results_array => {
				const [days, appointments, interviewers] = results_array;
				// console.log('results', results_array);
				// console.log('days', days);
				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	function bookInterview(id, interview) {
		return Axios.put(`/api/appointments/${id}`, {
			interview
		}).then(function(response) {
			const updatedDays = {
				...state.days,
				spots: state.days.spots - 1
			};
			dispatch({
				type: SET_INTERVIEW,
				id,
				days: updatedDays,
				interview
			});
		});
	}

	function cancelInterview(id, interview) {
		return Axios.delete(`/api/appointments/${id}`, {
			interview: null
		}).then(function(response) {
			console.log('what do we know ,', state.day, state.days)
			const updatedDays = [
				...state.days,
				// [dayID]: {..state.days[dayID], spots: state.days.spots + 1}
			];
			dispatch({
				type: DELETE_INTERVIEW,
				id,
				interview,
				days: updatedDays
			});
		});
	}

	const spotsLeft = (appointments, days, day) => {
		const targetDay = days.find(d => d.name === day);
		const appointmentList = [...targetDay.appointments];
		let availableSpots = appointmentList.length;

		appointmentList.forEach(i => {
			const appointment = appointments[i];
			if (appointment.interview) {
				availableSpots--;
			}
		});
		return availableSpots;
	};

	return { state, setDay, bookInterview, cancelInterview, spotsLeft };
}

// const filledSpots = Object.values({ ...appointments }).reduce(
// 	(total, appointment) => {
// 		if (appointmentList.includes(appointment.id)) {
// 			if (appointment.interview) {
// 				return total + 1;
// 			}
// 		}
// 		return total;
// 	},
// 	0
// 	);
// return availableSpots - filledSpots;
