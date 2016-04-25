import lodash from 'lodash';
import utils from '../utils';
import serializers from '../data/serializers';

function getRowData(dataBlob, sectionId, rowId) {
  return dataBlob[sectionId].setTimes.find((setTime) => setTime.id === rowId);
}

function dataSource(collection) {
  const sectionIds = collection.map((item, idx) => idx);
  const rowIds = collection.map((item) => item.setTimes.map((setTime) => setTime.id));

  return utils.dataSource(collection, { sectionIds, rowIds }, { getRowData });
}

function byVenue(venues, fullSchedule) {
  return Object.keys(venues).map((id) => {
    const venue = lodash.find(fullSchedule.venues, { id });
    const venueSetTimes = lodash.sortBy(venues[id], 'start_time');

    return {
      id: venue.id,
      name: venue.name,
      setTimes: serializers.setTimes(venueSetTimes, fullSchedule)
    };
  });
}

function byDay(days, fullSchedule) {
  return Object.keys(days).map((id) => {
    const day = lodash.find(fullSchedule.days, { id });
    const daySetTimes = lodash.sortBy(days[id], 'start_time');

    return {
      id: day.id,
      name: day.name,
      date: day.date,
      setTimes: serializers.setTimes(daySetTimes, fullSchedule)
    };
  });
}

const ByMap = {
  venue: byVenue,
  day: byDay
};

const SortMap = {
  venue: 'name',
  day: 'date'
};

export default function dsSetTimesBy(type, setTimes, fullSchedule) {
  const grouped = lodash.groupBy(setTimes, type);
  const parsed = ByMap[type](grouped, fullSchedule);
  const sorted = lodash.sortBy(parsed, SortMap[type]);

  // console.log(parsed);
  // const venues = groupByVenue(setTimes, fullSchedule);
  // const sortedVenues = lodash.sortBy(venues, 'name');

  return dataSource(sorted);
}
