/**
 * ShopApp — E-Commerce Mobile UI
 *
 * Design System:
 *   Colors:     Success Green (#059669) + Urgency Orange (#F97316)
 *   Typography: Rubik (headings) / Nunito Sans (body)
 *   Style:      Vibrant & Block-based
 *
 * Screens:
 *   - HomeScreen        — Hero banners, categories, product grid, search
 *   - ProductDetailScreen — Images, variants, reviews, add-to-cart
 *   - CartScreen        — Cart items, promo codes, order summary, checkout
 *   - ProfileScreen     — User stats, loyalty points, settings menu
 *
 * UX Compliance:
 *   ✓ 44×44px minimum touch targets
 *   ✓ 8px+ gap between adjacent touch targets
 *   ✓ accessibilityRole + accessibilityLabel on all interactive elements
 *   ✓ Loading/processing states prevent double-submission
 *   ✓ Empty states for cart and search
 *   ✓ Text contrast ≥ 4.5:1 (WCAG AA)
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BottomTabBar, { TabName } from './src/navigation/BottomTabBar';
import { colors } from './src/theme';
import { Product, CartItem, products } from './src/data/products';

type Screen = 'home' | 'detail' | 'cart' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleTabPress = useCallback((tab: TabName) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setScreen('cart');
    } else if (tab === 'profile') {
      setScreen('profile');
    } else {
      setScreen('home');
    }
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    setScreen('detail');
  }, []);

  const handleAddToCart = useCallback((product: Product, color?: string, size?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === (color ?? product.colors[0]) &&
          item.size === (size ?? 'M')
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], quantity: updated[existingIdx].quantity + 1 };
        return updated;
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedColor: color ?? product.colors[0],
          size: size ?? 'M',
        },
      ];
    });
  }, []);

  const handleUpdateQty = useCallback((id: string, qty: number) => {
    if (qty === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showBottomBar = screen !== 'detail';

  return (
    <View style={styles.root}>
      {/* Screen content */}
      <View style={styles.content}>
        {screen === 'home' && (
          <HomeScreen
            onProductPress={handleProductPress}
            onAddToCart={handleAddToCart}
            cartCount={cartCount}
            onCartPress={() => { setScreen('cart'); setActiveTab('cart'); }}
          />
        )}
        {screen === 'detail' && selectedProduct && (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setScreen('home')}
            onAddToCart={handleAddToCart}
          />
        )}
        {screen === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onBack={() => { setScreen('home'); setActiveTab('home'); }}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
          />
        )}
        {screen === 'profile' && (
          <ProfileScreen onCartPress={() => { setScreen('cart'); setActiveTab('cart'); }} />
        )}
      </View>

      {/* Bottom tab bar */}
      {showBottomBar && (
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
          cartCount={cartCount}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
