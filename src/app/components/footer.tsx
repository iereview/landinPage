import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'; // Import Next.js Link
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Column>
          <Brand>
            <LogoContainer>
              <LogoImage src="/Flogo.png" alt="Predicto Logo" />
            </LogoContainer>
            <Description>
              Expert NEET counseling services to guide you through your medical education journey.
            </Description>
            <ContactItem>
              <MapPin size={20} />
              <span>123 Main Street, Bangalore,<br />Karnataka, India</span>
            </ContactItem>
            <ContactItem>
              <Phone size={20} />
              <span>+91 9876543210</span>
            </ContactItem>
            <ContactItem>
              <Mail size={20} />
              <span>contact@predicto.tier.app</span>
            </ContactItem>
          </Brand>
        </Column>

        <Column>
          <SectionTitle>Quick Links</SectionTitle>
          <LinkList>
            <li><Link href="/">Home</Link></li>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#counselors">Our Counselors</Link></li>
            <li><Link href="#testimonials">Testimonials</Link></li>
            <li><Link href="#contact">Contact Us</Link></li>
          </LinkList>
        </Column>

        <Column>
          <SectionTitle>Our Services</SectionTitle>
          <LinkList>
            <li><Link href="#services">Personalized NEET Counseling</Link></li>
            <li><Link href="#services">Exam Strategy Planning</Link></li>
            <li><Link href="#services">College Selection Assistance</Link></li>
            <li><Link href="#services">Post-Exam Support</Link></li>
            <li><Link href="#services">Career Path Guidance</Link></li>
          </LinkList>
        </Column>

        <Column>
          <SectionTitle>Subscribe to Our Newsletter</SectionTitle>
          <NewsletterText>
            Stay updated with the latest news and updates about NEET counseling.
          </NewsletterText>
          <NewsletterForm>
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </NewsletterForm>
          <FollowLabel>Follow Us</FollowLabel>
          <SocialIcons>
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
            <Youtube size={20} />
          </SocialIcons>
        </Column>
      </FooterContent>

      <FooterBottom>
        <Copyright>© 2025 Predicto by TIER. All rights reserved.</Copyright>
        <PolicyLinks>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </PolicyLinks>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;


// Styled Components

const FooterWrapper = styled.footer`
  background: #F9FAFB;
  padding: 60px 150px;
  font-family: 'Inter', sans-serif;

    @media (max-width: 1024px) {
    padding: 64px 48px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px 20px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1 1 220px;
  min-width: 220px;
`;

const Brand = styled.div``;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const LogoImage = styled.img`
  height: 32px;
  object-fit: contain;
`;

const Description = styled.p`
  color: #4B5563;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  margin: 16px 0;
  line-height: 1.6;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #8B5CF6;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  margin-bottom: 10px;

  svg {
    margin-top: 4px;
    flex-shrink: 0;
  }

  span {
    color: #4B5563;
  }
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
    margin-bottom: 10px;

    a {
      color: #4B5563;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const NewsletterText = styled.p`
  color: #4B5563;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const NewsletterForm = styled.div`
  display: flex;
  margin-bottom: 16px;

  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: #9CA3AF;
    font-weight: 400;
    border: 1px solid #E5E7EB;
    border-radius: 6px 0 0 6px;
    outline: none;
  }

  button {
    background: #AA8AF4;
    color: white;
    padding: 10px 16px;
    border: none;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    border-radius: 0 6px 6px 0;
    cursor: pointer;

    &:hover {
      background: #7C3AED;
    }
  }
`;

const FollowLabel = styled.p`
  font-weight: 700;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  color: #111827;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;

  svg {
    color: #6B7280;
    cursor: pointer;

    &:hover {
      color: #8B5CF6;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #E5E7EB;
  margin-top: 40px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 14px;
  color: #6B7280;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin-bottom: 10px;
`;

const PolicyLinks = styled.div`
  display: flex;
  gap: 20px;

  span {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }
`;
