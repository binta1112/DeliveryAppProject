export const colors = {
  primary: '#F57C00',     
  primaryDark: '#D65D00',
  secondary: '#FFD54F',   
  background: '#F7F8FB', 
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#FACC15',
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  full: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
};

export const spacing = (n) => n * 4; 