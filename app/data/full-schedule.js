const domain = 'http://localhost:3000';
const fullScheduleURL = `${domain}/api/full_schedule`;

function get() {
  return fetch(fullScheduleURL).then((resp) => resp.json()).catch((fsError) => fsError);
}

const fullSchedule = {
  get
};

export default Object.freeze(fullSchedule);
