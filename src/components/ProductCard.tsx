import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../theme';
import { Product } from '../data/products';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

type Props = {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Sale: { bg: '#FEE2E2', text: '#DC2626' },
  New: { bg: '#DBEAFE', text: '#1D4ED8' },
  Hot: { bg: '#FEF3C7', text: '#D97706' },
  Best: { bg: '#D1FAE5', text: '#059669' },
};

export default function ProductCard({ product, onPress, onAddToCart }: Props) {
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    setAddedToCart(true);
    onAddToCart(product);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.92}
      accessibilityRole="button"
      accessibilityLabel={`${product.name} by ${product.brand}, $${product.price}`}
    >
      {/* Product image placeholder */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <View style={styles.imageDot} />
          <Text style={styles.imageLabel}>{product.category[0]}</Text>
        </View>

        {/* Wishlist button */}
        <TouchableOpacity
          style={styles.wishBtn}
          onPress={() => setWished(!wished)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {/* Heart icon (SVG-style via text — replace with real SVG icon in production) */}
          <Text style={[styles.heartIcon, wished && styles.heartActive]}>
            {wished ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>

        {/* Tag badge */}
        {product.tag && (
          <View style={[styles.tag, { backgroundColor: TAG_COLORS[product.tag].bg }]}>
            <Text style={[styles.tagText, { color: TAG_COLORS[product.tag].text }]}>
              {product.tag}
            </Text>
          </View>
        )}

        {/* Discount badge */}
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* Color swatches */}
        <View style={styles.swatches}>
          {product.colors.slice(0, 3).map((c, i) => (
            <View key={i} style={[styles.swatch, { backgroundColor: c }]} />
          ))}
          {product.colors.length > 3 && (
            <Text style={styles.moreColors}>+{product.colors.length - 3}</Text>
          )}
        </View>

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
        </View>

        {/* Add to cart */}
        <TouchableOpacity
          style={[styles.addBtn, addedToCart && styles.addBtnActive]}
          onPress={handleAddToCart}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
        >
          <Text style={styles.addBtnText}>
            {addedToCart ? '✓ Added' : '+ Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.card,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.border,
    marginBottom: 6,
  },
  imageLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  wishBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 16,
    color: colors.textMuted,
  },
  heartActive: {
    color: '#EF4444',
  },
  tag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  discountBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: '#EF4444',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  info: {
    padding: spacing.md,
    gap: 4,
  },
  brand: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 18,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  star: {
    fontSize: 11,
    color: colors.star,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  reviewCount: {
    fontSize: 10,
    color: colors.textMuted,
  },
  swatches: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  moreColors: {
    fontSize: 10,
    color: colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 7,
    alignItems: 'center',
    minHeight: 32,
  },
  addBtnActive: {
    backgroundColor: colors.primaryLight,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
