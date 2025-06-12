"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    icon: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Cal.png",
    title: "Schedule Your Consultation",
    description:
      "Book a free session through Calendly with our expert counselors at your preferred time.",
  },
  {
    icon: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/User.png",
    title: "Receive Personalized Counseling",
    description:
      "Get advice on your NEET strategy, exam preparation, and college selection tailored to your needs.",
  },
  {
    icon: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/University.png",
    title: "Explore College Options",
    description:
      "We'll help you identify the best colleges based on your NEET score, preferences, and location.",
  },
   {
    icon: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Support.png",
    title: "College Application Assistance ",
    description:
      "Receive continuous assistance throughout the NEET process, ensuring you're always on the right track.",
  },
  {
    icon: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Support.png",
    title: "Ongoing Support",
    description:
      "Receive continuous assistance throughout the NEET process, ensuring you're always on the right track.",
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Wrapper id="how-it-works" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Heading as={motion.h2} variants={itemVariants}>
          How We <Highlight>Help You</Highlight>
        </Heading>
        <Subheading as={motion.p} variants={itemVariants}>
          Our process is designed to make your NEET journey smooth and successful with expert guidance at every step.
        </Subheading>

        <CardGrid as={motion.div} variants={containerVariants}>
          {steps.map((step, index) => (
            <Card key={index} as={motion.div} variants={itemVariants}>
              <IconWrapper>
                <Image src={step.icon} alt={step.title} width={64} height={64} />
              </IconWrapper>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </Card>
          ))}
        </CardGrid>
        
        <Link href="#contact" passHref>
          <CTAButton
            as={motion.button}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image src="https://d2coadv2i0didl.cloudfront.net/public/public/icons/Calendar.png" alt="Calendar Icon" width={20} height={20} />
            <span>Get Started</span>
          </CTAButton>
        </Link>
      </motion.div>
    </Wrapper>
  );
};

export default HowItWorks;

// Styled Components

const Wrapper = styled.section`
  background: #803F9833;
  text-align: center;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }

  @media (max-width: 480px) {
    padding: 30px 12px;
  }
`;

const Heading = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: #1f1f1f;
  font-family: "Poppins", sans-serif;
  margin-bottom: 12px;

  span {
    background: linear-gradient(90deg, #9B87F5, #7E69AB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Highlight = styled.span`
  color: #9b6aff;
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
    max-width: 90%;
    font-size: 16px;
    margin-bottom: 36px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto 40px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 28px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-bottom: 8px;
  color: #020817;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CardDescription = styled.p`
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #4b5563;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CTAButton = styled.button`
  background: #803F98;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 18px;
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #8d5fe0;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 28px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 24px;
  }
`;
