import React from 'react';
import BookingForm from '../../components/BookingForm';
import './Booking.css';

const Booking = () => {
  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Book Your Appointment</h1>
        <p>Schedule your next salon visit with us</p>
      </div>
      <BookingForm />
    </div>
  );
};

export default Booking; 