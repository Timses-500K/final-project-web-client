import { Box, Center } from "@chakra-ui/react";
import Head from "next/head";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Box h="100vh">
          <Center flexDirection="column">Contact</Center>
        </Box>
      </div>
    </>
  );
};

export default Contact;