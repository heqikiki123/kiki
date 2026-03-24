import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native';
import { colors, spacing, radius, shadows } from '../theme';

type Props = {
  onCartPress: () => void;
};

const MENU_SECTIONS = [
  {
    title: 'Shopping',
    items: [
      { icon: '📦', label: 'My Orders', badge: '3', value: '' },
      { icon: '♡', label: 'Wishlist', badge: '12', value: '' },
      { icon: '↩', label: 'Returns & Refunds', badge: '', value: '' },
      { icon: '📍', label: 'Delivery Addresses', badge: '', value: '2 saved' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: '💳', label: 'Payment Methods', badge: '', value: '3 cards' },
      { icon: '🔔', label: 'Notifications', badge: '', value: '' },
      { icon: '🛡', label: 'Privacy & Security', badge: '', value: '' },
      { icon: '❓', label: 'Help & Support', badge: '', value: '' },
    ],
  },
];

const STATS = [
  { label: 'Orders', value: '24' },
  { label: 'Wishlist', value: '12' },
  { label: 'Reviews', value: '8' },
];

export default function ProfileScreen({ onCartPress }: Props) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Profile hero */}
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AJ</Text>
        </View>
        <View style={styles.heroInfo}>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.j@email.com</Text>
          <View style={styles.memberBadge}>
            <Text style={styles.memberText}>⭐ Gold Member</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn} accessibilityRole="button" accessibilityLabel="Edit profile">
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            {i < STATS.length - 1 && <View style={styles.statDivider} />}
          </React.Fragment>
        ))}
      </View>

      {/* Loyalty points */}
      <View style={styles.loyaltyCard}>
        <View style={styles.loyaltyLeft}>
          <Text style={styles.loyaltyPoints}>2,840</Text>
          <Text style={styles.loyaltyLabel}>Loyalty Points</Text>
          <Text style={styles.loyaltySub}>≈ $28.40 reward value</Text>
        </View>
        <TouchableOpacity style={styles.redeemBtn}>
          <Text style={styles.redeemBtnText}>Redeem →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Preference toggles */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleIcon}>🔔</Text>
            <Text style={styles.toggleLabel}>Push Notifications</Text>
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notificationsOn ? colors.primary : '#FFFFFF'}
              accessibilityLabel="Toggle push notifications"
            />
          </View>
          <View style={styles.toggleDivider} />
          <View style={styles.toggleRow}>
            <Text style={styles.toggleIcon}>🌙</Text>
            <Text style={styles.toggleLabel}>Dark Mode</Text>
            <Switch
              value={darkModeOn}
              onValueChange={setDarkModeOn}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={darkModeOn ? colors.primary : '#FFFFFF'}
              accessibilityLabel="Toggle dark mode"
            />
          </View>
        </View>

        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                  >
                    <Text style={styles.menuItemIcon}>{item.icon}</Text>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    <View style={styles.menuItemRight}>
                      {item.badge ? (
                        <View style={styles.menuBadge}>
                          <Text style={styles.menuBadgeText}>{item.badge}</Text>
                        </View>
                      ) : item.value ? (
                        <Text style={styles.menuValue}>{item.value}</Text>
                      ) : null}
                      <Text style={styles.menuArrow}>›</Text>
                    </View>
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={styles.menuDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} accessibilityRole="button" accessibilityLabel="Sign out">
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.appVersion}>ShopApp v2.4.1 · Terms · Privacy</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingTop: 56,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroInfo: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  memberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    marginTop: 2,
  },
  memberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: -20,
    borderRadius: radius.xxl,
    padding: spacing.lg,
    ...shadows.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  loyaltyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: '#064E3B',
    borderRadius: radius.xxl,
    padding: spacing.lg,
    ...shadows.button,
  },
  loyaltyLeft: {
    flex: 1,
    gap: 3,
  },
  loyaltyPoints: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  loyaltyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loyaltySub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
  },
  redeemBtn: {
    backgroundColor: colors.cta,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.ctaButton,
  },
  redeemBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 40,
    gap: spacing.md,
  },
  toggleCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
  toggleIcon: { fontSize: 20, width: 28 },
  toggleLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  menuSection: {
    gap: spacing.sm,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: 4,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  menuItemIcon: { fontSize: 20, width: 28 },
  menuItemLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuBadge: {
    backgroundColor: colors.cta,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.full,
    minWidth: 22,
    alignItems: 'center',
  },
  menuBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  menuValue: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.textLight,
    marginRight: -4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  signOutBtn: {
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  appVersion: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
});
