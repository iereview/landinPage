"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Services = () => {
  return (
    <Section id="services">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariant}
        custom={0}
      >
        <Heading>
          Our <span>Services</span>
        </Heading>
        <Subheading>
          We offer comprehensive guidance throughout your NEET journey, from exam preparation
          to college selection.
        </Subheading>
      </motion.div>

      <CardGrid>
        {[
          {
            icon: "/icons/personlized.png",
            title: "Personalized NEET Counseling",
            text: "One-on-one sessions with expert counselors from TIER, tailored to your specific needs and goals.",
          },
          {
            icon: "/icons/Career.png",
            title: "Career Path Guidance",
            text: "Long-term career planning advice to help you navigate specializations and future opportunities in medicine.",
          },
          {
            icon: "/icons/College.png",
            title: "College Selection Assistance",
            text: "Guidance on choosing the right medical college based on your score, preferences, location, and future prospects.",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            custom={index + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
          >
            <ServiceCard whileHover={{ scale: 1.03 }}>
              <IconWrapper>
                <Image src={service.icon} alt={service.title} width={48} height={48} />
              </IconWrapper>
              <CardTitle>{service.title}</CardTitle>
              <CardText>{service.text}</CardText>
            </ServiceCard>
          </motion.div>
        ))}
      </CardGrid>

      <motion.div
        custom={4}
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BottomBox>
          <BottomTitle>Ready to start your NEET success journey?</BottomTitle>
          <BottomText>
            Book a session with our expert counselors and take the first step toward your medical career.
          </BottomText>
          <Link href="#contact" passHref>
            <SessionButton as="a">Book a Session Now</SessionButton>
          </Link>
        </BottomBox>
      </motion.div>
    </Section>
  );
};

export default Services;

// Styled Components

const Section = styled.section`
  background-color: #FAF9FE;
  padding: clamp(40px, 6vw, 80px) clamp(20px, 8vw, 150px);
  text-align: center;
  font-family: "Inter", sans-serif;

    @media (max-width: 1024px) {
    padding: 64px 48px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
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
`;

const Subheading = styled.p`
  color: #666;
  font-size: clamp(14px, 2vw, 18px);
  max-width: 680px;
  margin: 0 auto 48px;

  @media (max-width: 480px) {
    margin-bottom: 32px;
    padding: 0 12px;
  }
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(12px, 3vw, 24px);
  flex-wrap: wrap;
  margin-bottom: clamp(32px, 6vw, 64px);
`;

const ServiceCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  padding: clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px);
  max-width: 370px;
  width: 100%;
  text-align: left;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 16px 12px;
  }
`;

const IconWrapper = styled.div`
  border-radius: 8px;
  margin-bottom: clamp(16px, 3vw, 24px);
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: clamp(16px, 2vw, 20px);
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #555;
  line-height: 1.6;
`;

const BottomBox = styled.div`
  background: #fff;
  padding: clamp(24px, 4vw, 42px) clamp(20px, 5vw, 34px);
  border-radius: 12px;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const BottomTitle = styled.h4`
  font-size: clamp(18px, 3vw, 24px);
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 15px;
`;

const BottomText = styled.p`
  color: #555;
  font-size: clamp(14px, 2vw, 18px);
  font-family: "Inter", sans-serif;
  font-weight: 400;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const SessionButton = styled.a`
  display: inline-block;
  padding: 0.7rem 1.5rem;
  background-color: #9B87F5;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background-color: #7c5dc7;
    box-shadow: 0 4px 12px rgba(159, 122, 234, 0.6);
  }
`;
