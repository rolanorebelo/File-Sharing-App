import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({
  response
}) => {
  // Log the response being received by the template
  console.log("EmailTemplate response:", response);
  
  return (
    <Html>
      <Head />
      <Preview>File Information</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src='https://via.placeholder.com/150' width={150} height={100} alt='Logo'/>
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src='https://via.placeholder.com/620x200'
                alt='Header Image'
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {response.emailToSend.split("@")[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Here is your file information:
                </Heading>

                <Text style={paragraph}>
                  <strong>File Name:</strong> {response.fileName}
                </Text>
                <Text style={paragraph}>
                  <strong>File Size:</strong> {(response.fileSize / 1024).toFixed(2)} KB
                </Text>
                <Text style={paragraph}>
                  <strong>File Type:</strong> {response.fileType}
                </Text>
                <Text style={paragraph}>
                  <strong>Download Link:</strong> <a href={response.shortUrl}>{response.shortUrl}</a>
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If you have any questions, please see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Learn More</Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src='https://via.placeholder.com/620x200'
              alt='Footer Image'
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | Rolano Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.rolanorebelo.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
  margin: '5px 0',
};

const logo = {
  padding: "30px 20px",
  textAlign: 'center',
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
  padding: '20px',
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
