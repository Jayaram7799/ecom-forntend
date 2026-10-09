import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import {
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  ExpandMore,
} from "@mui/icons-material";

import Navbar from "../components/Navbar";

const initialForm = {
  name: "",
  email: "",
  subject: "Order Support",
  message: "",
};

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Open My Orders in your account and select the order you want to track.",
  },
  {
    question: "How do I request a return or refund?",
    answer:
      "Visit My Orders, select the eligible order, and follow the return or refund instructions.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Use the Forgot Password option on the login page and follow the instructions sent to your email.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Submit the contact form on this page or use the support email and phone details listed here.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setSubmitted(false);
      return;
    }

    // Demo only: connect your Spring Boot contact API here.
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(120deg, #eaf3ff 0%, #f8fbff 60%, #fff4e8 100%)",
          py: { xs: 6, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
            letterSpacing={2}
          >
            CUSTOMER SUPPORT
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{ fontSize: { xs: "2.5rem", md: "3.8rem" }, mt: 1 }}
          >
            Let's talk.
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 650, mt: 2, lineHeight: 1.8, fontWeight: 400 }}
          >
            Have a question about an order, product, or payment? Send us a
            message. We'd love to help.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Typography variant="h5" fontWeight={800} gutterBottom>
                  Send Us a Message
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Complete the form and tell us how we can help.
                </Typography>

                {submitted && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Your form passed validation. Connect the backend API to
                    submit your message to our support team.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      required
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      required
                    />

                    <TextField
                      select
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <MenuItem value="Order Support">Order Support</MenuItem>
                      <MenuItem value="Returns & Refunds">
                        Returns & Refunds
                      </MenuItem>
                      <MenuItem value="Payment Issue">Payment Issue</MenuItem>
                      <MenuItem value="Product Enquiry">
                        Product Enquiry
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      label="Your Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={errors.message}
                      placeholder="Tell us how we can help..."
                      required
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                bgcolor: "#f1f7ff",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Typography variant="h5" fontWeight={800} gutterBottom>
                  Get in Touch
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Choose the channel that works best for you.
                </Typography>

                <Stack spacing={3.5}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <LocationOnOutlined color="primary" fontSize="large" />

                    <Box>
                      <Typography fontWeight={700}>Our Office</Typography>
                      <Typography color="text.secondary" lineHeight={1.8}>
                        Add your business address here
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <PhoneOutlined color="primary" fontSize="large" />

                    <Box>
                      <Typography fontWeight={700}>Call Us</Typography>
                      <Typography color="text.secondary">
                        Add your support phone number
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update with your business hours
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <EmailOutlined color="primary" fontSize="large" />

                    <Box>
                      <Typography fontWeight={700}>Email Us</Typography>
                      <Typography
                        component="a"
                        href="mailto:support@example.com"
                        sx={{
                          color: "primary.main",
                          textDecoration: "none",
                          overflowWrap: "anywhere",
                        }}
                      >
                        support@example.com
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    mt: 5,
                    p: 2.5,
                    bgcolor: "white",
                    borderRadius: 3,
                  }}
                >
                  <Typography fontWeight={700} gutterBottom>
                    We're here to help
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    For order-specific questions, keep your order ID ready so
                    our team can assist you more quickly.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 7, md: 9 } }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Frequently Asked Questions
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Quick answers to common questions.
          </Typography>

          {faqs.map((faq) => (
            <Accordion
              key={faq.question}
              elevation={0}
              sx={{
                mb: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px !important",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography color="text.secondary" lineHeight={1.8}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
}
