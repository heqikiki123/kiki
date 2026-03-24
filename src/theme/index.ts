// Design System — ShopApp
// Colors: Success green + urgency orange palette
// Typography: Rubik (headings) / Nunito Sans (body)

export const colors = {
  primary: '#059669',
  primaryLight: '#10B981',
  primaryDark: '#047857',
  cta: '#F97316',
  ctaDark: '#EA6C0A',
  background: '#ECFDF5',
  surface: '#FFFFFF',
  surfaceAlt: '#F0FDF4',
  text: '#064E3B',
  textSecondary: '#065F46',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#D1FAE5',
  borderDark: '#A7F3D0',
  error: '#EF4444',
  star: '#F59E0B',
  badge: '#F97316',
  cardShadow: 'rgba(5, 150, 105, 0.12)',
  overlay: 'rgba(6, 78, 59, 0.4)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const typography = {
  // Rubik for headings (bold, energetic)
  h1: { fontFamily: 'Rubik-Bold', fontSize: 28, lineHeight: 36, color: colors.text },
  h2: { fontFamily: 'Rubik-SemiBold', fontSize: 22, lineHeight: 30, color: colors.text },
  h3: { fontFamily: 'Rubik-Medium', fontSize: 18, lineHeight: 26, color: colors.text },
  h4: { fontFamily: 'Rubik-Medium', fontSize: 16, lineHeight: 22, color: colors.text },
  // Nunito Sans for body (clean, readable)
  body: { fontFamily: 'NunitoSans-Regular', fontSize: 15, lineHeight: 22, color: colors.textSecondary },
  bodySmall: { fontFamily: 'NunitoSans-Regular', fontSize: 13, lineHeight: 20, color: colors.textMuted },
  label: { fontFamily: 'NunitoSans-SemiBold', fontSize: 13, lineHeight: 18, color: colors.textMuted },
  price: { fontFamily: 'Rubik-Bold', fontSize: 18, lineHeight: 24, color: colors.primary },
  priceLarge: { fontFamily: 'Rubik-Bold', fontSize: 26, lineHeight: 32, color: colors.primary },
  button: { fontFamily: 'NunitoSans-Bold', fontSize: 16, lineHeight: 22 },
  caption: { fontFamily: 'NunitoSans-Regular', fontSize: 12, lineHeight: 16, color: colors.textLight },
};

export const shadows = {
  card: {
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  button: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButton: {
    shadowColor: colors.cta,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
};
