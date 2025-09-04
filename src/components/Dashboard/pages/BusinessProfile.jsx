import React, { useState, useEffect, useCallback } from 'react';
import { Box, Stack, Typography, Button, Paper, Rating, LinearProgress, Chip, CircularProgress, Alert, Menu, MenuItem, ListItemText, ListItemIcon, Divider, Modal, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Input, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import GMBService from '../../../services/GMBService';
import GMBNotificationService from '../../../services/GMBNotificationService';
import LocationIcon from '../../icons/LocationIcon';
import VerifiedCheckIcon from '../../icons/VerifiedCheckIcon';
import StarRatingIcon from '../../icons/StarRatingIcon';
import AddPhotoIcon from '../../icons/AddPhotoIcon';
import VideoIcon from '../../icons/VideoIcon';
import WebsiteGlobeIcon from '../../icons/WebsiteGlobeIcon';
import DirectionsIcon from '../../icons/DirectionsIcon';
import ShareIcon from '../../icons/ShareIcon';
import FacebookIcon from '../../icons/FacebookIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import WhatsAppIcon from '../../icons/WhatsAppIcon';
import QRCodeIcon from '../../icons/QRCodeIcon';
import SwitchAccountIcon from '../../icons/SwitchAccountIcon';
import ProfileGaugeIcon from '../../icons/ProfileGaugeIcon';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  minHeight: '100vh',
  padding: '0'
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: '0 40px 40px 40px'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '36px'
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6',
  margin: 0
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  margin: 0
}));

const HeaderLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  color: '#0B91D6',
  cursor: 'pointer',
  textDecoration: 'underline',
  width: 'fit-content'
}));

const SwitchAccountButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: "150px",
  height: "45px",
  padding: '12px 16px',
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.15)'
  }
}));

const MainGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 320px',
  gap: '36px',
  marginBottom: '26px'
}));

const BusinessProfileCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  padding: '40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none'
}));

const BusinessTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  color: '#121927',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}));

const VerifiedBadge = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const EditProfileLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6',
  cursor: 'pointer',
  textDecoration: 'underline',
  '&:hover': {
    opacity: 0.8
  }
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  margin: '8px 0 0 0',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px'
}));

const ReviewsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginTop: '8px'
}));

const ReviewsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ReviewsRating = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ContactGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  marginTop: '10px'
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}));

const ContactLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const ContactValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const HoursText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927',
  marginTop: '10px'
}));

const HoursValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  marginTop: '10px'
}));

const PhotosSection = styled(Box)(({ theme }) => ({
  marginTop: '18px'
}));

const PhotosTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '18px'
}));

const PhotosGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center'
}));

const CoverPhotoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '18px',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9
  }
}));

const CoverPhotoLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#ffffff',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif'
}));

const PhotoItem = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '133px',
  borderRadius: '12px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const AddPhotoButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '23px',
  width: '120px',
  height: '133px',
  cursor: 'pointer'
}));

const AddPhotoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6'
}));

// Video Section Styles
const VideosSection = styled(Box)(({ theme }) => ({
  marginTop: '18px'
}));

const VideosTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '18px'
}));

const VideosGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center'
}));

const VideoItem = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '133px',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: '#f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#e5e7eb'
  }
}));

const VideoDuration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#ffffff',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif'
}));

const VideoThumbnail = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const VideoPlayButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'translate(-50%, -50%) scale(1.1)'
  }
}));

const AddVideoButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '23px',
  width: '120px',
  height: '133px',
  cursor: 'pointer',
  border: '2px dashed #d1d5db',
  borderRadius: '12px',
  '&:hover': {
    borderColor: '#0B91D6',
    backgroundColor: '#f8f9fa'
  }
}));

const AddVideoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const ActionsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginTop: '18px',
  flexWrap: 'nowrap',
  overflowX: 'auto'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 16px',
  borderRadius: '4px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
}));

const ActionSubtext = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#0B91D6'
}));

const AppointmentsSection = styled(Box)(({ theme }) => ({
  marginTop: '10px'
}));

const AppointmentsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const AppointmentsValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  marginTop: '10px'
}));

// Products and Services Section Styles
const ProductsServicesSection = styled(Box)(({ theme }) => ({
  marginTop: '24px',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb'
}));

const ProductsServicesTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '20px'
}));

const TabButton = styled(Button)(({ theme, active }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: active ? '#0B91D6' : '#6b7280',
  textTransform: 'none',
  padding: '8px 16px',
  marginRight: '24px',
  borderBottom: active ? '2px solid #0B91D6' : '2px solid transparent',
  borderRadius: 0,
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#0B91D6'
  }
}));

const ProductsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
  marginTop: '16px'
}));

const ProductCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '120px',
  objectFit: 'cover',
  backgroundColor: '#f3f4f6'
}));

const ProductContent = styled(Box)(({ theme }) => ({
  padding: '12px'
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927',
  marginBottom: '4px'
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const ProductsViewAllButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6',
  textTransform: 'none',
  padding: '8px 16px',
  border: '1px solid #0B91D6',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  marginTop: '16px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#0B91D6',
    color: '#ffffff'
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px'
}));

// Modal Styles
const ModalContainer = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '800px',
  width: '100%',
  maxHeight: '80vh',
  overflow: 'auto',
  outline: 'none',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  paddingBottom: '16px',
  borderBottom: '1px solid #e5e7eb'
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: '#6b7280',
  '&:hover': {
    backgroundColor: '#f3f4f6',
    color: '#121927'
  }
}));

const ModalProductsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px'
}));

const ProfileStrengthCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  padding: '41px 20px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '105px'
}));

const StrengthTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#30302E',
  textAlign: 'center'
}));

const GaugeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
}));

const ScoreText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  color: '#000000'
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%'
}));

const BoostButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '12px 16px',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const ScoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#0B91D6',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  textTransform: 'capitalize',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

const CompetitorButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#34A853',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0',
  textTransform: 'capitalize',
  textDecoration: 'underline',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const ActionCenterCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '21px'
}));

const TasksGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '21px',
  marginBottom: '21px'
}));

const TaskCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '12px',
  border: '1px solid #f0f0f0',
  borderRadius: '8px'
}));

const TaskLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const TaskStatus = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center'
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '8px 16px',
  textTransform: 'capitalize',
  margin: '0 auto',
  display: 'block',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const PerformanceGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px'
}));

const PerformanceCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none'
}));

const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '14px',
  marginBottom: '12px'
}));

const MetricCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '16px',
  border: '1px solid #f0f0f0'
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '14px'
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '18px'
}));

const MetricChange = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}));

const FeedSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '11.22px'
}));

const FeedItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5.28px',
  paddingBottom: '11.22px',
  borderBottom: '0.33px solid #F6F0F0'
}));

const FeedHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5.28px'
}));

const FeedTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#121927'
}));

const FeedDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#121927',
  lineHeight: '18px'
}));

const ViewDetailsButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '4px',
  padding: '8px 16px',
  textTransform: 'capitalize',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const ReviewsCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const ReviewsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '320px 1fr',
  gap: '32px',
  marginBottom: '44px'
}));

const ReviewsLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px'
}));

const ReviewsScore = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#121927'
}));

const ReviewsRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '17px'
}));

const RatingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}));

const RatingLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  minWidth: '24px'
}));

const RatingBar = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '8px',
  backgroundColor: '#E5E7EB',
  borderRadius: '4px',
  overflow: 'hidden'
}));

const RatingFill = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#34A853',
  borderRadius: '4px'
}));

const RatingCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  minWidth: '80px',
  textAlign: 'right'
}));

const ReviewsStatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  gap: '44px',
  alignItems: 'center'
}));

const ReviewsStat = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px'
}));

const ReviewsStatValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const ReviewsStatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const StatsDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '103px',
  backgroundColor: '#A0A0AA'
}));

const FeedCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: '26px 40px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  marginBottom: '26px'
}));

const FeedGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '19px',
  marginBottom: '19px'
}));

const FeedCardItem = styled(Box)(({ theme }) => ({
  borderRadius: '14px 14px 0px 0px',
  overflow: 'hidden',
  backgroundColor: '#ffffff'
}));

const FeedImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover'
}));

const FeedContent = styled(Box)(({ theme }) => ({
  padding: '12px 16px'
}));

const FeedDate = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#A0A0AA',
  marginBottom: '8px'
}));

const FeedText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#121927',
  lineHeight: '18px'
}));

// Mock data
const mockTasks = [
  { label: 'Filler text is', status: '60% completed', color: '#34A853' },
  { label: 'Filler text is', status: '23% completed', color: '#EF232A' },
  { label: 'Filler text is', status: 'Not Started Yet', color: '#A0A0AA' },
  { label: 'Filler text is', status: '100% completed', color: '#34A853' },
  { label: 'Filler text is', status: '23% completed', color: '#EF232A' }
];

// Function to format numbers with commas
const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return num.toLocaleString();
};

// Function to get metrics data (real or fallback)
const getMetricsData = (performanceData) => {
  if (!performanceData) {
    // Fallback mock data if API fails
    return [
      { label: 'Local Views (Last 30 days)', value: '2,300', change: '+35% vs last month', color: '#34A853' },
      { label: 'Calls from GBP (Last 30 days)', value: '156', change: '+12% vs last month', color: '#34A853' },
      { label: 'Direction Requests (Last 30 days)', value: '89', change: '+8% vs last month', color: '#34A853' },
      { label: 'Website Clicks (Last 30 days)', value: '234', change: '+18% vs last month', color: '#34A853' }
    ];
  }

  return [
    {
      label: 'Local Views (Last 30 days)',
      value: formatNumber(performanceData.localViews),
      change: `${performanceData.localViewsChange >= 0 ? '+' : ''}${performanceData.localViewsChange}% vs last period`,
      color: '#34A853'
    },
    {
      label: 'Calls from GBP (Last 30 days)',
      value: formatNumber(performanceData.callClicks),
      change: `${performanceData.callClicksChange >= 0 ? '+' : ''}${performanceData.callClicksChange}% vs last period`,
      color: '#34A853'
    },
    {
      label: 'Direction Requests (Last 30 days)',
      value: formatNumber(performanceData.directionRequests),
      change: `${performanceData.directionRequestsChange >= 0 ? '+' : ''}${performanceData.directionRequestsChange}% vs last period`,
      color: '#34A853'
    },
    {
      label: 'Website Clicks (Last 30 days)',
      value: formatNumber(performanceData.websiteClicks),
      change: `${performanceData.websiteClicksChange >= 0 ? '+' : ''}${performanceData.websiteClicksChange}% vs last period`,
      color: '#34A853'
    }
  ];
};

