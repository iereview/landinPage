"use client";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";

const counselors = [
  {
    name: "Giri Sripathi",
    title: "Lead Counselor & Founder",
    description:
      "With over 15 years of experience in NEET counseling and medical education, Giri has helped thousands of students secure admissions in top medical colleges.",
    image: "/placeholder.png",
  },
  {
    name: "Ms. Nita Siju",
    title: "Medical Education Specialist",
    description:
      "A former medical college professor with extensive knowledge of the NEET selection process and medical curriculum across India.",
    image: "/placeholder.png",
  },
  {
    name: "Mr. Surya Sripathi",
    title: "Career Strategy Expert",
    description:
      "Specializes in helping students identify the best medical colleges based on their scores, preferences, and career aspirations.",
    image: "/placeholder.png",
  },
  {
    name: "Dr. Ananya Patel",
    title: "Exam Preparation Advisor",
    description:
      "Focuses on exam strategies and preparation techniques to help students maximize their NEET scores and opportunities.",
    image: "/placeholder.png",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const CounselorsSection = () => {
  return (
    <Section id="counselors">
      <Container>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Heading>
            Our <span>Expert Counselors</span>
          </Heading>
          <Subtext>
            Led by Giri Sripathi and supported by our experienced TIER counselors, we offer personalized NEET guidance every step of the way.
          </Subtext>
        </motion.div>

        <Grid>
          {counselors.map((counselor, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card>
                <ImageWrapper>
  <Image
    src={counselor.image}
    alt={counselor.name}
    fill
    style={{ borderRadius: "8px", objectFit: "cover" }}
  />
</ImageWrapper>
                <Info>
                  <Name>{counselor.name}</Name>
                  <Title>{counselor.title}</Title>
                  <Description>{counselor.description}</Description>
                </Info>
              </Card>
            </motion.div>
          ))}
        </Grid>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={counselors.length + 1}
        >
          <Note>
            Our team has helped thousands of students navigate the complexities of NEET admissions and college selection. With our guidance, you're in safe hands.
          </Note>
        </motion.div>
      </Container>
    </Section>
  );
};

export default CounselorsSection;



// Styled Components
const Section = styled.section`
  padding: 80px 150px;
  background: #fff;
  font-family: "Inter", sans-serif;

    @media (max-width: 1024px) {
    padding: 64px 48px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin-bottom: 12px;
  color: #1f1f1f;

  span {
    background: linear-gradient(90deg, #9B87F5, #7E69AB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
`;


const Subtext = styled.p`
  text-align: center;
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 400;
  font-family: "Inter", sans-serif;
  color: #4B5563;
  max-width: 720px;
  margin: 0 auto 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  background: #Ffffff;
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;   
  width: 100%;
  height: 220px;
  background: #eaeaea;

    @media (max-width: 1024px) {
     height: 280px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }

`;

const Info = styled.div`
  padding: 20px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 4px;
`;

const Title = styled.p`
  font-size: 14px;
  color: #9B87F5;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  color: #4B5563;
  line-height: 1.5;
`;

const Note = styled.div`
  max-width: 760px;
  margin: 48px auto 0;
  padding: 16px 24px;
  background: #FEF7CD33;
  border-radius: 12px;
  font-size: clamp(14px, 1.8vw, 18px);
  font-weight: 400;
  font-family: "Inter", sans-serif;
  text-align: center;
  color: #444;

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

