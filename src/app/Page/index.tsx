import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection>
        <MotionHeroContent
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Tag>#1 NEET Counseling Service</Tag>
          <Title>NEET Counselling Assistance –</Title>
          <Subtitle>Secure Your MBBS Future with Predicto</Subtitle>
          <Description>
            Expert guidance by Giri Sripathy and our team to help you navigate
            the NEET admission process and college selection with confidence.
          </Description>

          <MotionButtons
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="#contact" passHref>
              <PrimaryBtn whileHover={{ scale: 1.05 }}>
                <Image
                  src="/icons/Calendar.png"
                  alt="Calendar Icon"
                  width={16}
                  height={16}
                  style={{ marginRight: "8px" }}
                />
                Book a Free Consultation
              </PrimaryBtn>
            </Link>

            <Link href="#services" passHref>
              <SecondaryBtn whileHover={{ scale: 1.05 }}>
                Explore Our Services →
              </SecondaryBtn>
            </Link>
          </MotionButtons>
        </MotionHeroContent>

        <MotionHeroImage
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/HeroImg.png"
            alt="Hero Illustration"
            width={500}
            height={300}
            style={{
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
              objectFit: "cover",
              width: "100%",
              height: "auto",
            }}
          />
        </MotionHeroImage>
      </HeroSection>
    </>
  );
}

// Styled Components

const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 150px 150px 64px 150px;
  background-color: #fff;
  gap: 32px;

  @media (max-width: 1200px) {
    padding: 120px 80px 48px 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 120px 40px 0px 40px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 120px 20px 0px 20px;
    gap: 16px;
  }
`;

const MotionHeroContent = styled(motion.div)`
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: left;
  }
`;

const MotionButtons = styled(motion.div)`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-start;
  flex-wrap: nowrap;

  @media (max-width: 480px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const MotionHeroImage = styled(motion.div)`
  width: 500px;
  margin-top: 20px;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    max-width: 500px;
  }
`;

const Tag = styled.div`
  display: inline-block;
  background: #9b87f51a;
  color: #7e69ab;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
  margin-bottom: 16px;
  font-family: "Inter", sans-serif;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  color: #000;
  margin: 0 0 12px;
  font-family: "Outfit", sans-serif;

  @media (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
  font-family: "Outfit", sans-serif;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 32px;
  font-family: "Albert Sans", sans-serif;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const PrimaryBtn = styled(motion.button)`
  background: #803F98;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "Albert Sans", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 auto;
  min-width: 160px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 14px;
  }

  &:hover {
    background-color: #7c5dc7;
    box-shadow: 0 4px 12px rgba(159, 122, 234, 0.6);
  }
`;

const SecondaryBtn = styled(motion.button)`
  background: transparent;
  border: 1px solid #803F98;
  color: #803F98;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-family: "Albert Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  flex: 1 1 auto;
  min-width: 160px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 14px;
  }

  &:hover {
    color: #803F98;
    box-shadow: 0 4px 12px rgba(159, 122, 234, 0.6);
    border-color: #7c5dc7;
  }
`;
