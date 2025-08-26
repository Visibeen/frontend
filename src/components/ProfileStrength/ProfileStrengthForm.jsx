import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Paper, Divider, IconButton, TextField, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapConfigurationSection from './MapConfigurationSection';
import ScheduleSection from './ScheduleSection';
import EditIcon from '../icons/EditIcon';

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const AccountSectionContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  padding: '26px 30px',
  backgroundColor: '#ffffff',
  boxShadow: 'none'
}));

const AccountRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  alignItems: 'flex-start'
}));

const AccountColumn = styled(Stack)(({ theme }) => ({
  gap: '6px',
  flex: 1
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
  height: '95px',
  width: '1px',
  backgroundColor: '#F6F0F0'
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '160px',
  height: '48px',
  textTransform: 'capitalize',
  padding: '12px 24px',
  borderRadius: '8px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const ProfileStrengthForm = ({ formData, onFormChange, onContinue }) => {
  const [keywordDialogOpen, setKeywordDialogOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState(
    (formData?.selectedKeywords ? String(formData.selectedKeywords).split(',').map(k => k.trim()).filter(Boolean) : [])
  );

  const openKeywordDialog = () => {
    // Sync chips from current value on open
    const list = (formData?.selectedKeywords ? String(formData.selectedKeywords).split(',').map(k => k.trim()).filter(Boolean) : []);
    setKeywords(list);
    setKeywordInput('');
    setKeywordDialogOpen(true);
  };

  const closeKeywordDialog = () => {
    setKeywordDialogOpen(false);
  };

  const addKeyword = () => {
    const val = keywordInput.trim();
    if (!val) return;
    if (!keywords.includes(val)) setKeywords(prev => [...prev, val]);
    setKeywordInput('');
  };

  const removeKeyword = (k) => {
    setKeywords(prev => prev.filter(x => x !== k));
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const saveKeywords = () => {
    const value = keywords.join(', ');
    if (typeof onFormChange === 'function') {
      onFormChange('selectedKeywords', value);
    }
    setKeywordDialogOpen(false);
  };

  return (
    <FormContainer>
      {/* Account Selection Section */}
      <AccountSectionContainer>
        <AccountRow>
          <AccountColumn>
            <FieldLabel>Select Account*</FieldLabel>
            <FieldValue>{formData.selectedAccount}</FieldValue>
          </AccountColumn>
          
          <VerticalDivider orientation="vertical" />
          
          <AccountColumn>
            <FieldLabel>Selected Keyword*</FieldLabel>
            <Stack direction="row" spacing={1} alignItems="center">
              <FieldValue>{formData.selectedKeywords}</FieldValue>
              <Tooltip title="Edit keyword(s)">
                <IconButton size="small" onClick={openKeywordDialog} sx={{ p: 0.5 }}>
                  <EditIcon width={16} height={16} />
                </IconButton>
              </Tooltip>
            </Stack>
          </AccountColumn>
          
          <VerticalDivider orientation="vertical" />
          
          <AccountColumn>
            <FieldLabel>Location*</FieldLabel>
            <FieldValue sx={{ whiteSpace: 'pre-line' }}>
              {formData.location}
            </FieldValue>
          </AccountColumn>
        </AccountRow>
      </AccountSectionContainer>

      {/* Keyword Editor Dialog */}
      <Dialog open={keywordDialogOpen} onClose={closeKeywordDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Keywords</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Add keyword"
              placeholder="Type a keyword and press Enter"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              size="small"
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {keywords.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No keywords yet. Add one above.</Typography>
              ) : (
                keywords.map(k => (
                  <Chip key={k} label={k} onDelete={() => removeKeyword(k)} sx={{ mb: 1 }} />
                ))
              )}
            </Stack>
            <Box>
              <Button variant="outlined" size="small" onClick={addKeyword}>Add</Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeKeywordDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveKeywords}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Map Configuration Section */}
      <MapConfigurationSection 
        formData={formData}
        onFormChange={onFormChange}
      />

      {/* Schedule Section */}
      <ScheduleSection 
        formData={formData}
        onFormChange={onFormChange}
      />

      {/* Continue Button */}
      <ContinueButton onClick={onContinue}>
        Continue
      </ContinueButton>
    </FormContainer>
  );
};

export default ProfileStrengthForm;