import React, { useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarIcon from '../icons/CalendarIcon';

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#EF232A'
}));

const InputContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#a0a0aa',
      borderWidth: '0.2px'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6'
    }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0B91D6',
    padding: '12px 16px'
  }
}));

const CalendarButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '17px',
  height: '19px',
  '&:hover': {
    opacity: 0.7
  }
}));

const DatePickerField = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  onCalendarClick 
}) => {
  const hiddenDateInputRef = useRef(null);

  const openNativeDatePicker = () => {
    // Still fire the external click handler for analytics/logs
    if (onCalendarClick) onCalendarClick();
    const el = hiddenDateInputRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      el.click();
    }
  };

  const toDisplayFormat = (iso) => {
    // iso: YYYY-MM-DD -> DD-MM-YYYY
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return iso;
    return `${d}-${m}-${y}`;
  };

  const toIsoFormat = (display) => {
    // display: DD-MM-YYYY -> YYYY-MM-DD
    if (!display) return '';
    const [d, m, y] = display.split('-');
    if (!y || !m || !d) return display;
    return `${y}-${m}-${d}`;
  };

  const handleHiddenDateChange = (e) => {
    const iso = e.target.value; // YYYY-MM-DD
    const formatted = toDisplayFormat(iso);
    // Parent expects event with target.value
    onChange && onChange({ target: { value: formatted } });
  };

  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <InputContainer>
        <StyledTextField
          fullWidth
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          variant="outlined"
          // When user clicks into the text, open picker for convenience
          onClick={openNativeDatePicker}
        />
        {/* Hidden native date input to trigger the OS picker */}
        <input
          ref={hiddenDateInputRef}
          type="date"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
          // Keep the hidden input roughly in sync for better UX if needed
          value={toIsoFormat(value)}
          onChange={handleHiddenDateChange}
          tabIndex={-1}
          aria-hidden="true"
        />
        <CalendarButton onClick={openNativeDatePicker}>
          <CalendarIcon width={17} height={19} color="#0B91D6" />
        </CalendarButton>
      </InputContainer>
    </FieldContainer>
  );
};

export default DatePickerField;