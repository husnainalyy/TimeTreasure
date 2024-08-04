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
import * as React from "react";

interface TimeTreasureEmailProps {
    userFirstName?: string;
    capsules?: Array<{
        deliveryDate: string;
        createdDate: string;
        subject: string;
    }>;
}

export const TimeTreasureEmail = ({
    userFirstName,
    capsules = [],
}: TimeTreasureEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container>
                    <Section style={logo}>
                        <p className="text-2xl">Time Treasure</p>
                    </Section>

                    <Section style={content}>
                        <Row>
                            <Img
                                style={image}
                                width={620}
                                src={`https://react-email-demo-9fn3mchcm-resend.vercel.app/static/yelp-header.png`}
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
                                    Hi {userFirstName},
                                </Heading>
                                <Heading
                                    as="h2"
                                    style={{
                                        fontSize: 26,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    Your Time Treasure Capsules is ARRIVED!
                                </Heading>

                                {capsules.map((capsule, index) => (
                                    <div key={index}>
                                        <Text style={paragraph}>
                                            <b>Time: </b>
                                            {new Intl.DateTimeFormat("en", {
                                                dateStyle: "long",
                                                timeStyle: "short",
                                            }).format(new Date(capsule.deliveryDate))}
                                        </Text>
                                        <Text style={{ ...paragraph, marginTop: -5 }}>
                                            <b>Created Date: </b>
                                            {new Intl.DateTimeFormat("en", {
                                                dateStyle: "long",
                                            }).format(new Date(capsule.createdDate))}
                                        </Text>
                                        <Text style={{ ...paragraph, marginTop: -5 }}>
                                            <b>Subject: </b>
                                            {capsule.subject}
                                        </Text>
                                    </div>
                                ))}

                                <Text style={paragraph}>
                                    We appreciate that you trust Time Treasure to safeguard your precious memories. Your journey through time is as important to us as it is to you. Enjoy the memories and treasures inside your capsule.
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
                            src={`https://react-email-demo-9fn3mchcm-resend.vercel.app/static/yelp-footer.png`}
                        />
                    </Section>

                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "rgb(0,0,0, 0.7)",
                        }}
                    >
                        © 2022 | Time Treasure Inc., 350 Mission Street, San Francisco, CA 94105,
                        U.S.A. | www.timetreasure.com
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default TimeTreasureEmail;

const main = {
    backgroundColor: "#fff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
    fontSize: 16,
};

const logo = {
    padding: "30px 20px",
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
