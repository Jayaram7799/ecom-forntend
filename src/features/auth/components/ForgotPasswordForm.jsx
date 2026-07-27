import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailExist } from "../services/authApi";

import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import FormWrapper from "../../../components/FormWrapper";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ validation
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await checkEmailExist(email);

      if (response.success) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setError("Email not registered");
    }
  };

  return (
    <FormWrapper title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <ErrorMessage message={error} />

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" text="Next" />
      </form>
    </FormWrapper>
  );
};

export default ForgotPasswordForm;
