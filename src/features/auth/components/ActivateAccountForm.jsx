import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { activateAccount } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";

const ActivateAccountForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email;

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromState || "",
      temporaryPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Set email automatically when coming from registration page
  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      const response = await activateAccount(data);

      if (response?.success) {
        toast.success("Account activated successfully!", {
          position: "top-right",
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      const message = response?.message || "Account activation failed";

      setApiError(message);

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Account activation error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      setApiError(message);

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Activate Your Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={apiError} />

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          readOnly={!!emailFromState}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <p className="text-danger">{errors?.email?.message}</p>

        {/* Temporary Password */}
        <InputField
          label="Temporary Password"
          type="password"
          autoComplete="off"
          {...register("temporaryPassword", {
            required: "Temporary password is required",
          })}
        />

        <p className="text-danger">{errors?.temporaryPassword?.message}</p>

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
          text={loading ? "Activating..." : "Activate Account"}
          disabled={loading}
        />
      </form>
    </FormWrapper>
  );
};

export default ActivateAccountForm;
