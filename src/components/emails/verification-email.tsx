import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface EmailProps {
  verificationUrl: string;
  userName?: string;
}

export const VerificationEmail = ({
  verificationUrl,
  userName,
}: EmailProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-gray-50">
        <Preview>Verify your email address to continue</Preview>
        <Container className="mx-auto py-10 px-4 bg-white rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Welcome!
          </Text>
          <Text className="text-[16px] leading-[26px] text-gray-700 mb-6">
            Hi {userName || "there"},
          </Text>
          <Text className="text-[16px] leading-[26px] text-gray-700 mb-6">
            Thanks for signing up! Please verify your email address by clicking
            the button below.
          </Text>
          <Section className="text-center mb-8">
            <Button
              className="bg-[#3B82F6] rounded-md text-white text-[16px] font-medium no-underline text-center block p-3"
              href={verificationUrl}
            >
              Verify Email Address
            </Button>
          </Section>
          <Text className="text-[14px] leading-[22px] text-gray-600">
            If you didn&apos;t create an account, you can safely ignore this
            email.
          </Text>
          <Hr className="border-[#e5e7eb] my-8" />
          <Text className="text-[#9ca3af] text-[12px] text-center">
            &copy; {new Date().getFullYear()} Our App. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationEmail;
