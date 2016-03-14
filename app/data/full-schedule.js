import fetch from './fetch';

const domain = 'http://10.0.0.3:3000';
const fullScheduleURL = `${domain}/api/full_schedule`;

function get() {
  return fetch(fullScheduleURL).then((resp) => resp.json());
}

const fullSchedule = {
  get
};

export default Object.freeze(fullSchedule);
