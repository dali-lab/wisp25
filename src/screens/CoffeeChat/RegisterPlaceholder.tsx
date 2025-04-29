// src/ConnectionForm.jsx
import React, { useState } from "react";

export default function RegisterPlaceholder() {
  const [formData, setFormData] = useState({
    name: "",
    gradYear: 0,
    email: "",
    linkedIn: "",
    courses_taken: "",
    major: "",
    minor: "",
    academicInterest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      gradYear: formData.gradYear,
      courses_taken: formData.courses_taken.split(",").map((c) => c.trim()),
    };

    try {
      const res = await fetch('http://localhost:5000/newConnection', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Connection added!");
        setFormData({
          name: "",
          gradYear: 0,
          email: "",
          linkedIn: "",
          courses_taken: "",
          major: "",
          minor: "",
          academicInterest: "",
          message: "",
        });
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert("Failed to connect to server.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="gradYear"
        value={formData.gradYear}
        onChange={handleChange}
        placeholder="Graduation Year"
        type="number"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="courses_taken"
        value={formData.courses_taken}
        onChange={handleChange}
        placeholder="Courses Taken (comma-separated)"
        required
      />
      <input
        name="major"
        value={formData.major}
        onChange={handleChange}
        placeholder="Major"
      />
      <input
        name="minor"
        value={formData.minor}
        onChange={handleChange}
        placeholder="Minor"
      />
      <input
        name="academicInterest"
        value={formData.academicInterest}
        onChange={handleChange}
        placeholder="Academic Interest"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
