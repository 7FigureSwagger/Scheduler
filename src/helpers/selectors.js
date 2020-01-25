export const getAppointmentsForDay = (state, day) => {
	const appForDay = state.days
    .filter(spec => spec.name === day)
    .map(spec => spec.appointments)
    .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appForDay.forEach(spec => {
    appointment.push(state.appointments[spec]);
  });

  return appointment;
};

export const getInterview = (state, interview) => {
 if(!interview){
   return null;
 } else {
  //  console.log('state', state);
  //  console.log('interview', interview);
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];
  const interviewObj = { student, interviewer };
  return interviewObj;
 }
};