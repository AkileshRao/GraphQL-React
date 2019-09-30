import React from 'react'
import './EventsList.css';
import './EventItem/EventItem';
import EventItem from './EventItem/EventItem';
const eventsList = props => {
  const events = props.events.map(event => (
    <EventItem eventId={event._id} title={event.title} key={event._id} userId={props.authUserId} creatorId={event.creator._id}/>
  ))
  return (
    <ul className='events__list'>
      {events}
    </ul>
  )
};

export default eventsList;