export const colors = {
  // Primary
  primary: '#FF6B35',
  primaryLight: '#FF8C5A',
  primaryDark: '#E55A2B',
  primaryGradient: ['#FF6B35', '#FF8C5A'],

  // Secondary
  secondary: '#FFD54F',
  secondaryLight: '#FFE082',

  // Backgrounds
  background: '#F8F9FC',
  card: '#FFFFFF',
  cardAlt: '#FFF8F5',

  // Text
  text: '#1A1D26',
  textSecondary: '#4A5568',
  textMuted: '#9CA3AF',
  textLight: '#FFFFFF',
  placeholder: '#585f68',

  // Status
  success: '#10B981',
  successLight: '#D1FAE5',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const gradients = {
  primary: ['#FF6B35', '#FF8C5A'],
  primaryVertical: ['#FF8C5A', '#FF6B35'],
  orange: ['#F97316', '#FB923C'],
  sunset: ['#FF6B35', '#FFD54F'],
  dark: ['#1A1D26', '#2D3748'],
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  orange: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const spacing = (n) => n * 4;

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
  bodySemiBold: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  small: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  smallMedium: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  captionMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
};