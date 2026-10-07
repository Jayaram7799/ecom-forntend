import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, getMyProfile } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";
import AuthSwitch from "./AuthSwitch";

import UserContext from "../../../context/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // Handle Input Change
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Handle Login
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const loginResponse = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("Login Response:", loginResponse);

      // ==============================
      // Login Success
      // ==============================

      if (loginResponse?.success) {
        const { accessToken } = loginResponse.data;

        // Store JWT
        localStorage.setItem("token", accessToken);

        // ==============================
        // Get Logged-in User Profile
        // ==============================

        const profileResponse = await getMyProfile();

        console.log("Profile Response:", profileResponse);

        if (profileResponse?.success) {
          setUser(profileResponse.data);
        }

        // Success Toast
        toast.success(loginResponse?.message || "Login successful", {
          autoClose: 1500,
        });

        // Navigate after login
        navigate("/");

        return;
      }

      // API returned success=false
      const message = loginResponse?.message || "Login failed";

      setError(message);

      toast.error(message);
    } catch (err) {
      console.error("Login Error:", err);

      const message =
        err?.response?.data?.message || "Invalid email or password";

      setError(message);

      toast.error(message, {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Sign In">
      <form onSubmit={handleSubmit}>
        <ErrorMessage message={error} />

        {/* Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        {/* Password */}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        {/* Forgot Password */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "10px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login */}
        <Button
          type="submit"
          text={loading ? "Signing in..." : "Login"}
          disabled={loading}
        />

        {/* Signup */}
        <AuthSwitch variant="login" />
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
