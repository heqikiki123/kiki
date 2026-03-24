import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '../theme';

export type TabName = 'home' | 'search' | 'cart' | 'profile';

type Tab = {
  name: TabName;
  label: string;
};

const TABS: Tab[] = [
  { name: 'home', label: 'Home' },
  { name: 'search', label: 'Explore' },
  { name: 'cart', label: 'Cart' },
  { name: 'profile', label: 'Profile' },
];

// SVG-style icons via View shapes (replace with lucide-react-native in production)
function HomeIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textLight;
  return (
    <View style={[iconStyles.house, { borderColor: c }]}>
      <View style={[iconStyles.houseRoof, { borderColor: c }]} />
    </View>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textLight;
  return (
    <View>
      <View style={[iconStyles.searchCircle, { borderColor: c }]} />
      <View style={[iconStyles.searchHandle, { backgroundColor: c }]} />
    </View>
  );
}

function CartIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textLight;
  return (
    <View style={iconStyles.cartWrap}>
      <View style={[iconStyles.cartHandle, { borderColor: c, borderBottomWidth: 0 }]} />
      <View style={[iconStyles.cartBody, { borderColor: c }]} />
    </View>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textLight;
  return (
    <View style={iconStyles.profileWrap}>
      <View style={[iconStyles.profileHead, { borderColor: c }]} />
      <View style={[iconStyles.profileBody, { borderColor: c }]} />
    </View>
  );
}

const ICONS = {
  home: HomeIcon,
  search: SearchIcon,
  cart: CartIcon,
  profile: ProfileIcon,
};

type Props = {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  cartCount: number;
};

export default function BottomTabBar({ activeTab, onTabPress, cartCount }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        const Icon = ICONS[tab.name];

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Icon active={isActive} />
              {tab.name === 'cart' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingTop: spacing.sm,
    paddingBottom: 24,
    paddingHorizontal: spacing.sm,
    ...shadows.nav,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    minHeight: 44,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 44,
    height: 36,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconWrapActive: {
    backgroundColor: colors.surfaceAlt,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.cta,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textLight,
    letterSpacing: 0.2,
  },
  labelActive: {
    fontWeight: '700',
    color: colors.primary,
  },
});

const iconStyles = StyleSheet.create({
  house: {
    width: 16,
    height: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    marginTop: 4,
  },
  houseRoof: {
    position: 'absolute',
    top: -6,
    left: -3,
    width: 20,
    height: 10,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderRadius: 2,
    transform: [{ rotate: '0deg' }],
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
  },
  searchHandle: {
    width: 1.5,
    height: 6,
    position: 'absolute',
    bottom: -5,
    right: 0,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
  cartWrap: {
    alignItems: 'center',
  },
  cartHandle: {
    width: 8,
    height: 5,
    borderRadius: 4,
    borderWidth: 1.5,
    marginBottom: 0,
  },
  cartBody: {
    width: 16,
    height: 10,
    borderRadius: 2,
    borderWidth: 1.5,
  },
  profileWrap: {
    alignItems: 'center',
    gap: 2,
  },
  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  profileBody: {
    width: 16,
    height: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
  },
});
