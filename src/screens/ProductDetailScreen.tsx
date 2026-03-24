import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { colors, spacing, radius, shadows } from '../theme';
import { Product } from '../data/products';

const { width } = Dimensions.get('window');

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const REVIEWS = [
  { id: '1', name: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Absolutely love the quality! Fits perfectly and the color is exactly as shown. Will definitely buy again.' },
  { id: '2', name: 'James T.', rating: 4, date: '1 week ago', text: 'Great product overall. Shipping was fast. Only minor issue is the stitching on one side, but overall very happy.' },
  { id: '3', name: 'Priya K.', rating: 5, date: '2 weeks ago', text: 'Amazing value for the price. Very comfortable and stylish.' },
];

type Props = {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
};

export default function ProductDetailScreen({ product, onBack, onAddToCart }: Props) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [isAdding, setIsAdding] = useState(false);
  const [wished, setWished] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    onAddToCart(product, product.colors[selectedColor], selectedSize);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Back + Wishlist header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Product Detail</Text>
        <TouchableOpacity
          style={styles.wishBtn}
          onPress={() => setWished(!wished)}
          accessibilityRole="button"
          accessibilityLabel={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Text style={[styles.heartIcon, wished && styles.heartActive]}>
            {wished ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product image hero */}
        <View style={styles.imageHero}>
          <View style={styles.imagePlaceholder}>
            <View style={[styles.imageCircle, { backgroundColor: product.colors[selectedColor], opacity: 0.4 }]} />
            <Text style={styles.imageLetter}>{product.category[0]}</Text>
          </View>

          {/* Image thumbnail strip */}
          <View style={styles.thumbStrip}>
            {product.colors.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.thumb, selectedColor === i && styles.thumbActive]}
                onPress={() => setSelectedColor(i)}
              >
                <View style={[styles.thumbColor, { backgroundColor: c }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product info card */}
        <View style={styles.infoCard}>
          {/* Brand + tag */}
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            {product.tag && (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{product.tag}</Text>
              </View>
            )}
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text key={i} style={[styles.star, i < Math.floor(product.rating) && styles.starActive]}>★</Text>
              ))}
            </View>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{discount}% OFF</Text>
                </View>
              </>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Color selection */}
          <Text style={styles.sectionLabel}>Color</Text>
          <View style={styles.colorRow}>
            {product.colors.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.colorSwatch, selectedColor === i && styles.colorSwatchActive]}
                onPress={() => setSelectedColor(i)}
                accessibilityRole="radio"
                accessibilityLabel={`Color option ${i + 1}`}
                accessibilityState={{ selected: selectedColor === i }}
              >
                <View style={[styles.colorInner, { backgroundColor: c }]} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Size selection */}
          <View style={styles.sizeHeader}>
            <Text style={styles.sectionLabel}>Size</Text>
            <TouchableOpacity>
              <Text style={styles.sizeGuide}>Size Guide →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeRow}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeChip, selectedSize === size && styles.sizeChipActive]}
                onPress={() => setSelectedSize(size)}
                accessibilityRole="radio"
                accessibilityLabel={`Size ${size}`}
                accessibilityState={{ selected: selectedSize === size }}
              >
                <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity */}
          <View style={styles.quantityRow}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                accessibilityRole="button"
                accessibilityLabel="Decrease quantity"
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(quantity + 1)}
                accessibilityRole="button"
                accessibilityLabel="Increase quantity"
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Tab: Description / Reviews */}
          <View style={styles.tabs}>
            {(['info', 'reviews'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab === 'info' ? 'Description' : `Reviews (${product.reviewCount})`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'info' ? (
            <View style={styles.tabContent}>
              <Text style={styles.description}>
                Crafted with premium materials for everyday comfort and effortless style. This {product.name.toLowerCase()} features a modern silhouette designed for the contemporary wardrobe. Versatile enough for casual days and smart occasions alike.
              </Text>
              <View style={styles.specList}>
                {[
                  ['Material', '95% Cotton, 5% Elastane'],
                  ['Fit', 'Regular / Relaxed'],
                  ['Care', 'Machine wash 30°C'],
                  ['Origin', 'Ethically made in Portugal'],
                ].map(([label, value]) => (
                  <View key={label} style={styles.specRow}>
                    <Text style={styles.specLabel}>{label}</Text>
                    <Text style={styles.specValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.tabContent}>
              {REVIEWS.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{review.name[0]}</Text>
                    </View>
                    <View style={styles.reviewMeta}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    <View style={styles.reviewStars}>
                      {'★★★★★'.slice(0, review.rating).split('').map((s, i) => (
                        <Text key={i} style={styles.starActive}>{s}</Text>
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${product.price * quantity}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addToCartBtn, isAdding && styles.addToCartBtnDone]}
          onPress={handleAddToCart}
          disabled={isAdding}
          accessibilityRole="button"
          accessibilityLabel={`Add ${quantity} ${product.name} to cart`}
        >
          <Text style={styles.addToCartText}>
            {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  backArrow: {
    fontSize: 20,
    color: colors.text,
    marginTop: -2,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  wishBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  heartIcon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  heartActive: {
    color: '#EF4444',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageHero: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radius.xxl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    height: 280,
    ...shadows.card,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageLetter: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.primary,
    opacity: 0.6,
  },
  thumbStrip: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: 4,
    ...shadows.card,
  },
  thumbActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  thumbColor: {
    flex: 1,
    borderRadius: radius.sm - 2,
  },
  infoCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xxl,
    padding: spacing.xxl,
    ...shadows.card,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 6,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagBadge: {
    backgroundColor: colors.cta,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 28,
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  star: {
    fontSize: 14,
    color: colors.border,
  },
  starActive: {
    fontSize: 14,
    color: colors.star,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.lg,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  colorSwatch: {
    width: 38,
    height: 38,
    borderRadius: 19,
    padding: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchActive: {
    borderColor: colors.primary,
  },
  colorInner: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sizeGuide: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sizeChip: {
    minWidth: 46,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  sizeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sizeTextActive: {
    color: '#FFFFFF',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  qtyValue: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.lg,
    minHeight: 36,
  },
  tabActive: {
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabContent: {},
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  specList: {
    gap: spacing.sm,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  specLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  specValue: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  reviewCard: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewMeta: {
    flex: 1,
  },
  reviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  reviewDate: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 1,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: 28,
    ...shadows.nav,
  },
  totalInfo: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  addToCartBtn: {
    flex: 2,
    backgroundColor: colors.cta,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
    ...shadows.ctaButton,
  },
  addToCartBtnDone: {
    backgroundColor: colors.primary,
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
