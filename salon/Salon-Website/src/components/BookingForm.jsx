import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    service: Yup.string().required('Service is required'),
    message: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', values);
      if (response.data) {
        alert('Booking submitted successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="booking-form-container">
      <h2>Book an Appointment</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field type="tel" name="phone" id="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Field type="date" name="date" id="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <Field type="time" name="time" id="time" />
              <ErrorMessage name="time" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service</label>
              <Field as="select" name="service" id="service">
                <option value="">Select a service</option>
                <option value="haircut">Haircut</option>
                <option value="coloring">Hair Coloring</option>
                <option value="styling">Hair Styling</option>
                <option value="treatment">Hair Treatment</option>
              </Field>
              <ErrorMessage name="service" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Message</label>
              <Field as="textarea" name="message" id="message" />
              <ErrorMessage name="message" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm; 