"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    title: "Premium",
    price: "₹10,000",
    description: "Comprehensive support for serious NEET aspirants",
    features: [
      "Three 30-minute counseling sessions",
      "Detailed NEET strategy planning",
      "Personalized college recommendations",
      "Application assistance for up to 5 colleges",
      "Email & phone support for 1 month",
      "Access to exclusive resources",
    ],
    buttonText: "Choose Premium",
    highlight: true,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: i * 0.2,
    },
  }),
};

// Keyframes for tick animation
const draw = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

// Keyframes for cross animation
const crossDraw = keyframes`
  0% {
    stroke-dashoffset: 150;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

export default function PlansSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<null | "success" | "failure">(null);

  useEffect(() => {
    if (scrollRef.current && middleCardRef.current) {
      const scrollContainer = scrollRef.current;
      const card = middleCardRef.current;

      const scrollTo =
        card.offsetLeft -
        scrollContainer.offsetWidth / 2 +
        card.offsetWidth / 2;

      scrollContainer.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, []);

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    setPaymentStatus("success");
  };

  const handlePaymentFailure = () => {
    setIsPaymentOpen(false);
    setPaymentStatus("failure");
  };

  const handlePaymentCancel = () => {
    setIsPaymentOpen(false);
  };

  const closeStatusModal = () => {
    setPaymentStatus(null);
    setSelectedPlan(null);
  };

  return (
    <Wrapper id="plans">
      <Heading
        as={motion.h2}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        Affordable <Highlight>NEET Counseling</Highlight> Packages
      </Heading>
      <Subheading
        as={motion.p}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        We offer flexible, affordable counseling packages to suit your needs.
        Choose the one that works for you and pay securely via Razorpay.
      </Subheading>
      <CardsWrapper
        as={motion.div}
        ref={scrollRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {plans.map((plan, i) => (
          <Card
            as={motion.div}
            key={i}
            custom={i}
            variants={cardVariants}
            $highlight={plan.highlight}
            ref={i === 1 ? middleCardRef : null}
          >
            <CardContent>
              <Title>{plan.title}</Title>
              <Price>{plan.price}</Price>
              <Description>{plan.description}</Description>
              <FeatureList>
                {plan.features.map((feature, j) => (
                  <Feature key={j}>
                    <img src="https://d2coadv2i0didl.cloudfront.net/public/public/icons/tick.png" alt="tick" />
                    {feature}
                  </Feature>
                ))}
              </FeatureList>
            </CardContent>
           <Button
  $highlight={plan.highlight}
  onClick={() => {
    handlePlanSelect(plan);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  {plan.buttonText}
</Button>

          </Card>
        ))}
      </CardsWrapper>
      <Note>
        Need a custom package?{" "}
        <Link href="#contact">
          <ContactLink>Contact us</ContactLink>
        </Link>{" "}
        for personalized options.
      </Note>

    </Wrapper>
  );
}


// Styled components remain unchanged
const Wrapper = styled.section`
  padding: 80px 24px;
  background: url("https://d2coadv2i0didl.cloudfront.net/public/public/BG.png") no-repeat center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ffffff; 
  text-align: center;
  min-height: 100vh;

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;


const Heading = styled.h2`
  font-size: 36px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin-bottom: 12px;
  color: #1f1f1f;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(90deg, #9b87f5, #7e69ab);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const Subheading = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  color: #4b5563;
  max-width: 720px;
  margin: 0 auto 48px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 36px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 28px;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;  /* Changed from flex-start to center */
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-padding: 20px;

  /* Hide scrollbar */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
    overflow-x: visible;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
  }
`;

const Card = styled.div<{ $highlight?: boolean }>`
  background: #fff;
  border-radius: 12px;
  border: 2px solid ${({ $highlight }) => ($highlight ? "#9B87F5" : "#e5e7eb")};
  box-shadow: ${({ $highlight }) =>
    $highlight
      ? "0 12px 24px rgba(139, 92, 246, 0.1)"
      : "0 6px 18px rgba(0, 0, 0, 0.04)"};
  padding: 32px;
  width: 390px; 
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  will-change: transform;
  transition: box-shadow 0.3s ease;

  margin: 0 auto; /* Add this line to center the card horizontally */

  &:hover {
    box-shadow: ${({ $highlight }) =>
      $highlight
        ? "0 20px 40px rgba(139, 92, 246, 0.2)"
        : "0 12px 30px rgba(0, 0, 0, 0.1)"};
  }

  @media (min-width: 1024px) {
    width: 390px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    width: 320px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 24px;
  font-family: "Poppins", sans-serif;
  color: #020817;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Price = styled.p`
  font-size: 30px;
  font-family: "Inter", sans-serif;
  color: #020817;
  font-weight: 700;
  margin: 4px 0 12px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 24px;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #374151;
  margin-bottom: 12px;

  img {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
`;

const Button = styled.button<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => ($highlight ? "#803F98" : "#7E69AB")};
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: auto;

  &:hover {
    background: ${({ $highlight }) => ($highlight ? "#6E4BB9" : "#6E4BB9")};
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 13px;
  }
`;

const Note = styled.p`
  margin-top: 40px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #444;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 32px;
  }
`;

const ContactLink = styled.a`
  color: #9B87F5;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
