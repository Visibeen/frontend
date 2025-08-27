import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NameField from './NameField';
import TestimonialTextField from './TestimonialTextField';


const FieldsContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927'
}));

const FormFields = ({ formData, onFormChange }) => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => onFormChange("name", e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px"
          }}
        />
      </div>

      <div>
        <label htmlFor="testimonial_text">Testimonial</label>
        <textarea
          id="testimonial_text"
          name="testimonial_text"
          value={formData.testimonial_text}
          onChange={(e) => onFormChange("testimonial_text", e.target.value)}
          placeholder="Write your testimonial..."
          rows="4"
          style={{
            width: "40px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical"
          }}
        />
      </div>
    </div>
  );
};


export default FormFields;