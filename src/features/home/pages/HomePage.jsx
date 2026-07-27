import { Box } from "@mui/material";

import Navbar from "../../../components/Navbar";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  return (
    <Box>
      <Navbar />

      <HeroSection />

      <CategorySection />

      <FeaturedProducts />

      <WhyChooseUs />

      <Testimonials />

      <Newsletter />

      <Footer />
    </Box>
  );
};

export default HomePage;
