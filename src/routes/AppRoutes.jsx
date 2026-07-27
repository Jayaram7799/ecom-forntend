import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Auth
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("../features/auth/pages/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("../features/auth/pages/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("../features/auth/pages/ResetPasswordPage"),
);

// Home
const HomePage = lazy(() => import("../features/home/pages/HomePage"));

// Products
const ProductsPage = lazy(
  () => import("../features/products/pages/ProductsPage"),
);
const ProductDetailsPage = lazy(
  () => import("../features/products/pages/ProductDetailsPage"),
);

// Cart
const CartPage = lazy(() => import("../features/cart/pages/CartPage"));

// Address
const AddressPage = lazy(
  () => import("../features/address/pages/AddAddressPage"),
);

// Payment
const PaymentPage = lazy(() => import("../features/payment/pages/PaymentPage"));

const OrdersPage = lazy(() => import("../features/order/pages/OrdersPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <AddressPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
