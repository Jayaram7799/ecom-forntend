import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";
import AuthSwitch from "./AuthSwitch";
import { signupUser } from "../services/authApi";

const SignupForm = () => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (newUser) => {
    setApiError("");

    try {
      setLoading(true);

      const response = await signupUser(newUser);

      console.log("Signup response:", response);

      if (response?.status === 201) {
        navigate("/activate", {
          state: { email: newUser.email },
        });
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
    <FormWrapper title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={apiError} />

        {/* Name */}
        <InputField
          label="Name"
          autoComplete="name"
          {...register("name", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        <p className="text-danger">{errors?.name?.message}</p>

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        <p className="text-danger">{errors?.email?.message}</p>

        {/* Phone */}
        <InputField
          label="Phone"
          type="tel"
          autoComplete="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(\+91)?[6-9]\d{9}$/,
              message: "Invalid phone number",
            },
          })}
        />
        <p className="text-danger">{errors?.phone?.message}</p>

        {/* Submit */}
        <Button
          type="submit"
          text={loading ? "Processing..." : "Continue"}
          disabled={loading}
        />

        <AuthSwitch variant="signup" />
      </form>
    </FormWrapper>
  );
};

export default SignupForm;
