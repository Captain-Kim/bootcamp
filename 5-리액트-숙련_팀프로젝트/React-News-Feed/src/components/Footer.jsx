import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 20px;
  background-color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterLinks = styled.div`
  margin: 10px 0;

  a {
    color: #343434;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <hr />
      <FooterLinks>
        <a
          href="https://teamsparta.notion.site/10-A10-5fe225a2ed304941a0feadf45b495268"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Us
        </a>
        <a
          href="https://teamsparta.notion.site/10-A10-5fe225a2ed304941a0feadf45b495268"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          href="https://teamsparta.notion.site/10-A10-5fe225a2ed304941a0feadf45b495268"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </FooterLinks>
      <p style={{ color: '#343434' }}>&copy; {new Date().getFullYear()} Sparta Club React A10 All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
