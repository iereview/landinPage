"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Prisha Mehta",
    subtext: "NEET 2023, Scored 650+",
    message:
      "Thanks to Predicto and the guidance from Giri sir, I got admission to my dream college. Their personalized approach helped me navigate the complex NEET counseling process with confidence.",
    image: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Prisha.png",
  },
  {
    name: "Anya Desai",
    subtext: "NEET 2023, Secured admission in top medical college",
    message:
      "The counselors at Predicto helped me understand my options based on my NEET score. Their insights were invaluable in making the right college choice for my future.",
    image: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Anya.png",
  },
  {
    name: "Sneha Reddy",
    subtext: "NEET 2022, Now studying at prestigious medical institute",
    message:
      "I was confused about which college to choose, but Predicto's counselors provided detailed insights about different medical colleges, helping me make an informed decision.",
    image: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Sneha.png",
  },
  {
    name: "Rahul Sharma",
    subtext: "Parent of NEET 2023 student",
    message:
      "As parents, we were overwhelmed with the NEET process, but Giri and his team guided us step by step. Their expertise made the journey smooth for our child.",
    image: "https://d2coadv2i0didl.cloudfront.net/public/public/icons/Rahul.png",
  },
];

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: i * 0.15,
    },
  }),
};

const Testimonials = () => {
  return (
    <Section id="testimonials">
      <Heading
        as={motion.h2}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Student <Highlight>Success Stories</Highlight>
      </Heading>

      <Subheading
        as={motion.p}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Join thousands of students who've successfully navigated the NEET process with the
        help of Predicto and TIER's expert guidance.
      </Subheading>

      <CardGrid
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {testimonials.map((t, i) => (
          <Card as={motion.div} key={i} custom={i} variants={cardVariants}>
            <Stars>★★★★★</Stars>
            <Message>"{t.message}"</Message>
            <Divider />
            <Profile>
              <Avatar src={t.image} alt={t.name} onError={(e) => {
                e.currentTarget.src = "/icons/avatar-placeholder.png";
              }} />
              <div>
                <Name>{t.name}</Name>
                <Subtext>{t.subtext}</Subtext>
              </div>
            </Profile>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
};

export default Testimonials;

// Styled Components
const Section = styled.section`
  background: #f9f9fc;
  text-align: center;
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }

  @media (max-width: 480px) {
    padding: 40px 10px;
  }
`;

const Heading = styled.h2`
  font-size: 36px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  color: #1f1f1f;
  margin-bottom: 12px;

  span {
    background: linear-gradient(90deg, #9B87F5, #7E69AB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  font-size: 18px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  color: #4b5563;
  max-width: 720px;
  margin: 0 auto 48px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 32px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const Stars = styled.div`
  color: #fbbf24;
  font-size: 16px;
  align-self: flex-start;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const Message = styled.p`
  color: #374151;
  font-size: 16px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ececec;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ececec;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const Name = styled.div`
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  color: #1f1f1f;
  font-size: 16px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Subtext = styled.div`
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #7E69AB;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
