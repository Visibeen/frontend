import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '../../../../icons/EditIcon';

const FieldContainer = styled(Box)(({ theme }) => ({
  marginBottom: '14px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '10px',
  color: '#374151',
  marginBottom: '6px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400
}));

const RequiredAsterisk = styled('span')(({ theme }) => ({
  color: '#ef232a'
}));

const InputWrapper = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  border: '0.2px solid #a0a0aa',
  borderRadius: '8px',
  background: '#fff',
  overflow: 'hidden'
}));

const InputField = styled('input')(({ theme }) => ({
  padding: '10px 12px',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  flex: 1,
  background: 'transparent'
}));

const EditButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  marginRight: '6px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  background: '#0B91D6',
  cursor: 'pointer',
  '&:hover': {
    background: '#0277BD'
  }
}));

const FormField = ({ label, name, value, onChange, placeholder, required = false }) => {
  return (
    <FieldContainer>
      <FieldLabel>
        {label}{required && <RequiredAsterisk>*</RequiredAsterisk>}
      </FieldLabel>
      <InputWrapper direction="row" alignItems="center">
        <InputField
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <EditButton type="button" aria-label={`Edit ${label}`}>
          <EditIcon width={15} height={14} color="#ffffff" />
        </EditButton>
      </InputWrapper>
    </FieldContainer>
  );
};

export default FormField;