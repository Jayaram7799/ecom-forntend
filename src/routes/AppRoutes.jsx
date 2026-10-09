import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// ==============================
// Authentication Pages
// ==============================

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));

const SignupPage = lazy(() => import("../features/auth/pages/SignupPage"));

const ActivateAccountPage = lazy(
  () => import("../features/auth/pages/ActivateAccountPage"),
);

const ForgotPasswordPage = lazy(
  () => import("../features/auth/pages/ForgotPasswordPage"),
);

const ResetPasswordPage = lazy(
  () => import("../features/auth/pages/ResetPasswordPage"),
);

const AboutPage = lazy(() => import("../pages/AboutPage"));

const ContactPage = lazy(() => import("../pages/ContactPage"));

// ==============================
// Home
// ==============================

const HomePage = lazy(() => import("../features/home/pages/HomePage"));

// ==============================
// Products
// ==============================

const ProductsPage = lazy(
  () => import("../features/products/pages/ProductsPage"),
);

const ProductDetailsPage = lazy(
  () => import("../features/products/pages/ProductDetailsPage"),
);

// ==============================
// Cart
// ==============================

const CartPage = lazy(() => import("../features/cart/pages/CartPage"));

// ==============================
// Address
// ==============================

const AddressPage = lazy(
  () => import("../features/address/pages/AddAddressPage"),
);

// ==============================
// Payment
// ==============================

const PaymentPage = lazy(() => import("../features/payment/pages/PaymentPage"));

// ==============================
// Orders
// ==============================

const OrdersPage = lazy(() => import("../features/order/pages/OrdersPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* =========================================
            PUBLIC / AUTH ROUTES
        ========================================= */}

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/activate" element={<ActivateAccountPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* =========================================
            PROTECTED ROUTES
        ========================================= */}

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

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
