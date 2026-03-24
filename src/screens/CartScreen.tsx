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
import { CartItem } from '../data/products';

const { width } = Dimensions.get('window');

type Props = {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

const PROMOS = [
  { code: 'SAVE10', label: '10% off your order', color: colors.primary },
  { code: 'FREESHIP', label: 'Free express shipping', color: '#7C3AED' },
];

export default function CartScreen({ cartItems, onBack, onUpdateQty, onRemove }: Props) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const discount = appliedPromo === 'SAVE10' ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const freeShipping = appliedPromo === 'FREESHIP';
  const effectiveShipping = freeShipping ? 0 : shipping;
  const total = subtotal - discount + effectiveShipping;

  const handleCheckout = () => {
    if (checkingOut || cartItems.length === 0) return;
    setCheckingOut(true);
    setTimeout(() => setCheckingOut(false), 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{cartItems.length} items</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (
        /* Empty cart state */
        <View style={styles.emptyCart}>
          <View style={styles.emptyIcon}>
            <View style={styles.emptyCartBody} />
            <View style={styles.emptyCartHandle} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items you like to your cart and check out</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={onBack}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Delivery banner */}
            <View style={styles.deliveryBanner}>
              <Text style={styles.deliveryIcon}>🚚</Text>
              <Text style={styles.deliveryText}>
                {subtotal > 150
                  ? 'You qualify for FREE delivery!'
                  : `Add $${(150 - subtotal).toFixed(0)} more for free delivery`}
              </Text>
            </View>

            {/* Cart items */}
            {cartItems.map((item) => (
              <View key={`${item.id}-${item.selectedColor}-${item.size}`} style={styles.cartItem}>
                {/* Product image */}
                <View style={styles.itemImage}>
                  <View style={[styles.itemImageBg, { backgroundColor: item.selectedColor, opacity: 0.3 }]} />
                  <Text style={styles.itemImageLabel}>{item.category[0]}</Text>
                </View>

                {/* Item details */}
                <View style={styles.itemInfo}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <TouchableOpacity
                      onPress={() => onRemove(item.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${item.name} from cart`}
                    >
                      <Text style={styles.removeBtn}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>

                  {/* Variant */}
                  <View style={styles.variantRow}>
                    <View style={[styles.colorDot, { backgroundColor: item.selectedColor }]} />
                    <Text style={styles.variantText}>Size: {item.size}</Text>
                  </View>

                  {/* Price + Qty */}
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
                    <View style={styles.qtyControl}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQty(item.id, Math.max(0, item.quantity - 1))}
                        accessibilityRole="button"
                        accessibilityLabel="Decrease quantity"
                      >
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQty(item.id, item.quantity + 1)}
                        accessibilityRole="button"
                        accessibilityLabel="Increase quantity"
                      >
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* Promo codes */}
            <View style={styles.promoSection}>
              <Text style={styles.promoTitle}>Available Offers</Text>
              <View style={styles.promoBanners}>
                {PROMOS.map((promo) => (
                  <TouchableOpacity
                    key={promo.code}
                    style={[styles.promoBanner, appliedPromo === promo.code && { borderColor: promo.color, borderWidth: 2 }]}
                    onPress={() => setAppliedPromo(appliedPromo === promo.code ? null : promo.code)}
                  >
                    <View style={[styles.promoColorBar, { backgroundColor: promo.color }]} />
                    <View style={styles.promoContent}>
                      <Text style={[styles.promoCode, { color: promo.color }]}>{promo.code}</Text>
                      <Text style={styles.promoLabel}>{promo.label}</Text>
                    </View>
                    <View style={[styles.promoCheck, appliedPromo === promo.code && { backgroundColor: promo.color }]}>
                      <Text style={[styles.promoCheckText, appliedPromo === promo.code && { color: '#fff' }]}>✓</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Order summary */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              {[
                { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                { label: 'Shipping', value: effectiveShipping === 0 ? 'FREE' : `$${effectiveShipping.toFixed(2)}`, green: effectiveShipping === 0 },
                ...(discount > 0 ? [{ label: `Promo (${appliedPromo})`, value: `-$${discount.toFixed(2)}`, green: true }] : []),
              ].map(({ label, value, green }) => (
                <View key={label} style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{label}</Text>
                  <Text style={[styles.summaryValue, green && styles.summaryGreen]}>{value}</Text>
                </View>
              ))}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Payment methods */}
            <View style={styles.payMethods}>
              <Text style={styles.payLabel}>Secure Checkout</Text>
              <View style={styles.payIcons}>
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((method) => (
                  <View key={method} style={styles.payIcon}>
                    <Text style={styles.payIconText}>{method}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Checkout CTA */}
          <View style={styles.checkoutBar}>
            <View style={styles.checkoutTotal}>
              <Text style={styles.checkoutTotalLabel}>Total</Text>
              <Text style={styles.checkoutTotalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.checkoutBtn, checkingOut && styles.checkoutBtnProcessing]}
              onPress={handleCheckout}
              disabled={checkingOut}
              accessibilityRole="button"
              accessibilityLabel="Proceed to checkout"
            >
              <Text style={styles.checkoutBtnText}>
                {checkingOut ? 'Processing...' : 'Checkout →'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  itemCountBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#D1FAE5',
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deliveryIcon: { fontSize: 18 },
  deliveryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.card,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  itemImageBg: {
    position: 'absolute',
    inset: 0,
  },
  itemImageLabel: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBrand: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  removeBtn: {
    fontSize: 12,
    color: colors.textMuted,
    padding: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 19,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  variantText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 22,
  },
  qtyValue: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  promoSection: {
    gap: spacing.sm,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  promoBanners: {
    gap: spacing.sm,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  promoColorBar: {
    width: 4,
    height: '100%',
    minHeight: 60,
  },
  promoContent: {
    flex: 1,
    padding: spacing.md,
  },
  promoCode: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  promoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  promoCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promoCheckText: {
    fontSize: 13,
    color: colors.border,
    fontWeight: '700',
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.xxl,
    gap: 10,
    ...shadows.card,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  summaryGreen: {
    color: colors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  payMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  payLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  payIcons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  payIcon: {
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  payIconText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: 28,
    ...shadows.nav,
  },
  checkoutTotal: {
    flex: 1,
  },
  checkoutTotalLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  checkoutTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  checkoutBtn: {
    flex: 2,
    backgroundColor: colors.cta,
    borderRadius: radius.xl,
    paddingVertical: 14,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
    ...shadows.ctaButton,
  },
  checkoutBtnProcessing: {
    backgroundColor: colors.primary,
  },
  checkoutBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  // Empty state
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  emptyIcon: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyCartHandle: {
    width: 40,
    height: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.border,
    borderBottomWidth: 0,
    marginBottom: -1,
  },
  emptyCartBody: {
    width: 64,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 3,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  shopBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    minHeight: 52,
    justifyContent: 'center',
    ...shadows.button,
  },
  shopBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
