'use client';

import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const errors = { name: '', email: '', message: '' };

      if (formState.name === '') {
        errors.name = 'Name is required';
      }

      if (formState.email === '' || !validateEmail(formState.email)) {
        errors.email = 'Valid email is required';
      }

      if (formState.message === '') {
        errors.message = 'Message is required';
      }

      setErrors(errors);

      if (!errors.name && !errors.email && !errors.message) {
         await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });
        setFormState({ name: '', email: '', message: '' });
      }
    } catch (error) {
      // handle error here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col gap-4 justify-center w-full max-w-md p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <input
          className="w-full rounded-md border-2 border-slate-300 px-2 py-1 outline-purple-500"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          className="w-full rounded-md border-2 border-slate-300 px-2 py-1 outline-purple-500"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          className="w-full rounded-md border-2 border-slate-300 px-2 py-1 outline-purple-500"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder="Message"
          rows={6}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-md bg-purple-500 text-white px-2 py-1 block"
        type="submit"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    </div>
  );
};

export default ContactUs;