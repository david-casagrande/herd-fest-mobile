// const domain = 'https://herd-fest-api.heroku.com';
const domain = 'http://localhost:3000';
const fullScheduleURL = `${domain}/api/full_schedule`;

export function fullSchedule() {
  return fetch(fullScheduleURL).then((resp) => resp.json()).catch((fsError) => fsError);
}
