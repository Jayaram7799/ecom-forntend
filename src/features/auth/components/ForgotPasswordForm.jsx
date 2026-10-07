import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const email = data.email.trim().toLowerCase();

      const response = await forgotPassword({
        email,
      });

      if (response?.success) {
        const message =
          response?.message ||
          "Password reset link has been sent to your email.";

        console.log("Forgot password success:", response.message);

        setSuccessMessage(message);

        toast.success(message, {
          autoClose: 2000,
        });

        // Navigate to Login page after showing success message
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }

      const message =
        response?.message || "Unable to process password reset request.";

      setApiError(message);
      toast.error(message);
    } catch (err) {
      console.error("Forgot password error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Forgot Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={apiError} />

        {successMessage && <p className="text-success">{successMessage}</p>}

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",

            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },

            setValueAs: (value) => value.trim().toLowerCase(),
          })}
        />

        <p className="text-danger">{errors?.email?.message}</p>

        <Button
          type="submit"
          text={loading ? "Sending..." : "Send Reset Link"}
          disabled={loading}
        />
      </form>
    </FormWrapper>
  );
};

export default ForgotPasswordForm;
