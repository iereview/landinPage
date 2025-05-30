"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    title: "Basic",
    price: "₹2,999",
    description: "Essential counseling for students who need core guidance",
    features: [
      "One 60-minute counseling session",
      "Basic NEET strategy planning",
      "Top 20 college recommendations",
      "Email support for 1 week",
    ],
    buttonText: "Choose Basic",
  },
  {
    title: "Premium",
    price: "₹7,999",
    description: "Comprehensive support for serious NEET aspirants",
    features: [
      "Three 60-minute counseling sessions",
      "Detailed NEET strategy planning",
      "Personalized college recommendations",
      "Application assistance for up to 5 colleges",
      "Email & phone support for 1 month",
      "Access to exclusive resources",
    ],
    buttonText: "Choose Premium",
    highlight: true,
  },
  {
    title: "Complete",
    price: "₹14,999",
    description: "End-to-end guidance throughout your NEET journey",
    features: [
      "Six 60-minute counseling sessions",
      "Comprehensive NEET strategy planning",
      "Complete college selection guidance",
      "Full application support for all colleges",
      "Document verification assistance",
      "Priority email & phone support for 3 months",
      "Post-admission guidance",
      "One session with field specialists",
    ],
    buttonText: "Choose Complete",
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
                    <img src="/icons/tick.png" alt="tick" />
                    {feature}
                  </Feature>
                ))}
              </FeatureList>
            </CardContent>
            <Button
              $highlight={plan.highlight}
              onClick={() => handlePlanSelect(plan)}
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

      {/* Payment confirmation modal */}
      {isPaymentOpen && selectedPlan && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            as={motion.div}
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
          >
            <ModalHeader>
              <h3>{selectedPlan.title} Plan</h3>
              <CloseButton onClick={handlePaymentCancel}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>
                You're about to confirm your selection of the <strong>{selectedPlan.title}</strong> plan for{" "}
                <strong>{selectedPlan.price}</strong>.
              </p>
            </ModalBody>
            <ModalFooter>
              <PrimaryButton onClick={handlePaymentSuccess}>Confirm & Pay</PrimaryButton>
              <SecondaryButton onClick={handlePaymentCancel}>Cancel</SecondaryButton>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}

      {/* Payment status modal (success or failure) */}
      {paymentStatus && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            as={motion.div}
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
          >
            <ModalHeader
              style={{
                background: paymentStatus === "success" ? "#34d399" : "#f87171",
              }}
            >
              <h3>{paymentStatus === "success" ? "Payment Successful" : "Payment Failed"}</h3>
              <CloseButton onClick={closeStatusModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody style={{ textAlign: "center" }}>
              {paymentStatus === "success" ? (
                <>
                  <SuccessIcon
                    viewBox="0 0 52 52"
                    aria-label="Success checkmark"
                    role="img"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <motion.path
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 27l7 7 16-16"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </SuccessIcon>
                  <p>Thank you for your payment. Your plan is now active.</p>
                </>
              ) : (
                <>
                  <FailureIcon
                    viewBox="0 0 52 52"
                    aria-label="Failure cross"
                    role="img"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                    />
                    <motion.line
                      x1="16"
                      y1="16"
                      x2="36"
                      y2="36"
                      stroke="#f87171"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <motion.line
                      x1="36"
                      y1="16"
                      x2="16"
                      y2="36"
                      stroke="#f87171"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
                    />
                  </FailureIcon>
                  <p>
                    Sorry, your payment could not be processed. Please try again.
                  </p>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <PrimaryButton onClick={closeStatusModal}>Close</PrimaryButton>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}
    </Wrapper>
  );
}


// Animated success icon
const SuccessIcon = styled.svg`
  width: 96px;
  height: 96px;
  margin: 0 auto 20px;
  display: block;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: ${draw} 0.7s forwards;
`;


const FailureIcon = styled.svg`
  width: 96px;
  height: 96px;
  margin: 0 auto 20px;
  display: block;
  stroke-dasharray: 150;
  stroke-dashoffset: 150;
  animation: ${crossDraw} 0.5s forwards;
`;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal = styled.div`
  background: #ffffff;
  width: 90%;
  max-width: 420px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  background: linear-gradient(90deg, #9b87f5, #7e69ab);
  color: white;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 20px;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 24px;
  font-size: 16px;
  color: #374151;

  p {
    margin: 0;
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  background-color: #f9fafb;
`;

const PrimaryButton = styled.button`
  background: #7e69ab;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #6a57a5;
  }
`;

const SecondaryButton = styled.button`
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #d1d5db;
  }
`;


// Styled components remain unchanged
const Wrapper = styled.section`
  padding: 80px 24px;
  background: #ffffff;
  text-align: center;

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
  justify-content: flex-start;
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
    /* On large screens, disable scroll and use wrapping grid */
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
  background: ${({ $highlight }) => ($highlight ? "#9B87F5" : "#7E69AB")};
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
