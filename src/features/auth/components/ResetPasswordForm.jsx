import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { resetPassword } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";

const ResetPasswordForm = () => {
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
    },
  });

  //  Set email automatically
  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  const onSubmit = async (data) => {
    setApiError("");

    try {
      setLoading(true);

      const response = await resetPassword(data);

      if (response?.success) {
        alert("Account activated successfully!");
        navigate("/");
      } else {
        setApiError(response?.message);
      }
    } catch (err) {
      console.error(err);
      setApiError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Activate Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={apiError} />

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          readOnly //  optional (recommended)
          {...register("email", {
            required: "Email is required",
          })}
        />
        <p className="text-danger">{errors?.email?.message}</p>
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

export default ResetPasswordForm;