const mockFeedItems = [
  { icon: 'check', title: 'Profile changes saved!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'photo', title: 'New photos have been added to your GMB profile.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'review', title: 'New review received.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { icon: 'review-red', title: 'New review received.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqu' }
];

// Replaced by real GMB media fetched from API

// Image helpers: try proxy when available to avoid CORS/hotlink issues
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const buildProxyUrl = (src) => {
  if (!API_BASE_URL) return null;
  const base = API_BASE_URL.replace(/\/$/, '');
  // Assuming backend has /proxy/image?url=
  return `${base}/proxy/image?url=${encodeURIComponent(src)}`;
};

const placeholderSmall = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEzMyIgdmlld0JveD0iMCAwIDEyMCAxMzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTMzIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg4MFY5M0g0MFY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
const placeholderLarge = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTQwSDgwVjYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';

const mockSocialFeed = [
  { image: '/images/social-feed-1.jpg', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' },
  { image: '/images/social-feed-2.png', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' },
  { image: '/images/social-feed-3.png', date: 'Posted on - 26 june 2025', text: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts.' }
];

const BusinessProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Photo popup state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // { original, proxy }

  // Video state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUploadOpen, setVideoUploadOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosRefreshing, setVideosRefreshing] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState('');
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);

  const [currentAccount, setCurrentAccount] = useState(null);
  const [verificationState, setVerificationState] = useState({
    loading: true,
    error: null,
    simplified: 'unknown',
    raw: null,
    isVerified: false,
  });

  // Get locationId from URL params early
  const locationId = searchParams.get('id');

  // State for managing expanded views
  // Handlers for photo modal
  const handlePhotoClick = (originalSrc, proxied) => {
    if (!originalSrc && !proxied) return;
    setSelectedPhoto({ original: originalSrc || '', proxy: proxied || '' });
    setPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalOpen(false);
    setSelectedPhoto(null);
  };

  // Video handlers
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const handleVideoUpload = () => {
    setVideoUploadOpen(true);
  };

  const uploadVideoToGMB = async (file) => {
    try {
      setVideoUploading(true);
      setVideoUploadError('');

      const accessToken = await GMBService.getAccessToken();
      const accountId = currentAccount?.name?.split('/').pop();

      if (!accountId || !locationId) {
        throw new Error('Missing account or location information');
      }

      // Validate file size (100MB limit)
      if (file.size > 75 * 1024 * 1024) {
        throw new Error('Video file size must be less than 75MB');
      }

      // Validate file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Please select a valid video file (MP4, MOV, or AVI)');
      }

      console.log('Uploading video to GMB:', file.name, file.size, file.type);

      // Upload video to GMB using the service
      const result = await GMBService.uploadVideo(accessToken, accountId, locationId, file);

      console.log('Video uploaded successfully:', result);

      // Refresh videos list from GMB
      await refreshVideos();

      setVideoUploadSuccess(true);
      setVideoUploadOpen(false);

      // Clear success message after 3 seconds
      setTimeout(() => setVideoUploadSuccess(false), 3000);

      return result;
    } catch (error) {
      console.error('Error uploading video:', error);
      setVideoUploadError(error.message);
      throw error;
    } finally {
      setVideoUploading(false);
    }
  };

  const refreshVideos = useCallback(async () => {
    try {
      setVideosRefreshing(true);
      const accessToken = await GMBService.getAccessToken();
      const accountId = currentAccount?.name?.split('/').pop();

      if (!accountId || !locationId) {
        console.warn('Cannot refresh videos: missing account or location');
        return;
      }

      const updatedVideos = await GMBService.getMedia(accessToken, accountId, locationId);
      const videos = updatedVideos.filter(i => i.mediaFormat === 'VIDEO' && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));

      const processedVideos = videos.map(video => ({
        id: video.name?.split('/').pop() || Math.random().toString(),
        name: video.description || 'Business Video',
        url: video.googleUrl || video.sourceUrl || video.thumbnailUrl,
        thumbnail: video.thumbnailUrl || video.googleUrl || video.sourceUrl,
        duration: video.duration || '00:00',
        uploadDate: video.createTime || new Date().toISOString()
      }));

      setVideos(processedVideos);
      console.log('Videos refreshed:', processedVideos.length);
    } catch (error) {
      console.error('Error refreshing videos:', error);
    } finally {
      setVideosRefreshing(false);
    }
  }, [currentAccount, locationId]);

  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showPerformanceDetails, setShowPerformanceDetails] = useState(false);
  const [showFeedDetails, setShowFeedDetails] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllGMBFeed, setShowAllGMBFeed] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  const [showAllSocialFeed, setShowAllSocialFeed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [localPosts, setLocalPosts] = useState([]);
  const [localPostsLoading, setLocalPostsLoading] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrProviderIndex, setQrProviderIndex] = useState(0);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [productsModalOpen, setProductsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);

  const open = Boolean(anchorEl);

  // Mock data for products and services
  const mockProducts = [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      price: '$20',
      image: '/api/placeholder/200/120'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor',
      price: '$20',
      image: '/api/placeholder/200/120'
    },
    {
      id: 3,
      title: 'Product Three',
      price: '$25',
      image: '/api/placeholder/200/120'
    },
    {
      id: 4,
      title: 'Product Four',
      price: '$30',
      image: '/api/placeholder/200/120'
    },
    {
      id: 5,
      title: 'Product Five',
      price: '$15',
      image: '/api/placeholder/200/120'
    },
    {
      id: 6,
      title: 'Product Six',
      price: '$35',
      image: '/api/placeholder/200/120'
    }
  ];

  const mockServices = [
    {
      id: 1,
      title: 'Consultation Service',
      price: '$50',
      image: '/api/placeholder/200/120'
    },
    {
      id: 2,
      title: 'Premium Service',
      price: '$100',
      image: '/api/placeholder/200/120'
    },
    {
      id: 3,
      title: 'Basic Service',
      price: '$30',
      image: '/api/placeholder/200/120'
    },
    {
      id: 4,
      title: 'Advanced Service',
      price: '$150',
      image: '/api/placeholder/200/120'
    },
    {
      id: 5,
      title: 'Express Service',
      price: '$75',
      image: '/api/placeholder/200/120'
    }
  ];

  // Notification handler
  const handleNotifications = useCallback((newNotifications, allNotifications) => {
    console.log('Received notifications:', newNotifications.length, 'new,', allNotifications.length, 'total');
    setNotifications(allNotifications);
    if (newNotifications.length > 0) {
      setNewNotificationCount(prev => prev + newNotifications.length);
    }
  }, []);

  // Fetch local posts for GMB Feed
  const fetchLocalPosts = useCallback(async () => {
    console.log('[BusinessProfile] fetchLocalPosts called with locationId:', locationId);
    if (!locationId) {
      console.log('[BusinessProfile] No locationId, returning early');
      return;
    }

    setLocalPostsLoading(true);
    try {
      // Direct API call without using notification service for account detection
      const accessToken = await GMBService.getAccessToken();
      console.log('[BusinessProfile] Got access token, fetching accounts...');

      const accounts = await GMBService.getAccounts(accessToken);
      console.log('[BusinessProfile] Available accounts:', accounts);

      let foundAccountId = null;

      // Search through accounts to find the one that owns this location
      for (const account of accounts) {
        try {
          const locations = await GMBService.getLocations(accessToken, account.name);
          const matchingLocation = locations.find(loc => {
            const locId = loc.name?.split('/').pop();
            return locId === locationId;
          });

          if (matchingLocation) {
            foundAccountId = account.name.split('/').pop();
            console.log('[BusinessProfile] Found account for location:', foundAccountId);
            break;
          }
        } catch (err) {
          console.warn('[BusinessProfile] Error checking account:', account.name, err);
        }
      }

      if (foundAccountId) {
        console.log('[BusinessProfile] Fetching local posts for account:', foundAccountId, 'location:', locationId);
        const posts = await GMBService.getLocalPosts(accessToken, foundAccountId, locationId);
        console.log('[BusinessProfile] Local posts API response:', posts);
        console.log('[BusinessProfile] Setting localPosts state with:', posts?.length || 0, 'posts');
        setLocalPosts(posts || []);
      } else {
        console.warn('[BusinessProfile] No account found that owns location:', locationId);
        setLocalPosts([]);
      }
    } catch (error) {
      console.error('[BusinessProfile] Error fetching local posts:', error);
      setLocalPosts([]);
    } finally {
      setLocalPostsLoading(false);
    }
  }, [locationId]);

  // Start notification polling when component mounts
  useEffect(() => {
    if (locationId) {
      const startNotifications = async () => {
        try {
          setNotificationLoading(true);
          const accessToken = await GMBService.getAccessToken();

          // Add notification listener
          GMBNotificationService.addListener(handleNotifications);

          // Get initial notifications
          const initialNotifications = await GMBNotificationService.getRecentNotifications(accessToken, locationId);
          setNotifications(initialNotifications);

          // Start polling for new notifications (every 5 minutes)
          GMBNotificationService.startPolling(accessToken, locationId, 300000);

          console.log('Notification system started for location:', locationId);
        } catch (error) {
          console.error('Error starting notification system:', error);
        } finally {
          setNotificationLoading(false);
        }
      };

      // Fetch local posts for GMB Feed
      console.log('[BusinessProfile] About to call fetchLocalPosts for locationId:', locationId);
      fetchLocalPosts();

      startNotifications();
    }

    // Cleanup on unmount
    return () => {
      GMBNotificationService.removeListener(handleNotifications);
      GMBNotificationService.stopPolling();
    };
  }, [locationId, handleNotifications, fetchLocalPosts]);

  // Fetch products and services from GMB API
  const fetchProductsAndServices = async () => {
    if (!locationId) return;

    try {
      const accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');

      // Fetch products
      setProductsLoading(true);
      try {
        console.log('[BusinessProfile] Fetching products for location:', locationId);
        const productsData = await GMBService.getProducts(locationId, accessToken);
        console.log('[BusinessProfile] Products fetched:', productsData);

        // Transform API data to match our component structure
        const transformedProducts = productsData.map((product, index) => ({
          id: product.name?.split('/').pop() || index + 1,
          title: product.productId || product.name || `Product ${index + 1}`,
          price: product.price?.amount ? `$${product.price.amount}` : 'Price on request',
          image: product.media?.[0]?.sourceUrl || '/api/placeholder/200/120',
          description: product.description || ''
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.warn('Error fetching products:', error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }

      // Fetch services
      setServicesLoading(true);
      try {
        console.log('[BusinessProfile] Fetching services for location:', locationId);
        const servicesData = await GMBService.getServices(locationId, accessToken);
        console.log('[BusinessProfile] Services fetched:', servicesData);

        // Transform API data to match our component structure
        const transformedServices = servicesData.map((service, index) => ({
          id: service.name?.split('/').pop() || index + 1,
          title: service.serviceId || service.name || `Service ${index + 1}`,
          price: service.price?.amount ? `$${service.price.amount}` : 'Price on request',
          image: service.media?.[0]?.sourceUrl || '/api/placeholder/200/120',
          description: service.description || ''
        }));

        setServices(transformedServices);
      } catch (error) {
        console.warn('Error fetching services:', error);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }

    } catch (error) {
      console.error('Error fetching products and services:', error);
      setProductsLoading(false);
      setServicesLoading(false);
    }
  };

  const fetchAvailableProfiles = async () => {
    setProfilesLoading(true);
    try {
      const accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
      console.log('[Switch Account] Starting to fetch profiles...');
      const accounts = await GMBService.getAccounts(accessToken);
      console.log('[Switch Account] Found accounts:', accounts.length);

      if (accounts.length === 0) {
        setAvailableProfiles([]);
        return;
      }

      // Fetch locations for ALL accounts (same as dashboard logic)
      const allLocations = [];
      for (const acct of accounts) {
        try {
          if (!acct?.name) continue;
          console.log('[Switch Account] Fetching locations for account:', acct.name);
          const locs = await GMBService.getLocations(accessToken, acct.name);
          console.log('[Switch Account] Found locations for account:', acct.name, locs?.length || 0);
          if (Array.isArray(locs) && locs.length) {
            // Attach account context to each location
            locs.forEach(l => allLocations.push({ account: acct, loc: l }));
          }
        } catch (e) {
          console.warn('Failed to fetch locations for account', acct?.name, e?.message || e);
        }
      }
      console.log('[Switch Account] Total locations found:', allLocations.length);

      if (allLocations.length === 0) {
        // Fallback: present accounts as rows if no locations are returned (same as dashboard)
        const fallback = accounts.map((account) => {
          let mappedStatus = 'unverified';
          const verificationState = account.verificationState;
          if (verificationState === 'VERIFIED') mappedStatus = 'verified';
          else if (verificationState === 'PENDING_VERIFICATION' || verificationState === 'PENDING') mappedStatus = 'pending_verification';
          else if (verificationState === 'SUSPENDED') mappedStatus = 'suspended';

          return {
            id: account.name?.split('/').pop(),
            name: account.accountName || 'Business Account',
            address: 'Account level - no location data',
            status: mappedStatus,
            locationId: account.name?.split('/').pop(),
            isCurrentLocation: account.name?.split('/').pop() === locationId
          };
        });
        setAvailableProfiles(fallback);
        return;
      }

      // Normalize locations to same format as dashboard
      const normalized = await Promise.all(allLocations.map(async ({ account, loc }) => {
        const id = loc.name?.split('/').pop();
        const address = loc.storefrontAddress?.addressLines?.join(', ') ||
          loc.storefrontAddress?.locality ||
          loc.storefrontAddress?.administrativeArea ||
          'Address not available';

        // Fetch verification via VoiceOfMerchantState API (same as dashboard)
        let simplifiedStatus = 'unknown';
        let hasVOM = false;
        try {
          const vom = await GMBService.getVoiceOfMerchantState(id, accessToken);
          simplifiedStatus = vom?.simplifiedStatus || 'unknown';
          hasVOM = vom?.raw?.hasVoiceOfMerchant === true;
        } catch (e) {
          console.warn('VOM fetch failed for', id, e?.message || e);
        }

        // Map to UI status (same logic as dashboard)
        const status = (
          (hasVOM || simplifiedStatus === 'verified') ? 'verified' :
            simplifiedStatus === 'suspended' ? 'suspended' :
              simplifiedStatus === 'pending_verification' ? 'pending_verification' :
                'unverified'
        );

        return {
          id,
          name: loc.title || account?.accountName || 'Business Location',
          address,
          status,
          locationId: id,
          isCurrentLocation: id === locationId
        };
      }));

      console.log('[Switch Account] Final normalized profiles:', normalized);
      setAvailableProfiles(normalized);
    } catch (err) {
      console.error('Error fetching available profiles:', err);
    } finally {
      setProfilesLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!locationId) {
        setError('No location ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // First get accounts directly from Google API (token managed by GMBService)
        const accounts = await GMBService.getAccounts();

        if (accounts.length === 0) {
          setError('No GMB accounts found');
          setLoading(false);
          return;
        }

        // Find the account by ID or use the first one
        const targetAccount = accounts.find(acc =>
          acc.name.includes(locationId)
        ) || accounts[0];

        const accountId = targetAccount.name.split('/')[1];

        // Fetch locations for this account directly from Google API
        const locations = await GMBService.getLocations(undefined, targetAccount.name);

        if (locations.length === 0) {
          setError('No locations found for this account');
          setLoading(false);
          return;
        }

        // Find the specific location by ID or use the first one
        const targetLocation = locations.find(loc =>
          loc.name.includes(locationId) ||
          loc.name.split('/').pop() === locationId
        ) || locations[0];

        // Add review count to location data if available from GMB locations API
        if (targetLocation && !targetLocation.reviewCount && !targetLocation.profile?.reviewCount) {
          // The location from GMB locations API might not have review count, we'll get it from reviews API
          console.log('Location data missing review count, will rely on reviews API');
        }
        setLocationData(targetLocation);
        setCurrentAccount(targetAccount);

        // Store all available accounts for profile switching (same as dashboard)
        const allProfiles = accounts.map((account) => {
          // Map GMB verification states to our status format
          let mappedStatus = 'unverified';
          const verificationState = account.verificationState;

          if (verificationState === 'VERIFIED') {
            mappedStatus = 'verified';
          } else if (verificationState === 'PENDING_VERIFICATION' || verificationState === 'PENDING') {
            mappedStatus = 'pending_verification';
          } else if (verificationState === 'SUSPENDED') {
            mappedStatus = 'suspended';
          } else if (verificationState === 'UNVERIFIED' || !verificationState) {
            mappedStatus = 'unverified';
          }

          return {
            id: account.name?.split('/').pop(),
            name: account.accountName || 'Business Account',
            address: 'Account level - no location data',
            status: mappedStatus,
            optimizationScore: account.vettedState || 'N/A',
            locationId: account.name?.split('/').pop(),
            accountType: account.type || 'UNKNOWN',
            verificationState: account.verificationState || 'UNKNOWN',
            vettedState: account.vettedState || 'UNKNOWN',
            isCurrentLocation: account.name?.split('/').pop() === locationId
          };
        });
        setAvailableProfiles(allProfiles);

        // Extract the location ID once for downstream calls
        const actualLocationId = targetLocation.name.split('/').pop();

        // Fetch VoiceOfMerchantState for verification status
        try {
          console.log('[BusinessProfile] Fetching VoiceOfMerchantState for location:', actualLocationId);
          const { raw, simplifiedStatus } = await GMBService.getVoiceOfMerchantState(actualLocationId);
          const hasVOM = raw?.hasVoiceOfMerchant === true;
          const hasBA = raw?.hasBusinessAuthority === true;
          // Only treat hasVoiceOfMerchant OR explicit 'verified' as verified
          const derivedVerified = hasVOM || simplifiedStatus === 'verified';
          setVerificationState({
            loading: false,
            error: null,
            simplified: simplifiedStatus || 'unknown',
            raw,
            isVerified: derivedVerified,
          });
          console.log('[BusinessProfile] VoiceOfMerchantState result:', { simplifiedStatus, hasVOM, hasBA, derivedVerified, raw });
        } catch (vomErr) {
          console.warn('[BusinessProfile] Error fetching VoiceOfMerchantState:', vomErr);
          setVerificationState((prev) => ({
            ...prev,
            loading: false,
            error: vomErr?.message || 'Failed to fetch VoiceOfMerchantState',
          }));
        }

        // Fetch reviews data for this location directly
        try {
          const reviews = await GMBService.getReviews(undefined, targetAccount.name, targetLocation.name);
          setReviewsData(reviews);
          console.log('Reviews data fetched successfully:', { count: reviews.length });
        } catch (reviewsError) {
          console.warn('Error fetching reviews:', reviewsError);
          setReviewsData({ reviews: [] });
        }

        // Fetch media (photos and videos) for this location directly
        try {
          console.log('Fetching media for account/location:', accountId, actualLocationId);
          let items = await GMBService.getMedia(undefined, accountId, actualLocationId);

          // Separate videos from photos
          const videos = items.filter(i => i.mediaFormat === 'VIDEO' && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));
          const photos = items.filter(i => (i.mediaFormat === 'PHOTO' || !i.mediaFormat) && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));

          // Process videos
          const processedVideos = videos.map(video => ({
            id: video.name?.split('/').pop() || Math.random().toString(),
            name: video.description || 'Business Video',
            url: video.googleUrl || video.sourceUrl || video.thumbnailUrl,
            thumbnail: video.thumbnailUrl || video.googleUrl || video.sourceUrl,
            duration: video.duration || '00:00',
            uploadDate: video.createTime || new Date().toISOString()
          }));

          setVideos(processedVideos);
          console.log('Videos fetched:', processedVideos.length);

          // Process photos - separate cover photos from regular photos
          const coverPhotos = photos.filter(i => i.category === 'COVER' || i.category === 'PROFILE');
          const regularPhotos = photos.filter(i => i.category !== 'COVER' && i.category !== 'PROFILE');

          // Sort by createTime desc if present
          const sortByTime = (a, b) => {
            const ta = a.createTime ? Date.parse(a.createTime) : 0;
            const tb = b.createTime ? Date.parse(b.createTime) : 0;
            return tb - ta;
          };

          coverPhotos.sort(sortByTime);
          regularPhotos.sort(sortByTime);

          // Combine with cover photos first
          const sortedItems = [...coverPhotos, ...regularPhotos];

          console.log('Media items (photos) after filter/sort:', sortedItems.length, 'Cover photos:', coverPhotos.length);
          setMediaItems(sortedItems);
        } catch (mediaErr) {
          console.warn('Error fetching media:', mediaErr);
          setMediaItems([]);
          setVideos([]);
        }

        // Fetch performance metrics for this location
        try {
          console.log('Fetching performance metrics for location:', actualLocationId);
          const metrics = await GMBService.getPerformanceMetrics(undefined, actualLocationId);
          console.log('Performance metrics fetched successfully:', metrics);
          setPerformanceData(metrics);
        } catch (performanceErr) {
          console.warn('Error fetching performance metrics:', performanceErr);
          setPerformanceData(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error in main data fetch:', error);
        setError('Failed to load business profile data');
        setLoading(false);
      }
    };

    fetchLocationData();

    // Fetch available profiles for the dropdown
    fetchAvailableProfiles();

    // Fetch products and services
    fetchProductsAndServices();
  }, [locationId]);

  if (loading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <ContentWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <CircularProgress />
            </Box>
          </ContentWrapper>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageContainer>
          <ContentWrapper>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </ContentWrapper>
        </PageContainer>
      </DashboardLayout>
    );
  }

  // Extract data from the location object
  const businessTitle = locationData?.title || 'Business Name';
  const businessAddress = locationData?.storefrontAddress ?
    `${locationData.storefrontAddress.addressLines?.join(', ') || ''}, ${locationData.storefrontAddress.locality || ''}, ${locationData.storefrontAddress.administrativeArea || ''} ${locationData.storefrontAddress.postalCode || ''}`.trim() :
    'Address not available';
  const primaryPhone = locationData?.phoneNumbers?.primaryPhone || 'Not available';
  const websiteUrl = locationData?.websiteUri || 'Not available';
  const createMapsUrl = () => {
    const placeId = locationData?.metadata?.placeId || locationData?.placeId || '';
    if (placeId && String(placeId).trim()) {
      return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    }
    const encodedAddress = encodeURIComponent(businessAddress || '');
    return encodedAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      : '';
  };
  const mapsUri = createMapsUrl();
  const isVerified = verificationState.isVerified;

  const currentPlaceId = locationData?.metadata?.placeId || locationData?.placeId || '';
  const goToHeatmap = () => {
    const qs = new URLSearchParams();
    if (businessTitle) qs.set('businessName', businessTitle);
    if (currentPlaceId) qs.set('placeId', currentPlaceId);
    if (businessAddress) qs.set('address', businessAddress);
    navigate(`/profile-strength?${qs.toString()}`);
  };

  // Build review link for QR code with robust fallbacks
  const safeReviewLink = (() => {
    // if (currentPlaceId) {
    //   return `https://search.google.com/local/writereview?placeid=${currentPlaceId}`;
    // }
    // if (mapsUri) {
    //   return mapsUri;
    // }
    const encodedAddress = encodeURIComponent(businessAddress || '');
    if (encodedAddress) {
      return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    }
    return '';
  })();

  const qrProviders = [
    (url) => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`,
    (url) => `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=220`
  ];
  const qrSrc = safeReviewLink ? qrProviders[qrProviderIndex](safeReviewLink) : ''
  const shareUrl = mapsUri || window.location.href;
  const shareText = `${businessTitle} on Google`;
  const openShareMenu = (event) => setShareAnchorEl(event.currentTarget);
  const closeShareMenu = () => setShareAnchorEl(null);
  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: businessTitle, text: shareText, url: shareUrl });
      } else {
        window.open(shareUrl, '_blank');
      }
    } catch (_) { }
    closeShareMenu();
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard');
    } catch (_) {
      // fallback
    }
    closeShareMenu();
  };
  const handleSharePlatform = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    let url = '';
    if (platform === 'whatsapp') url = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    if (platform === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    if (platform === 'twitter') url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    closeShareMenu();
  };

  // Calculate real reviews data - handle new GMBService format
  const reviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : (reviewsData?.reviews?.reviews || []);
  // Map Google's enum star ratings (e.g., 'FIVE') to numeric values
  const toNumericRating = (star) => {
    if (typeof star === 'number') return star;
    const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    const key = String(star || '').toUpperCase();
    return map[key] || 0;
  };
  const numericRatings = reviews.map(r => toNumericRating(r.starRating));

  // Get the actual total review count from the reviews API response
  const actualTotalFromAPI = reviewsData?.totalReviewCount || reviewsData?.total || null;

  // Since locationData comes from GMB locations API (not reviews API), it won't have totalReviewCount
  // We need to use the totalReviewCount from the reviews API response directly
  const totalReviews = actualTotalFromAPI || numericRatings.length;

  console.log('BusinessProfile totalReviews calculation:', {
    reviewsData: reviewsData,
    actualTotalFromAPI,
    arrayLength: numericRatings.length,
    finalTotalReviews: totalReviews
  });
  const averageRating = numericRatings.length > 0 ?
    numericRatings.reduce((sum, n) => sum + n, 0) / numericRatings.length : 0;

  // Calculate rating distribution - use actual review count for percentages but fetched reviews for counts
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = numericRatings.filter(n => Math.round(n) === rating).length;
    const percentage = numericRatings.length > 0 ? (count / numericRatings.length) * 100 : 0;
    return { rating, count, percentage };
  });

  // Get metrics data based on performance API response
  const metricsData = getMetricsData(performanceData);

  const handleProfileSwitch = (profile) => {
    navigate(`/business-profile?id=${profile.locationId}`);
    setAnchorEl(null);
  };

  // Handler functions for button clicks
  const handleViewAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };

  const handleViewPerformanceDetails = () => {
    setShowPerformanceDetails(!showPerformanceDetails);
  };

  const handleViewFeedDetails = () => {
    setShowFeedDetails(!showFeedDetails);
  };

  const handleEditProfile = () => {
    setEditProfileOpen(true);
  };

  const handlePhotoUpload = () => {
    setPhotoUploadOpen(true);
  };

  const uploadPhotoToGMB = async (file) => {
    try {
      const accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
      const accountId = currentAccount?.name?.split('/').pop();

      if (!accountId || !locationId) {
        throw new Error('Missing account or location information');
      }

      // Upload photo to GMB
      const result = await GMBService.uploadMedia(accessToken, accountId, locationId, file);
      console.log('Photo uploaded successfully:', result);

      // Refresh media items to show the new photo
      const items = await GMBService.getMedia(undefined, accountId, locationId);
      const filteredItems = items.filter(i => (i.mediaFormat === 'PHOTO' || !i.mediaFormat) && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));

      // Separate cover photos from regular photos
      const coverPhotos = filteredItems.filter(i => i.category === 'COVER' || i.category === 'PROFILE');
      const regularPhotos = filteredItems.filter(i => i.category !== 'COVER' && i.category !== 'PROFILE');

      const sortByTime = (a, b) => {
        const ta = a.createTime ? Date.parse(a.createTime) : 0;
        const tb = b.createTime ? Date.parse(b.createTime) : 0;
        return tb - ta;
      };

      coverPhotos.sort(sortByTime);
      regularPhotos.sort(sortByTime);

      const sortedItems = [...coverPhotos, ...regularPhotos];
      setMediaItems(sortedItems);

      return result;
    } catch (error) {
      console.error('Error uploading photo to GMB:', error);
      throw error;
    }
  };

  const handleViewAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleViewAllGMBFeed = () => {
    setShowAllGMBFeed(!showAllGMBFeed);
  };

  const handleViewAllSocialFeed = () => {
    setShowAllSocialFeed(!showAllSocialFeed);
  };

  const handleCompetitorAnalysis = () => {
    try {
      const placeId = locationData?.metadata?.placeId || locationData?.placeId || null;
      const latlng = locationData?.latlng || null;
      const explicitLatLng = (locationData?.latlng?.latitude != null && locationData?.latlng?.longitude != null)
        ? { lat: Number(locationData.latlng.latitude), lng: Number(locationData.latlng.longitude) }
        : null;
      const selectedLocationId = locationData?.name ? locationData.name.split('/').pop() : undefined;

      const acctPayload = {
        id: currentAccount?.name?.split('/').pop(),
        accountName: currentAccount?.accountName,
        verificationState: currentAccount?.verificationState,
        name: currentAccount?.name,
      };

      const businessPayload = {
        title: businessTitle,
        businessName: businessTitle,
        address: businessAddress,
        formattedAddress: businessAddress,
        locationId: selectedLocationId,
        placeId: placeId,
        place_id: placeId,
        latlng,
        name: locationData?.name,
      };

      const locationPayload = {
        ...locationData,
        placeId: placeId,
      };

      console.log('[BusinessProfile] Navigating to ProfileStrengthResults with:', {
        placeId,
        explicitLatLng,
        selectedLocationId,
        account: acctPayload?.id,
        businessTitle
      });

      navigate('/profile-strength-results', {
        state: {
          account: acctPayload,
          business: businessPayload,
          locationData: locationPayload,
          selectedLocation: locationPayload,
          explicitLatLng,
          keywords: [],
        },
      });
    } catch (e) {
      console.warn('Failed to navigate to Profile Strength Results:', e);
    }
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <ContentWrapper>
          {/* Page Header */}
          <PageHeader>
            <HeaderLeft>
              <HeaderTitle>Your Business Profile</HeaderTitle>
              <HeaderSubtitle>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.</HeaderSubtitle>
              <HeaderLink onClick={goToHeatmap}>Open Heatmap</HeaderLink>
            </HeaderLeft>
            <SwitchAccountButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <SwitchAccountIcon width={17} height={15} color="#121927" />
              Switch Profile
            </SwitchAccountButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  maxHeight: 400,
                  width: 320,
                  mt: 1,
                  borderRadius: '8px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#121927' }}>
                  Switch to Another Profile
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#6b7280', mt: 0.5 }}>
                  Select a business profile to view
                </Typography>
              </Box>
              {availableProfiles.length > 0 ? (
                availableProfiles.map((profile, index) => (
                  <MenuItem
                    key={`${profile.id}-${profile.locationId}`}
                    onClick={() => handleProfileSwitch(profile)}
                    disabled={profile.isCurrentLocation}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: profile.isCurrentLocation ? 'transparent' : '#f8f9fa'
                      },
                      opacity: profile.isCurrentLocation ? 0.6 : 1
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: profile.isCurrentLocation ? '#0B91D6' : '#e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {profile.isCurrentLocation && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: 'white'
                            }}
                          />
                        )}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#121927' }}>
                          {profile.name}
                          {profile.isCurrentLocation && (
                            <Typography component="span" sx={{ fontSize: '12px', color: '#0B91D6', ml: 1 }}>
                              (Current)
                            </Typography>
                          )}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                            {profile.address}
                          </Typography>
                          <Typography sx={{ fontSize: '11px', color: profile.status === 'verified' ? '#34A853' : profile.status === 'pending_verification' ? '#F59E0B' : '#EF4444', textTransform: 'capitalize' }}>
                            {profile.status.replace('_', ' ')}
                          </Typography>
                        </Box>
                      }
                    />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                        {profilesLoading ? 'Loading profiles...' : 'No other profiles available'}
                      </Typography>
                    }
                  />
                </MenuItem>
              )}
            </Menu>
          </PageHeader>

          {/* Main Grid - Business Profile + Profile Strength */}
          <MainGrid>
            <BusinessProfileCard>
              <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
                <DialogTitle>Review us on Google</DialogTitle>
                <DialogContent>
                  {qrSrc ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <img
                        src={qrSrc}
                        alt="Review QR"
                        width={220}
                        height={220}
                        onError={() => setQrProviderIndex((i) => (i + 1) % 2)}
                      />
                      {/* <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>{safeReviewLink}</Typography> */}
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: '14px' }}>Review link unavailable.</Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  {/* {safeReviewLink && (
                    <Button onClick={() => window.open(safeReviewLink, '_blank', 'noopener,noreferrer')}>Open link</Button>
                  )} */}
                  {/* <Button onClick={() => setQrOpen(false)}>Close</Button> */}
                </DialogActions>
              </Dialog>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <BusinessTitle>
                  {businessTitle}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', ml: 1 }}>
                    {isVerified ? (
                      <>
                        <VerifiedCheckIcon width={11} height={12} color="#34A853" />
                        <Typography sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#34A853',
                          backgroundColor: '#F0F9F4',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}>
                          Verified
                        </Typography>
                      </>
                    ) : (
                      <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#EF4444',
                        backgroundColor: '#FEF2F2',
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}>
                        Not Verified
                      </Typography>
                    )}
                  </Box>
                </BusinessTitle>
                <EditProfileLink onClick={handleEditProfile}>(Edit Profile)</EditProfileLink>
              </Box>

              <AddressText>
                <LocationIcon width={12} height={15} color="#121927" />
                {businessAddress}
              </AddressText>

              <ReviewsRow>
                <ReviewsLabel>Reviews :</ReviewsLabel>
                <StarRatingIcon width={100} height={24} color="#F59E0B" />
                <ReviewsRating>{averageRating.toFixed(2)} ({totalReviews} reviews)</ReviewsRating>
              </ReviewsRow>

              <ContactGrid>
                <ContactItem>
                  <ContactLabel>Primary Number:</ContactLabel>
                  <ContactValue>
                    {primaryPhone}
                    <IconButton size="small" sx={{ ml: 1 }} onClick={() => setEditProfileOpen(true)} aria-label="Edit primary number">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </ContactValue>
                </ContactItem>
                <ContactItem>
                  <ContactLabel>Secondary Number:</ContactLabel>
                  <ContactValue>
                    {locationData?.secondaryPhone || 'Not available'}
                    <IconButton size="small" sx={{ ml: 1 }} onClick={() => setEditProfileOpen(true)} aria-label="Edit secondary number">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </ContactValue>
                </ContactItem>
                <ContactItem>
                  <ContactLabel>Manager Number:</ContactLabel>
                  <ContactValue>
                    {locationData?.managerPhone || 'Not available'}
                    <IconButton size="small" sx={{ ml: 1 }} onClick={() => setEditProfileOpen(true)} aria-label="Edit manager number">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </ContactValue>
                </ContactItem>
              </ContactGrid>

              <HoursText>Hours:</HoursText>
              <HoursValue>Open ⋅ Closes 7 pm</HoursValue>

              <PhotosSection>
                <PhotosTitle>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Photos</span>
                    <IconButton size="small" onClick={() => setPhotoUploadOpen(true)} aria-label="Add or edit photos">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </PhotosTitle>

                {/* Cover Photo Display */}
                {mediaItems && mediaItems.length > 0 && (
                  (() => {
                    const coverPhoto = mediaItems.find(item => item.category === 'COVER' || item.category === 'PROFILE');
                    if (coverPhoto) {
                      const originalSrc = coverPhoto.googleUrl || coverPhoto.thumbnailUrl || coverPhoto.sourceUrl || '';
                      const proxied = originalSrc ? buildProxyUrl(originalSrc) : null;
                      const initialSrc = proxied || originalSrc;

                      return (
                        <CoverPhotoContainer
                          onClick={() => handlePhotoClick(originalSrc, proxied)}
                          role="button"
                          aria-label="Open cover photo"
                        >
                          <CoverPhotoLabel>
                            {coverPhoto.category === 'COVER' ? 'Cover Photo' : 'Profile Photo'}
                          </CoverPhotoLabel>
                          <img
                            src={initialSrc}
                            alt="GMB Cover Photo"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            data-original={originalSrc}
                            data-proxy={proxied || ''}
                            data-retry="0"
                            onError={(e) => {
                              const img = e.target;
                              const retry = parseInt(img.dataset.retry || '0');
                              const og = img.dataset.original;
                              const proxy = img.dataset.proxy;
                              if (retry === 0 && proxy && img.src === proxy && og) {
                                console.warn('Cover photo failed via proxy, retrying original:', og);
                                img.dataset.retry = '1';
                                img.src = og;
                              } else if (retry <= 1 && proxy && img.src === og) {
                                console.warn('Cover photo failed via original, falling back to placeholder');
                                img.dataset.retry = '2';
                                img.src = placeholderSmall;
                              } else {
                                img.src = placeholderSmall;
                              }
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </CoverPhotoContainer>
                      );
                    }
                    return null;
                  })()
                )}

                <PhotosGrid>
                  {mediaItems && mediaItems.length > 0 ? (
                    mediaItems
                      .filter(item => item.category !== 'COVER' && item.category !== 'PROFILE')
                      .slice(0, 2)
                      .map((item, index) => {
                        const originalSrc = item.googleUrl || item.thumbnailUrl || item.sourceUrl || '';
                        const proxied = originalSrc ? buildProxyUrl(originalSrc) : null;
                        const initialSrc = proxied || originalSrc;
                        return (
                          <PhotoItem
                            key={item.name || `photo-${index}`}
                            sx={{ cursor: initialSrc ? 'pointer' : 'default' }}
                            onClick={() => handlePhotoClick(originalSrc, proxied)}
                            role={initialSrc ? 'button' : undefined}
                            aria-label={initialSrc ? 'Open photo' : undefined}
                          >
                            {initialSrc ? (
                              <img
                                src={initialSrc}
                                alt={`GMB Photo ${index + 1}`}
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                                data-original={originalSrc}
                                data-proxy={proxied || ''}
                                data-retry="0"
                                onError={(e) => {
                                  const img = e.target;
                                  const retry = parseInt(img.dataset.retry || '0');
                                  const og = img.dataset.original;
                                  const proxy = img.dataset.proxy;
                                  if (retry === 0 && proxy && img.src === proxy && og) {
                                    console.warn('Photo failed via proxy, retrying original:', og);
                                    img.dataset.retry = '1';
                                    img.src = og;
                                  } else if (retry <= 1 && proxy && img.src === og) {
                                    console.warn('Photo failed via original, falling back to placeholder');
                                    img.dataset.retry = '2';
                                    img.src = placeholderSmall;
                                  } else {
                                    img.src = placeholderSmall;
                                  }
                                }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <img
                                src={placeholderSmall}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="No image available"
                              />
                            )}
                          </PhotoItem>
                        );
                      })
                  ) : (
                    <>
                      <PhotoItem>
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEzMyIgdmlld0JveD0iMCAwIDEyMCAxMzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTMzIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg4MFY5M0g0MFY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=="
                          alt="No photos available"
                        />
                      </PhotoItem>
                      <PhotoItem>
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEzMyIgdmlld0JveD0iMCAwIDEyMCAxMzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTMzIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg4MFY5M0g0MFY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=="
                          alt="No photos available"
                        />
                      </PhotoItem>
                    </>
                  )}
                  <AddPhotoButton onClick={handlePhotoUpload}>
                    <AddPhotoIcon width={24} height={24} color="#0B91D6" />
                    <AddPhotoText>Add Photo</AddPhotoText>
                  </AddPhotoButton>
                </PhotosGrid>
              </PhotosSection>

              {/* Videos Section */}
              <VideosSection>
                <VideosTitle>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Videos
                      {videos.length > 0 && (
                        <Badge
                          badgeContent={videos.length}
                          color="primary"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '10px',
                              minWidth: '18px',
                              height: '18px',
                              backgroundColor: '#0B91D6'
                            }
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        onClick={() => setVideoUploadOpen(true)}
                        size="small"
                        sx={{ 
                          color: '#0B91D6',
                          '&:hover': { 
                            backgroundColor: 'rgba(11, 145, 214, 0.1)' 
                          }
                        }}
                        title="Add or edit videos"
                        aria-label="Add or edit videos"
                      >
                        <EditIcon />
                      </IconButton>
                    <IconButton
                      onClick={refreshVideos}
                      size="small"
                      disabled={videosRefreshing}
                      sx={{ 
                        color: '#0B91D6',
                        '&:hover': { 
                          backgroundColor: 'rgba(11, 145, 214, 0.1)' 
                        }
                      }}
                      title="Refresh videos"
                    >
                      {videosRefreshing ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <RefreshIcon />
                      )}
                    </IconButton>
                    </Box>
                  </Box>
                </VideosTitle>
                <VideosGrid>
                  {loading ? (
                    <>
                      <VideoItem>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          color: '#9ca3af'
                        }}>
                          <CircularProgress size={20} color="inherit" />
                          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
                            Loading videos...
                          </Typography>
                        </Box>
                      </VideoItem>
                      <VideoItem>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          color: '#9ca3af'
                        }}>
                          <CircularProgress size={20} color="inherit" />
                          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
                            Loading videos...
                          </Typography>
                        </Box>
                      </VideoItem>
                    </>
                  ) : videos && videos.length > 0 ? (
                    videos.slice(0, 2).map((video, index) => (
                      <VideoItem
                        key={video.id || `video-${index}`}
                        onClick={() => handleVideoClick(video)}
                        role="button"
                        aria-label="Open video"
                      >
                        {video.thumbnail ? (
                          <VideoThumbnail
                            src={video.thumbnail}
                            alt={`Video ${index + 1}`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Box sx={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <VideoIcon width={32} height={32} color="#9ca3af" />
                          </Box>
                        )}
                        <VideoPlayButton>
                          <Box component="span" sx={{ fontSize: '20px' }}>▶</Box>
                        </VideoPlayButton>
                        <VideoDuration>{video.duration}</VideoDuration>
                      </VideoItem>
                    ))
                  ) : (
                    <>
                      <VideoItem>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          color: '#9ca3af'
                        }}>
                          <VideoIcon width={32} height={32} />
                          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
                            No videos yet
                          </Typography>
                          <Typography sx={{ fontSize: '8px', textAlign: 'center', opacity: 0.7 }}>
                            Videos from GMB profile
                          </Typography>
                        </Box>
                      </VideoItem>
                      <VideoItem>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          color: '#9ca3af'
                        }}>
                          <VideoIcon width={32} height={32} />
                          <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
                            No videos yet
                          </Typography>
                          <Typography sx={{ fontSize: '8px', textAlign: 'center', opacity: 0.7 }}>
                            Videos from GMB profile
                          </Typography>
                        </Box>
                      </VideoItem>
                    </>
                  )}
                  <AddVideoButton onClick={handleVideoUpload}>
                    <VideoIcon width={24} height={24} color="#0B91D6" />
                    <AddVideoText>Add Video to GMB</AddVideoText>
                  </AddVideoButton>
                </VideosGrid>
                {videos.length > 2 && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                      variant="text"
                      sx={{
                        color: '#0B91D6',
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      View All Videos ({videos.length})
                    </Button>
                  </Box>
                )}
                {!loading && videos.length === 0 && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    {/* <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      No videos found in your Google My Business profile
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Upload a video to get started, or check your GMB account for existing videos
                    </Typography> */}
                  </Box>
                )}
              </VideosSection>

              {/* Video Upload Success Message */}
              {videoUploadSuccess && (
                <Alert
                  severity="success"
                  sx={{
                    mt: 2,
                    mb: 2,
                    '& .MuiAlert-message': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }
                  }}
                >
                  <VideoIcon width={20} height={20} />
                  Video uploaded successfully to Google My Business! It will appear in your business profile shortly.
                </Alert>
              )}

              {/* Photo Modal */}
              <Modal open={photoModalOpen} onClose={closePhotoModal} aria-labelledby="photo-modal">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
                    {/* Top close button */}
                    <IconButton
                      aria-label="Close"
                      onClick={closePhotoModal}
                      sx={{
                        position: 'absolute',
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#EF232A',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid #EF232A',
                        zIndex: 1000,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 1)',
                          color: '#d32f2f',
                          transform: 'translateX(-50%) scale(1.1)'
                        }
                      }}
                      size="large"
                    >
                      <CloseIcon />
                    </IconButton>
                    {selectedPhoto && (
                      <img
                        src={selectedPhoto.proxy || selectedPhoto.original}
                        alt="Selected"
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        data-original={selectedPhoto.original || ''}
                        data-proxy={selectedPhoto.proxy || ''}
                        data-retry="0"
                        onError={(e) => {
                          const img = e.target;
                          const retry = parseInt(img.dataset.retry || '0');
                          const og = img.dataset.original;
                          const proxy = img.dataset.proxy;
                          if (retry === 0 && proxy && img.src === proxy && og) {
                            console.warn('Photo modal failed via proxy, retrying original:', og);
                            img.dataset.retry = '1';
                            img.src = og;
                          } else if (retry <= 1 && proxy && img.src === og) {
                            console.warn('Photo modal failed via original, falling back to placeholder');
                            img.dataset.retry = '2';
                            img.src = placeholderSmall;
                          } else {
                            img.src = placeholderSmall;
                          }
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Modal>

              {/* Video Modal */}
              <Modal open={videoModalOpen} onClose={closeVideoModal} aria-labelledby="video-modal">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
                    {/* Top close button */}
                    <IconButton
                      aria-label="Close"
                      onClick={closeVideoModal}
                      sx={{
                        position: 'absolute',
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#EF232A',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid #EF232A',
                        zIndex: 1000,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 1)',
                          color: '#d32f2f',
                          transform: 'translateX(-50%) scale(1.1)'
                        }
                      }}
                      size="large"
                    >
                      <CloseIcon />
                    </IconButton>
                    {selectedVideo && (
                      <video
                        controls
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
                        src={selectedVideo.url}
                        onError={(e) => {
                          console.error('Video playback error:', e);
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </Box>
                </Box>
              </Modal>

              {/* Edit Profile Dialog */}
              <Dialog
                open={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
                maxWidth="md"
                fullWidth
              >
                <DialogTitle>Edit Business Profile</DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                      label="Business Name"
                      defaultValue={locationData?.title || businessTitle}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Business Description"
                      defaultValue={locationData?.profile?.description || 'Add a description for your business'}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                    <TextField
                      label="Primary Number"
                      defaultValue={locationData?.phoneNumbers.primaryPhone || 'Not available'}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Secondary Number"
                      defaultValue={locationData?.phoneNumbers.SecondaryNumber || 'Not available'}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Manager Number"
                      defaultValue={locationData?.phoneNumbers.SecondaryNumber || 'Not available'}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Website"
                      defaultValue={locationData?.websiteUri || 'Not available'}
                      fullWidth
                      variant="outlined"
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Note: Changes will be submitted to Google My Business for review and may take time to appear.
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
                  <Button variant="contained" sx={{ backgroundColor: '#0B91D6' }}>
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Photo Upload Dialog */}
              <Dialog
                open={photoUploadOpen}
                onClose={() => setPhotoUploadOpen(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Add Photo to Google My Business</DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Upload a photo to add to your Google My Business profile. Photos help customers learn about your business.
                    </Typography>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            await uploadPhotoToGMB(file);
                            setPhotoUploadOpen(false);
                            // Show success message
                            console.log('Photo uploaded successfully!');
                          } catch (error) {
                            console.error('Failed to upload photo:', error);
                            // Show error message
                          }
                        }
                      }}
                      sx={{ mt: 2 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Supported formats: JPG, PNG, GIF. Max size: 10MB
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setPhotoUploadOpen(false)}>Cancel</Button>
                </DialogActions>
              </Dialog>

              {/* Video Upload Dialog */}
              <Dialog
                open={videoUploadOpen}
                onClose={() => setVideoUploadOpen(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Add Video to Google My Business</DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Upload a video to add to your Google My Business profile. Videos help customers learn about your business and services.
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                      Note: Videos are uploaded directly to your Google My Business account and will appear in your business profile.
                    </Typography>

                    {videoUploadError && (
                      <Alert severity="error" sx={{ mt: 1 }}>
                        {videoUploadError}
                      </Alert>
                    )}

                    {videoUploading ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
                        <CircularProgress size={40} />
                        <Typography variant="body2" color="textSecondary">
                          Uploading video... Please wait.
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                await uploadVideoToGMB(file);
                                // Show success message
                                console.log('Video uploaded successfully!');
                              } catch (error) {
                                console.error('Failed to upload video:', error);
                                // Error is already set in state
                              }
                            }
                          }}
                          sx={{ mt: 2 }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          Supported formats: MP4, MOV, AVI. Max size: 75MB. Max duration: 30 seconds.
                        </Typography>
                      </>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setVideoUploadOpen(false)}
                    disabled={videoUploading}
                  >
                    {videoUploading ? 'Uploading...' : 'Cancel'}
                  </Button>
                </DialogActions>
              </Dialog>

              <ActionsGrid>
                <ActionButton onClick={() => websiteUrl !== 'Not available' && window.open(websiteUrl, '_blank')}>
                  <WebsiteGlobeIcon width={17} height={17} color="#121927" />
                  Website
                  <ActionSubtext>({websiteUrl !== 'Not available' ? websiteUrl : 'Not available'})</ActionSubtext>
                </ActionButton>
                <ActionButton onClick={() => {
                  console.log('Directions button clicked');
                  console.log('mapsUri:', mapsUri);
                  console.log('Full locationData:', JSON.stringify(locationData, null, 2));
                  console.log('Location name:', locationData?.name);
                  console.log('Extracted location ID:', locationData?.name?.split('/').pop());

                  if (mapsUri) {
                    console.log('Opening maps with URI:', mapsUri);
                    window.open(mapsUri, '_blank');
                  } else {
                    // Fallback: create Google Maps URL with address
                    // const encodedAddress = encodeURIComponent(businessAddress);
                    // const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                    // console.log('Using fallback URL:', fallbackUrl);
                    // window.open(fallbackUrl, '_blank');
                  }
                }}>
                  <DirectionsIcon width={16} height={16} color="#121927" />
                  Directions
                  <ActionSubtext>{mapsUri ? 'Open in Maps' : 'Search Address'}</ActionSubtext>
                </ActionButton>
                <ActionButton onClick={openShareMenu}>
                  <ShareIcon width={15} height={15} color="#121927" />
                  Share
                  <ActionSubtext>Link address</ActionSubtext>
                </ActionButton>
                <Menu
                  anchorEl={shareAnchorEl}
                  open={Boolean(shareAnchorEl)}
                  onClose={closeShareMenu}
                >
                  <MenuItem onClick={handleNativeShare}>
                    {/* Share */}
                  </MenuItem>
                  <MenuItem onClick={() => handleSharePlatform('whatsapp')}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <WhatsAppIcon width={16} height={16} />
                    </ListItemIcon>
                    <ListItemText primary="WhatsApp" />
                  </MenuItem>
                  <MenuItem onClick={() => handleSharePlatform('facebook')}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <FacebookIcon width={16} height={16} />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </MenuItem>
                  <MenuItem onClick={() => handleSharePlatform('twitter')}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <TwitterIcon width={16} height={16} />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </MenuItem>
                  <MenuItem onClick={handleCopyLink}>Copy link</MenuItem>
                </Menu>
                <ActionButton onClick={() => setQrOpen(true)}>
                  <QRCodeIcon width={15} height={15} color="#121927" />
                  Review QR
                  <ActionSubtext>Shot link</ActionSubtext>
                </ActionButton>
              </ActionsGrid>

              <AppointmentsSection>
                <AppointmentsLabel>Appointments:</AppointmentsLabel>
                <AppointmentsValue>facebook.com, linkedin.com, e2egroup.in</AppointmentsValue>
              </AppointmentsSection>

              <ProductsServicesSection>
                <SectionHeader>
                  <ProductsServicesTitle>Products & Services</ProductsServicesTitle>
                  <ProductsViewAllButton onClick={() => setProductsModalOpen(true)}>
                    View All
                  </ProductsViewAllButton>
                </SectionHeader>
                <TabsContainer>
                  <TabButton
                    active={activeTab === 'products'}
                    onClick={() => setActiveTab('products')}
                  >
                    Products
                  </TabButton>
                  <TabButton
                    active={activeTab === 'services'}
                    onClick={() => setActiveTab('services')}
                  >
                    Services
                  </TabButton>
                </TabsContainer>

                <ProductsGrid>
                  {(productsLoading || servicesLoading) ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px', gridColumn: '1 / -1' }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (activeTab === 'products' ? products : services).length > 0 ? (
                    (activeTab === 'products' ? products : services).slice(0, 2).map((item) => (
                      <ProductCard key={item.id}>
                        <ProductImage
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.style.backgroundColor = '#f3f4f6';
                            e.target.style.display = 'flex';
                            e.target.style.alignItems = 'center';
                            e.target.style.justifyContent = 'center';
                            e.target.innerHTML = '<span style="color: #9ca3af; font-size: 12px;">No Image</span>';
                          }}
                        />
                        <ProductContent>
                          <ProductTitle>{item.title}</ProductTitle>
                          <ProductPrice>{item.price}</ProductPrice>
                        </ProductContent>
                      </ProductCard>
                    ))
                  ) : (
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '120px',
                      gridColumn: '1 / -1',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      No {activeTab} available
                    </Box>
                  )}
                </ProductsGrid>
              </ProductsServicesSection>
            </BusinessProfileCard>

            <ProfileStrengthCard>
              <StrengthTitle>Profile Strength</StrengthTitle>
              <GaugeContainer>
                <ProfileGaugeIcon width={258} height={185} color="#0B91D6" />
                <ScoreText>350 / 500</ScoreText>
              </GaugeContainer>
              <ActionButtonsContainer>
                <BoostButton>Boost Your Profile</BoostButton>
                <ScoreButton>Get Consolidated Score</ScoreButton>
                <CompetitorButton onClick={handleCompetitorAnalysis}>Competitor Analysis</CompetitorButton>
              </ActionButtonsContainer>
            </ProfileStrengthCard>
          </MainGrid>

          {/* Action Center */}
          <ActionCenterCard>
            <SectionTitle>Action Center</SectionTitle>
            <TasksGrid>
              {(showAllTasks ? mockTasks : mockTasks.slice(0, 5)).map((task, index) => (
                <TaskCard key={index}>
                  <TaskLabel>{task.label}</TaskLabel>
                  <Box sx={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '10px' }} />
                  <TaskStatus sx={{ color: task.color }}>{task.status}</TaskStatus>
                </TaskCard>
              ))}
            </TasksGrid>
            <ViewAllButton onClick={handleViewAllTasks}>
              {showAllTasks ? 'Show Less' : 'View All'}
            </ViewAllButton>
          </ActionCenterCard>

          {/* Performance + Latest Feed */}
          <PerformanceGrid>
            <PerformanceCard>
              <SectionTitle>Performance</SectionTitle>
              <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>Last 30 days</Typography>
              <MetricsGrid>
                {(showPerformanceDetails ? metricsData : metricsData.slice(0, 2)).map((metric, index) => (
                  <MetricCard key={index} sx={{ backgroundColor: metric.color }}>
                    <MetricLabel sx={{ color: '#ffffff' }}>{metric.label}</MetricLabel>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricChange>
                      <span>{metric.change.startsWith('+') || metric.change.startsWith('-') ? (metric.change.startsWith('+') ? '↗' : '↘') : '→'}</span>
                      {metric.change}
                    </MetricChange>
                  </MetricCard>
                ))}
              </MetricsGrid>
              {showPerformanceDetails && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#121927', mb: 1 }}>Additional Insights</Typography>
                  {performanceData ? (
                    <>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Total impressions: {formatNumber(performanceData.localViews)}</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Customer actions: {formatNumber(performanceData.callClicks + performanceData.directionRequests + performanceData.websiteClicks)}</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>• Data source: Google Business Profile Performance API</Typography>
                    </>
                  ) : (
                    <>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Peak viewing hours: 2-4 PM and 7-9 PM</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Most popular search terms: "business hours", "location", "services"</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>• Top traffic sources: Google Search (65%), Direct (25%), Social Media (10%)</Typography>
                    </>
                  )}
                </Box>
              )}
              <ViewDetailsButton onClick={handleViewPerformanceDetails}>
                {showPerformanceDetails ? 'Hide Details' : 'View Details'}
              </ViewDetailsButton>
            </PerformanceCard>

            <PerformanceCard>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <SectionTitle>Latest Feed</SectionTitle>
                <Badge
                  badgeContent={newNotificationCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '10px',
                      minWidth: '16px',
                      height: '16px'
                    }
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => setNewNotificationCount(0)}
                    sx={{
                      fontSize: '10px',
                      color: '#0B91D6',
                      textTransform: 'none',
                      minWidth: 'auto',
                      p: 0.5
                    }}
                  >
                    {notificationLoading ? 'Loading...' : 'Live Feed'}
                  </Button>
                </Badge>
              </Box>
              <FeedSection>
                {/* Show only real notifications from API */}
                {notifications.length > 0 ? (
                  (showFeedDetails ? notifications : notifications.slice(0, 3)).map((notification, index) => {
                    const formatted = GMBNotificationService.formatNotification(notification);
                    return (
                      <FeedItem key={notification.id}>
                        <FeedHeader>
                          <Box sx={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: notification.icon === 'review-red' ? '#EF232A' :
                              notification.icon === 'photo' ? '#0B91D6' :
                                notification.icon === 'post' ? '#9C27B0' : '#34A853'
                          }} />
                          <FeedTitle>{notification.title}</FeedTitle>
                        </FeedHeader>
                        <FeedDescription>{notification.description}</FeedDescription>
                        {showFeedDetails && (
                          <Box sx={{ mt: 1, pl: 3 }}>
                            <Typography sx={{ fontSize: '11px', color: '#0B91D6' }}>
                              {formatted.timeAgo}
                            </Typography>
                          </Box>
                        )}
                      </FeedItem>
                    );
                  })
                ) : (
                  /* Show message when no notifications are available */
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 1 }}>
                      No recent notifications
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>
                      {notificationLoading ? 'Loading notifications...' : 'New activity will appear here'}
                    </Typography>
                  </Box>
                )}
              </FeedSection>
              {showFeedDetails && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#121927', mb: 1 }}>Live Feed Analytics</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Live notifications: {notifications.length}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• Recent reviews: {notifications.filter(n => n.type === 'NEW_REVIEW').length}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• New photos: {notifications.filter(n => n.type === 'NEW_CUSTOMER_MEDIA').length}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280', mb: 1 }}>• New posts: {notifications.filter(n => n.type === 'NEW_LOCAL_POST').length}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>• Notification polling: {notificationLoading ? 'Connecting...' : 'Active'}</Typography>
                </Box>
              )}
              <ViewDetailsButton onClick={handleViewFeedDetails}>
                {showFeedDetails ? 'Hide Details' : 'View Details'}
              </ViewDetailsButton>
            </PerformanceCard>
          </PerformanceGrid>

          {/* Reviews Overview */}
          <ReviewsCard>
            <SectionTitle>Reviews Overview</SectionTitle>
            <ReviewsGrid>
              <ReviewsLeft>
                <ReviewsScore>{averageRating.toFixed(2)}</ReviewsScore>
                <Rating value={averageRating} readOnly precision={0.1} sx={{ color: '#F59E0B' }} />
              </ReviewsLeft>
              <ReviewsRight>
                {ratingDistribution.map((item) => (
                  <RatingRow key={item.rating}>
                    <RatingLabel>{item.rating}.0</RatingLabel>
                    <RatingBar>
                      <RatingFill sx={{ width: `${item.percentage}%` }} />
                    </RatingBar>
                    <RatingCount>{item.count} reviews</RatingCount>
                  </RatingRow>
                ))}
              </ReviewsRight>
            </ReviewsGrid>
            <ReviewsStatsGrid>
              <ReviewsStat>
                <ReviewsStatValue>{reviewsData?.totalReviewCount || reviews.length || 0}</ReviewsStatValue>
                <ReviewsStatLabel>Total Reviews</ReviewsStatLabel>
              </ReviewsStat>
              <StatsDivider />
              <ReviewsStat>
                <ReviewsStatValue>{reviews.filter(review => {
                  const reviewDate = new Date(review.createTime);
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                  return reviewDate >= sevenDaysAgo;
                }).length}</ReviewsStatValue>
                <ReviewsStatLabel>Reviews In Last 7 Days</ReviewsStatLabel>
              </ReviewsStat>
              <StatsDivider />
              <ReviewsStat>
                <ReviewsStatValue>{reviews.filter(review => {
                  const reviewDate = new Date(review.createTime);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return reviewDate >= thirtyDaysAgo;
                }).length}</ReviewsStatValue>
                <ReviewsStatLabel>Reviews In Last 30 Days</ReviewsStatLabel>
              </ReviewsStat>
            </ReviewsStatsGrid>
            {showAllReviews && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#121927', mb: 2 }}>Recent Reviews</Typography>
                {reviews.slice(0, 3).map((review, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < 2 ? '1px solid #e5e7eb' : 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Rating value={toNumericRating(review.starRating)} readOnly size="small" sx={{ color: '#F59E0B' }} />
                      <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                        {new Date(review.createTime).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: '#121927', mb: 1 }}>
                      {review.comment || 'No comment provided'}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', color: '#0B91D6' }}>
                      - {review.reviewer?.displayName || 'Anonymous'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ textAlign: 'center', marginTop: '26px' }}>
              <ViewAllButton onClick={handleViewAllReviews}>
                {showAllReviews ? 'Show Less' : 'View All'}
              </ViewAllButton>
            </Box>
          </ReviewsCard>

          {/* GMB Feed */}
          <FeedCard>
            <SectionTitle>GMB Feed</SectionTitle>
            {(() => {
              console.log('[BusinessProfile] Rendering GMB Feed - localPostsLoading:', localPostsLoading, 'localPosts:', localPosts, 'length:', localPosts?.length);
              return null;
            })()}
            {localPostsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography>Loading local posts...</Typography>
              </Box>
            ) : localPosts && localPosts.length > 0 ? (
              <>
                <FeedGrid>
                  {(showAllGMBFeed ? localPosts : localPosts.slice(0, 9)).map((post, index) => {
                    console.log('[BusinessProfile] Processing post:', post.name, 'media:', post.media);

                    // Extract post data - check multiple possible image sources
                    const postMedia = post.media?.[0]; // Get first media item if available
                    let originalSrc = '';

                    if (postMedia) {
                      // Try different possible image URL fields
                      originalSrc = postMedia.sourceUrl ||
                        postMedia.googleUrl ||
                        postMedia.thumbnailUrl ||
                        postMedia.url || '';
                      console.log('[BusinessProfile] Found media in post:', originalSrc);
                    } else if (post.photos && post.photos.length > 0) {
                      // Check if photos array exists
                      const photo = post.photos[0];
                      originalSrc = photo.sourceUrl || photo.googleUrl || photo.thumbnailUrl || photo.url || '';
                      console.log('[BusinessProfile] Found photo in post:', originalSrc);
                    } else {
                      console.log('[BusinessProfile] No media found in post');
                    }

                    const imgSrc = originalSrc;
                    const created = post.createTime ? new Date(post.createTime) : null;
                    const dateText = created
                      ? `Posted on - ${created.toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}`
                      : 'Date not available';

                    // Get post content
                    const heading = post.summary || post.callToAction?.actionType || post.topicType || 'Local Post';
                    const description = post.event?.title || post.offer?.couponCode || '';

                    return (
                      <FeedCardItem key={post.name || `post-${index}`}>
                        {imgSrc ? (
                          <FeedImage
                            src={buildProxyUrl(imgSrc) || imgSrc}
                            alt={`Local Post ${index + 1}`}
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            data-original={imgSrc}
                            data-proxy={buildProxyUrl(imgSrc) || ''}
                            data-retry="0"
                            onError={(e) => {
                              const imgEl = e.currentTarget;
                              const retry = parseInt(imgEl.dataset.retry || '0', 10);
                              const og = imgEl.dataset.original;
                              const proxy = imgEl.dataset.proxy;
                              if (retry === 0 && proxy && imgEl.src === proxy && og) {
                                console.warn('Image failed via proxy, retry original:', og);
                                imgEl.dataset.retry = '1';
                                imgEl.src = og;
                              } else if (retry <= 1 && proxy && imgEl.src === og) {
                                console.warn('Image failed via original, fallback placeholder');
                                imgEl.dataset.retry = '2';
                                imgEl.src = placeholderLarge;
                              } else {
                                imgEl.src = placeholderLarge;
                              }
                            }}
                          />
                        ) : (
                          <FeedImage
                            src={placeholderLarge}
                            alt="No image available"
                          />
                        )}
                        <FeedContent>
                          <FeedDate>{dateText}</FeedDate>
                          <FeedText>{heading}</FeedText>
                        </FeedContent>
                      </FeedCardItem>
                    );
                  })}
                </FeedGrid>
                <Box sx={{ textAlign: 'center' }}>
                  <ViewAllButton onClick={handleViewAllGMBFeed}>
                    {showAllGMBFeed ? 'Show Less' : 'View All'}
                  </ViewAllButton>
                </Box>
              </>
            ) : (
              <Typography sx={{ color: '#6b7280' }}>No local posts found.</Typography>
            )}
          </FeedCard>

          {/* Social Feed */}
          <FeedCard>
            <SectionTitle>Social Feed</SectionTitle>
            <FeedGrid>
              {(showAllSocialFeed ? [...mockSocialFeed, ...mockSocialFeed, ...mockSocialFeed] : mockSocialFeed).map((item, index) => (
                <FeedCardItem key={index}>
                  <FeedImage src={item.image} alt={`Social Feed ${index + 1}`} />
                  <FeedContent>
                    <FeedDate>{item.date}</FeedDate>
                    <FeedText>{item.text}</FeedText>
                  </FeedContent>
                </FeedCardItem>
              ))}
            </FeedGrid>
            <Box sx={{ textAlign: 'center' }}>
              <ViewAllButton onClick={handleViewAllSocialFeed}>
                {showAllSocialFeed ? 'Show Less' : 'View All'}
              </ViewAllButton>
            </Box>
          </FeedCard>
        </ContentWrapper>
      </PageContainer>

      {/* Products/Services Modal */}
      <ModalContainer
        open={productsModalOpen}
        onClose={() => setProductsModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              All {activeTab === 'products' ? 'Products' : 'Services'}
            </ModalTitle>
            <CloseButton onClick={() => setProductsModalOpen(false)}>
              <CloseIcon />
            </CloseButton>
          </ModalHeader>

          <ModalProductsGrid>
            {(activeTab === 'products' ? products : services).map((item) => (
              <ProductCard key={item.id}>
                <ProductImage
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = '<span style="color: #9ca3af; font-size: 12px;">No Image</span>';
                  }}
                />
                <ProductContent>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPrice>{item.price}</ProductPrice>
                </ProductContent>
              </ProductCard>
            ))}
          </ModalProductsGrid>
        </ModalContent>
      </ModalContainer>
    </DashboardLayout>
  );
};

export default BusinessProfile;