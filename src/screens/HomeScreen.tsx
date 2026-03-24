import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadows } from '../theme';
import { products, categories, Product } from '../data/products';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const BANNERS = [
  {
    id: '1',
    title: 'Summer\nEssentials',
    subtitle: 'Up to 40% off',
    cta: 'Shop Now',
    bg: colors.primary,
    accent: colors.primaryLight,
  },
  {
    id: '2',
    title: 'New\nArrivals',
    subtitle: 'Fresh styles just landed',
    cta: 'Explore',
    bg: '#F97316',
    accent: '#FED7AA',
  },
  {
    id: '3',
    title: 'Member\nDeals',
    subtitle: 'Exclusive savings inside',
    cta: 'Join Free',
    bg: '#7C3AED',
    accent: '#DDD6FE',
  },
];

type Props = {
  onProductPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onCartPress: () => void;
};

export default function HomeScreen({ onProductPress, onAddToCart, cartCount, onCartPress }: Props) {
  const [activeCategory, setActiveCategory] = useState('1');
  const [activeBanner, setActiveBanner] = useState(0);
  const [searchText, setSearchText] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;

  const filteredProducts = products.filter((p) => {
    const cat = categories.find((c) => c.id === activeCategory);
    if (!cat || cat.name === 'All') return true;
    return p.category === cat.name;
  }).filter((p) =>
    searchText.length === 0 ||
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.headerTitle}>Find your style</Text>
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={onCartPress}
          accessibilityRole="button"
          accessibilityLabel={`Cart, ${cartCount} items`}
        >
          {/* Cart icon */}
          <View style={styles.cartIcon}>
            <View style={styles.cartHandle} />
            <View style={styles.cartBody} />
          </View>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Text style={styles.searchIconText}>⌕</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands..."
            placeholderTextColor={colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            accessibilityLabel="Search products"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Hero Banners */}
        <View style={styles.bannerSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
                listener: (e: any) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / (width - spacing.lg * 2));
                  setActiveBanner(idx);
                },
              }
            )}
            scrollEventThrottle={16}
          >
            {BANNERS.map((banner) => (
              <TouchableOpacity
                key={banner.id}
                activeOpacity={0.92}
                style={[styles.banner, { backgroundColor: banner.bg }]}
              >
                {/* Decorative circles */}
                <View style={[styles.bannerCircle1, { backgroundColor: banner.accent, opacity: 0.3 }]} />
                <View style={[styles.bannerCircle2, { backgroundColor: banner.accent, opacity: 0.15 }]} />

                <View style={styles.bannerContent}>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <TouchableOpacity style={styles.bannerCta}>
                    <Text style={[styles.bannerCtaText, { color: banner.bg }]}>{banner.cta}</Text>
                  </TouchableOpacity>
                </View>

                {/* Product silhouette placeholder */}
                <View style={styles.bannerProduct}>
                  <View style={[styles.bannerProductShape, { backgroundColor: banner.accent, opacity: 0.5 }]} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dot indicators */}
          <View style={styles.dots}>
            {BANNERS.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeBanner && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive]}
              onPress={() => setActiveCategory(cat.id)}
              accessibilityRole="button"
              accessibilityLabel={`${cat.name} category, ${cat.count} products`}
              accessibilityState={{ selected: activeCategory === cat.id }}
            >
              <Text style={[styles.catName, activeCategory === cat.id && styles.catNameActive]}>
                {cat.name}
              </Text>
              <Text style={[styles.catCount, activeCategory === cat.id && styles.catCountActive]}>
                {cat.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Flash Sale Banner */}
        <View style={styles.flashSale}>
          <View style={styles.flashLeft}>
            <Text style={styles.flashIcon}>⚡</Text>
            <View>
              <Text style={styles.flashTitle}>Flash Sale</Text>
              <Text style={styles.flashSub}>Ends in 02:45:18</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.flashCta}>
            <Text style={styles.flashCtaText}>See All →</Text>
          </TouchableOpacity>
        </View>

        {/* Products grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {filteredProducts.length} Products
          </Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={onProductPress}
              onAddToCart={onAddToCart}
            />
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>Try a different search or category</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const BANNER_WIDTH = width - spacing.lg * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
    position: 'relative',
  },
  cartIcon: {
    alignItems: 'center',
  },
  cartHandle: {
    width: 10,
    height: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.text,
    borderBottomWidth: 0,
    marginBottom: 1,
  },
  cartBody: {
    width: 16,
    height: 12,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.text,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.cta,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    height: 48,
    ...shadows.card,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconText: {
    fontSize: 18,
    color: colors.textMuted,
    marginTop: -2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    height: '100%',
  },
  clearBtn: {
    fontSize: 14,
    color: colors.textMuted,
    paddingLeft: 8,
  },
  bannerSection: {
    paddingLeft: spacing.lg,
    marginBottom: spacing.lg,
  },
  banner: {
    width: BANNER_WIDTH,
    height: 160,
    borderRadius: radius.xxl,
    marginRight: spacing.md,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    position: 'relative',
  },
  bannerCircle1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -40,
    top: -40,
  },
  bannerCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    right: 60,
    bottom: -30,
  },
  bannerContent: {
    flex: 1,
  },
  bannerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  bannerCta: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  bannerCtaText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  bannerProduct: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerProductShape: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
    paddingRight: spacing.lg,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    minHeight: 36,
  },
  catChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  catNameActive: {
    color: '#FFFFFF',
  },
  catCount: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textLight,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  catCountActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: 'rgba(255,255,255,0.85)',
  },
  flashSale: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: '#FEF3C7',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  flashLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  flashIcon: {
    fontSize: 20,
  },
  flashTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  flashSub: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '500',
  },
  flashCta: {
    backgroundColor: '#F97316',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  flashCtaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
