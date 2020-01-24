export function getAppointmentsForDay(state, day) {
	const appForDay = state.days
    .filter(spec => spec.name === day)
    .map(spec => spec.appointments)
    .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appForDay.forEach(spec => {
    appointment.push(state.appointments[spec]);
  });

  return appointment;
}
