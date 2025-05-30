"use client";

import styled from 'styled-components';
import { Mail, MapPin, Phone, Calendar, CheckCircle } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function ContactSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const slideLeftVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const slideRightVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showToast, setShowToast] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
        break;
      case 'phone':
        if (!value) error = 'Phone is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = Object.values(errors).every(err => !err) &&
                      Object.values(formData).every(val => val.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Clear form
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Section id="contact" ref={ref}>
      {showToast && (
        <Toast>
          <CheckCircle size={18} style={{ marginRight: '8px' }} />
          Form submitted successfully!
        </Toast>
      )}

      <Container>
        <motion.div initial="hidden" animate={controls} variants={fadeUpVariant}>
          <Title>
            Have <Highlight>Questions?</Highlight> Get in Touch
          </Title>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={fadeUpVariant} transition={{ delay: 0.2 }}>
          <Subtitle>
            Our team is ready to answer any questions you might have about our NEET counseling services.
          </Subtitle>
        </motion.div>

        <Grid>
          <motion.div initial="hidden" animate={controls} variants={slideLeftVariant} transition={{ delay: 0.4 }}
            style={{ flex: 1, minWidth: 350, maxWidth: 540 }}>
            <FormCard>
              <FormTitle>Send us a message</FormTitle>
              <Form onSubmit={handleSubmit}>
                <Label>Your Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}

                <Label>Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}

                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

                <Label>Your Message</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}

                <SubmitButton disabled={!isFormValid}>Submit</SubmitButton>
              </Form>
            </FormCard>
          </motion.div>

          <motion.div initial="hidden" animate={controls} variants={slideRightVariant} transition={{ delay: 0.6 }}
            style={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
            <RightColumn>
              <InfoCard>
                <FormTitle>Contact Information</FormTitle>

                <InfoGroup>
                  <IconWithLabel><Phone size={20} /><InfoLabel>Phone</InfoLabel></IconWithLabel>
                  <InfoText>+91 9876543210</InfoText>
                </InfoGroup>

                <InfoGroup>
                  <IconWithLabel><Mail size={20} /><InfoLabel>Email</InfoLabel></IconWithLabel>
                  <InfoText>contact@predicto.tier.app</InfoText>
                </InfoGroup>

                <InfoGroup>
                  <IconWithLabel><MapPin size={20} /><InfoLabel>Office Address</InfoLabel></IconWithLabel>
                  <InfoText>
                    123 Main Street, Bangalore<br />
                    Karnataka, India - 560001
                  </InfoText>
                </InfoGroup>
              </InfoCard>

              <motion.div initial="hidden" animate={controls} variants={scaleUpVariant} transition={{ delay: 0.8 }}>
                <CalendlyCard>
                  <FormTitle>Book a Free Consultation</FormTitle>
                  <InfoText>
                    Schedule a free 30-minute consultation with our expert counselors to discuss your NEET journey.
                  </InfoText>
                  <CalendlyButton><Calendar size={16} />Book via Calendly</CalendlyButton>
                </CalendlyCard>
              </motion.div>
            </RightColumn>
          </motion.div>
        </Grid>
      </Container>
    </Section>
  );
}

// Styled Components

const Toast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4BB543;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  z-index: 9999;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
  font-family: 'Inter', sans-serif;
  margin-top: -6px;
  margin-bottom: 8px;
`;


// Styled Components

const Section = styled.section`
  background: #FFFDF5;
  padding: 80px 24px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }

  @media (max-width: 480px) {
    padding: 40px 12px;
  }
`;

const Container = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 12px;

  @media (max-width: 480px) {
    padding: 0 8px;
  }
`;

const Title = styled.h2`
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
  color: #8b5cf6;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  color: #4B5563;
  max-width: 720px;
  margin: 0 auto 48px;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 90%;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 32px;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  padding: 32px;
  flex: 1;
  min-width: 350px;
  max-width: 540px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 24px 20px;
    min-width: 100%;
    max-width: 100%;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  justify-content: space-between;

  @media (max-width: 480px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  padding: 32px;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #020817;
  font-family: 'Inter', sans-serif;
  margin-bottom: 4px;
  display: inline-block;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const IconWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  svg {
    color: #9B87F5;
    flex-shrink: 0;
  }
`;

const CalendlyCard = styled(InfoCard)``;

const FormTitle = styled.h3`
  font-size: 24px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #020817;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #374151;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #000 !important;        
  background-color: #fff;         
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 9px 12px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #000 !important;        
  background-color: #fff;         
  font-family: 'Inter', sans-serif;

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 9px 12px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background: #a78bfa;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: #8b5cf6;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 13px;
    margin-top: 20px;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #374151;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CalendlyButton = styled.button`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: #a78bfa;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: #8b5cf6;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 10px;
  }
`;
