import CartItem from "@/components/Cart/CartItem";
import Wrapper from "@/components/Footer/Wrapper";
import { Store } from "@/helper/store";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
// import { getSession, useSession } from "next-auth/react";
import OrderItem from "@/components/Order/OrderItem";
import { addToCart, createOrder, getUser } from "@/modules/fetch";
import { instance } from "@/modules/axios";
import Loading from "@/components/Loading/Loading";
import { convertToRupiah } from "@/helper/custom";
import { useAuth } from "@/modules/context/authCotext";
// import { instance } from "@/modules/axios";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { getUser } from "@/modules/fetch";
// import { get } from "react-hook-form";
// import { useSelector } from "react-redux";

const Confirmation = () => {
  // const { cartItems } = useSelector((state) => state.cart);
  // const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { state, dispatch } = useContext(Store);
  const [user, setUser] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState();

  const fetchUser = async () => {
    const data = await getUser();
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedAddress(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Order Confirmation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box w="full" py={{ md: 20 }}>
        <Wrapper>
          <Box textAlign="center" maxW={800} mx="auto" mt={{ base: 8, md: 0 }}>
            <Text
              fontSize={{ base: 28, md: 34 }}
              mb={5}
              fontWeight="semibold"
              lineHeight={1.25}
            >
              Order Confirmation
            </Text>
          </Box>
          <Flex flexDirection={{ base: "column", lg: "row" }} gap={12} py={10}>
            <Box flex={2}>
              <Text fontSize="2xl" fontWeight="bold" pb={10}>
                Contact Information
              </Text>
              <Box>
                <FormControl>
                  <FormLabel fontWeight="semibold">First Name</FormLabel>
                  <Input type="text" isReadOnly value={user.firstName} />
                  <FormLabel fontWeight="semibold">Last Name</FormLabel>
                  <Input type="text" isReadOnly value={user.lastName} />
                  <FormLabel fontWeight="semibold">Email address</FormLabel>
                  <Input type="email" isReadOnly value={user.email} />
                  <FormLabel fontWeight="semibold">Address</FormLabel>
                  <Select placeholder="Select address" onChange={handleChange}>
                    {user.Addresses?.map((addr, index) => (
                      <option key={index} value={addr.id}>
                        {addr.address}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
                    {convertToRupiah(
                      Math.floor(
                        state.cart.cartItems.reduce(
                          (a, c) => a + c.quantity * (c.price - c.price * 0.2),
                          0
                        )
                      )
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
                    {convertToRupiah(
                      Math.floor(
                        state.cart.cartItems.reduce(
                          (a, c) => a + c.quantity * (c.price - c.price * 0.2),
                          0
                        ) * 0.01
                      )
                    )}
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
                <Box>
                  {state.cart.cartItems.map((item, i) => (
                    <OrderItem key={i} data={item} />
                  ))}
                </Box>
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
                      {convertToRupiah(
                        Math.floor(
                          state.cart.cartItems.reduce(
                            (a, c) =>
                              a + c.quantity * (c.price - c.price * 0.2),
                            0
                          ) +
                            state.cart.cartItems.reduce(
                              (a, c) =>
                                a + c.quantity * (c.price - c.price * 0.2),
                              0
                            ) *
                              0.01
                        )
                      )}
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
                  onClick={async () => {
                    if (isLoggedIn) {
                      for (let i = 0; i < state.cart.cartItems.length; i++) {
                        await addToCart(
                          selectedAddress,
                          state.cart.cartItems[i].id,
                          state.cart.cartItems[i].itemSize.id,
                          state.cart.cartItems[i]
                        );
                      }
                      await createOrder();
                      router.push("/success");
                    } else {
                      toast({
                        title: "Alert!",
                        description: "Sorry, please login to checkout!.",
                        status: "warning",
                        position: "top",
                        isClosable: true,
                      });
                      router.push("/login");
                    }
                  }}
                >
                  Order Now
                </Button>
              </Box>
            </Box>
          </Flex>
        </Wrapper>
      </Box>
    </>
  );
};

export default Confirmation;

// Confirmation.auth = true;
