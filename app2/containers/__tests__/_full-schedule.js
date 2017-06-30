export default {
  bands: [
    { id: '1', name: 'Band 1' }
  ],
  venues: [
    { id: '1', name: 'Venue 1', street_address: 'address' }
  ],
  set_times: [
    { id: '1', day: '1', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
    { id: '2', day: '2', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
    { id: '3', day: '3', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
    { id: '4', day: '4', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' }
  ],
  days: [
    { id: '1', name: 'Thursday', set_times: ['1'] },
    { id: '2', name: 'Friday', set_times: ['2'] },
    { id: '3', name: 'Saturday', set_times: ['3'] },
    { id: '4', name: 'Sunday', set_times: ['4'] }
  ]
};
