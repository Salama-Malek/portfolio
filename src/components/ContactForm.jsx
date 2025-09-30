import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useToast } from './ToastProvider';
import { useDebounce } from '../hooks/useDebounce';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { pushToast } = useToast();
  const debouncedForm = useDebounce(formData, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', debouncedForm);
    pushToast({ type: 'success', title: 'Message sent', description: 'Thank you for your message!' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-header">
        <h4>Send a Message</h4>
        <p>Let's discuss your project and bring your ideas to life</p>
      </div>
      <div className="form-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <Icon icon="bi:person" className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Icon icon="bi:envelope" className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <div className="input-wrapper">
                <Icon icon="bi:tag" className="input-icon" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <div className="input-wrapper">
                <Icon icon="bi:chat-dots" className="input-icon textarea-icon" />
                <textarea
                  id="message"
                  name="message"
                  className="form-control textarea-control"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="px-btn form-submit-btn">
              <Icon icon="bi:send" />
              <span>Send Message</span>
              <div className="btn-ripple"></div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
