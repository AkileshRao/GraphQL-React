const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('./merge');

const User = require('../../models/user');

module.exports = {

    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },

    bookEvent: async (args) => {
        try {
            const fetchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user: '5d89cd1c92708e1a02dfdd7d',
                event: fetchedEvent
            });

            const result = await booking.save();
            return transformBooking(result);
        } catch (err) {
            throw err;
        }
    },

    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            await Booking.deleteOne({ _id: args.bookingId });
            return transformEvent(booking.event)
        } catch (err) {
            throw err;
        }
    }
}