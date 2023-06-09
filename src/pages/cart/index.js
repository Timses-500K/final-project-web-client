import CartItem from "@/components/Cart/CartItem";
import Wrapper from "@/components/Footer/Wrapper";
import { Store } from "@/helper/store";
import { useRouter } from "next/router";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
// import { useSelector } from "react-redux";

const Cart = () => {
  // const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {cartItems.length > 0 && (
        <Box w="full" py={{ md: 20 }}>
          <Wrapper>
            <Box
              textAlign="center"
              maxW={800}
              mx="auto"
              mt={{ base: 8, md: 0 }}
            >
              <Text
                fontSize={{ base: 28, md: 34 }}
                mb={5}
                fontWeight="semibold"
                lineHeight={1.25}
              >
                Shopping Cart
              </Text>
            </Box>
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              gap={12}
              py={10}
            >
              <Box flex={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  Cart
                </Text>
                {cartItems.map((item, i) => (
                  <CartItem key={i} data={item} />
                ))}
              </Box>
              <Box flex={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  Summary
                </Text>
                <Box my={5}>
                  <Flex justify="space-between">
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                      textTransform="uppercase"
                    >
                      Subtotal
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      Rp.{" "}
                      {cartItems.reduce(
                        (a, c) => a + c.quantity * (c.price - c.price * 0.2),
                        0
                      )}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" py={2}>
                    <Text fontSize={{ base: "sm", lg: "md" }} color="black">
                      Estimated Delivery & Handling
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      Rp.{" "}
                      {cartItems.reduce(
                        (a, c) => a + c.quantity * (c.price - c.price * 0.2),
                        0
                      ) * 0.01}
                    </Text>
                  </Flex>
                  <Flex
                    justify="space-between"
                    py={2}
                    pb={5}
                    borderBottom="1px"
                    borderColor="blackAlpha.500"
                  >
                    <Text fontSize={{ base: "sm", lg: "md" }} color="black">
                      Estimated Duties and Taxes
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      Free
                    </Text>
                  </Flex>
                  <Box fontSize={{ base: "sm", md: "md" }} py={5} borderTop={1}>
                    <Flex
                      justify="space-between"
                      py={2}
                      pb={5}
                      borderBottom="1px"
                      borderColor="blackAlpha.500"
                    >
                      <Text
                        fontSize={{ base: "sm", lg: "md" }}
                        color="black"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        Total
                      </Text>
                      <Text
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        color="black"
                      >
                        Rp.{" "}
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * (c.price - c.price * 0.2),
                          0
                        ) +
                          cartItems.reduce(
                            (a, c) =>
                              a + c.quantity * (c.price - c.price * 0.2),
                            0
                          ) *
                            0.01}
                      </Text>
                    </Flex>
                  </Box>
                  <Button
                    w="full"
                    size="lg"
                    rounded="full"
                    bg="black"
                    colorScheme="blackAlpha"
                    fontSize="lg"
                    transition="transform .3s ease-out"
                    _active={{ transform: "scale(0.95)" }}
                    mb={3}
                    onClick={() => router.push("login?redirect=/shipping")}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Wrapper>
        </Box>
      )}

      {cartItems.length < 1 && (
        <Box w="full" py={{ md: 20 }}>
          <Wrapper>
            <Box
              textAlign="center"
              maxW={800}
              mx="auto"
              mt={{ base: 8, md: 0 }}
            >
              <Text
                fontSize={{ base: 28, md: 34 }}
                mb={5}
                fontWeight="semibold"
                lineHeight={1.25}
              >
                Shopping Cart
              </Text>
            </Box>
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              gap={12}
              py={10}
            >
              <Box flex={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  Cart
                </Text>
                <Text fontSize="lg" py={5}>
                  There are no items in your cart.
                </Text>
              </Box>
              <Box flex={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  Summary
                </Text>
                <Box my={5}>
                  <Flex justify="space-between">
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                      textTransform="uppercase"
                    >
                      Subtotal
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      --
                    </Text>
                  </Flex>
                  <Flex justify="space-between" py={2}>
                    <Text fontSize={{ base: "sm", lg: "md" }} color="black">
                      Estimated Delivery & Handling
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      Free
                    </Text>
                  </Flex>
                  <Flex
                    justify="space-between"
                    py={2}
                    pb={5}
                    borderBottom="1px"
                    borderColor="blackAlpha.500"
                  >
                    <Text fontSize={{ base: "sm", lg: "md" }} color="black">
                      Estimated Duties and Taxes
                    </Text>
                    <Text
                      fontSize={{ base: "sm", lg: "md" }}
                      fontWeight="medium"
                      color="black"
                    >
                      --
                    </Text>
                  </Flex>
                  <Box fontSize={{ base: "sm", md: "md" }} py={5} borderTop={1}>
                    <Flex
                      justify="space-between"
                      py={2}
                      pb={5}
                      borderBottom="1px"
                      borderColor="blackAlpha.500"
                    >
                      <Text
                        fontSize={{ base: "sm", lg: "md" }}
                        color="black"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        Total
                      </Text>
                      <Text
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        color="black"
                      >
                        --
                      </Text>
                    </Flex>
                  </Box>
                  <Button
                    w="full"
                    size="lg"
                    rounded="full"
                    bg="black"
                    colorScheme="blackAlpha"
                    fontSize="lg"
                    transition="transform .3s ease-out"
                    _active={{ transform: "scale(0.95)" }}
                    mb={3}
                    isDisabled={true}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Wrapper>
        </Box>
      )}
    </>
  );
};

export default Cart;
