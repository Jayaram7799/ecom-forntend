import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { resetPassword } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Token comes from:
  // /reset-password?token=xxxxxxxx
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setApiError("");

    if (!resetToken) {
      const message =
        "Reset token is missing or invalid. Please use the password reset link from your email.";

      setApiError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        token: resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const response = await resetPassword(requestData);

      if (response?.success) {
        toast.success("Password reset successfully!", {
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      const message = response?.message || "Unable to reset password";

      setApiError(message);
      toast.error(message);
    } catch (err) {
      

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
    <FormWrapper title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={apiError} />

        {/* New Password */}
        <InputField
          label="New Password"
          type="password"
          autoComplete="new-password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <p className="text-danger">{errors?.newPassword?.message}</p>

        {/* Confirm Password */}
        <InputField
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
        />

        <p className="text-danger">{errors?.confirmPassword?.message}</p>

        {/* Submit */}
        <Button
          type="submit"
          text={loading ? "Resetting..." : "Reset Password"}
          disabled={loading}
        />
      </form>
    </FormWrapper>
  );
};

export default ResetPasswordForm;
