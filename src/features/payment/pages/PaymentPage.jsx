import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import apiClient from "../../../services/apiClient";
import CartContext from "../../../context/CartContext";

const PaymentPage = () => {
  const navigate = useNavigate();

  const { removePurchasedItems } = useContext(CartContext);

  const { state: payment } = useLocation();

  const selectedItems = payment?.selectedItems || [];

  const opened = useRef(false);

  useEffect(() => {
    if (!payment) {
      navigate("/");
      return;
    }

    if (!opened.current) {
      opened.current = true;
      openRazorpay();
    }
  }, []);

  const openRazorpay = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: Number(payment.amount) * 100,

      currency: "INR",

      order_id: payment.razorpayOrderId,

      name: "E-Commerce Store",

      description: "Order Payment",

      prefill: {
        name: "Customer",
        email: "",
        contact: "",
      },

      theme: {
        color: "#1976d2",
      },

      handler: async (razorpayResponse) => {
        const loadingToast = toast.loading("Verifying payment...");

        try {
          const verifyResponse = await apiClient.post("/api/payments/verify", {
            razorpayOrderId: razorpayResponse.razorpay_order_id,
            razorpayPaymentId: razorpayResponse.razorpay_payment_id,
            razorpaySignature: razorpayResponse.razorpay_signature,
          });

          toast.dismiss(loadingToast);

          if (selectedItems.length > 0) {
            const productIds = selectedItems.map((item) => item.productId);

            console.log("Purchased Product IDs:", productIds);

            await removePurchasedItems(productIds);
          }
          console.log("Payment Verified:", verifyResponse.data);

          toast.success(verifyResponse.data.messsage || "Payment Successful", {
            autoClose: 2000,
          });

          setTimeout(() => navigate("/orders"), 1500);
        } catch (e) {
          toast.dismiss(loadingToast);

          console.error(e);

          toast.error(
            e.response?.data?.message ||
              e.response?.data ||
              "Payment Verification Failed",
          );
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment Cancelled");

          navigate("/cart");
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      toast.error(response.error.description || "Payment Failed");

      navigate("/cart");
    });

    razorpay.open();
  };

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "600",
      }}
    >
      Redirecting to Razorpay...
    </div>
  );
};

export default PaymentPage;
