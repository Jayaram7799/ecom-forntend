import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, getMyProfile } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";
import AuthSwitch from "./AuthSwitch";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      console.log("Form Data:", form);

      // API Call
      const response = await loginUser(form);

      console.log("Login Response:", response);

      // Success
      if (response.success) {
        const { accessToken, userId } = response.data;

        // Store token & userId
        localStorage.setItem("token", accessToken);
        // Fetch logged-in user details
        const profileResponse = await getMyProfile(accessToken);
        setUser(profileResponse.data);

        // Store in Context
        setUser(profileResponse.data);

        toast.success(response.message, {
          autoClose: 1000,
        });

        toast.success(response.message, {
          autoClose: 1000,
        });

        // Navigate to home page
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);

      const message = err.response?.data?.message || "Login failed";

      setError(message);

      toast.error(message, {
        autoClose: 800,
      });
    }
  };

  return (
    <FormWrapper title="Sign In">
      <form onSubmit={handleSubmit}>
        <ErrorMessage message={error} />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" text="Login" />

        <AuthSwitch variant="login" />
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
