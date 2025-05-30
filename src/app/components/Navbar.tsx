"use client";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Animations
const fadeSlideDown = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const dropdownReveal = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <LogoWrapper>
          <Link href="/">
            <Image src="/Logo.png" alt="Predicto Logo" width={174} height={32} />
          </Link>
        </LogoWrapper>

        <Hamburger onClick={() => setMenuOpen(!menuOpen)} $menuOpen={menuOpen}>
          <span />
          <span />
          <span />
        </Hamburger>

        <RightSection $menuOpen={menuOpen}>
          <NavMenu>
            <NavItem href="#about">About</NavItem>
            <NavItem href="#counselors">Our Counselors</NavItem>
            <NavItem href="#services">Services</NavItem>
            <NavItem href="#how-it-works">How It Works</NavItem>
            <NavItem href="#testimonials">Testimonials</NavItem>
            <BookSession href="#contact">Book a Session</BookSession>
          </NavMenu>
        </RightSection>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 100%;
  padding: 1.2rem 150px;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: ${fadeSlideDown} 0.6s ease forwards;

  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Hamburger = styled.div<{ $menuOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
  z-index: 1000;

  span {
    height: 3px;
    width: 26px;
    background: #1f1f1f;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${({ $menuOpen }) =>
    $menuOpen &&
    `
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const RightSection = styled.div<{ $menuOpen: boolean }>`
  @media (max-width: 1024px) {
    position: absolute;
    top: 200%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px; 
    animation: ${dropdownReveal} 0.3s ease;
    max-height: ${({ $menuOpen }) => ($menuOpen ? "1000px" : "0")};
    overflow: hidden;
    transition: max-height 0.4s ease;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #1f1f1f;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #7f56d9;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;  

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem 2rem;
    align-items: flex-start;
  }
`;

const BookSession = styled(Link)`
  display: flex;
  align-items: center;        
  justify-content: center;
  padding: 0.7rem 1.4rem;
  background-color: #9b87f5;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #7c5dc7;
    box-shadow: 0 6px 14px rgba(159, 122, 234, 0.4);
  }

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;
