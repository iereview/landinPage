'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <Section id="about">
      <Container>
        <MotionImageContainer
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <ImagePlaceholder />
          <MotionBadge
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4>1000+</h4>
            <p>Students Counseled</p>
          </MotionBadge>
        </MotionImageContainer>

        <MotionTextContent
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Title>What is Predicto?</Title>
          <Description>
            Predicto is a specialized NEET counseling assistance service designed to guide students and parents through the complexities of the NEET admission process and college selection. Our mission is simple: to empower you with the knowledge, tools, and personalized support you need to make informed decisions about your MBBS journey.
          </Description>
          <SubTitle>Why Choose Predicto?</SubTitle>
          <List>
            <li>Expert counselors with years of experience in NEET guidance</li>
            <li>Personalized approach tailored to your specific needs and goals</li>
            <li>Comprehensive support throughout the entire NEET journey</li>
            <li>Direct access to Giri Sripathi and TIER's expert team</li>
            <li>Proven track record of successful student placements</li>
          </List>
           <Link href="#services" passHref>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More About Our Services
          </MotionButton>
          </Link>
        </MotionTextContent>
      </Container>
    </Section>
  );
};

export default AboutSection;



// Styled Components
// Updated Styled Components for responsiveness and left-aligned text

export const Section = styled.section`
  padding: 64px 150px;
  background: #fff;

  @media (max-width: 1024px) {
    padding: 64px 48px;
  }

  @media (max-width: 768px) {
    padding: 64px 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 56px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;


export const MotionImageContainer = styled(motion.div)`
  position: relative;
  width: 660px;
  height: 600px;
  background: #eee;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 100%;
    height: 480px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;


export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/placeholder.svg');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
`;

export const MotionBadge = styled(motion.div)`
  position: absolute;
  bottom: -25px;
  right: 35px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(144, 144, 144, 0.1);
  padding: 17px;
  text-align: start;
  font-family: 'Inter', sans-serif;

  h4 {
    margin: 0;
    font-weight: 700;
    color: #7e69ab;
    font-size: 20px;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #7e69ab;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

export const MotionTextContent = styled(motion.div)`
  margin-top: 20px;
  max-width: 600px;
  text-align: left; /* Ensure left alignment */

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 2rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  color: #000;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 2rem;

  li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 0.75rem;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: #444;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 3px;
      width: 16px;
      height: 16px;
      background-image: url('/icons/tick.png');
      background-size: contain;
      background-repeat: no-repeat;

      @media (max-width: 480px) {
        width: 14px;
        height: 14px;
        top: 2px;
      }
    }
  }
`;

export const MotionButton = styled(motion.button)`
  background-color: #9b87f5;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;  /* Increased for desktop */
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #684cc0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.65rem 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 0.55rem 1rem;
  }
`;
