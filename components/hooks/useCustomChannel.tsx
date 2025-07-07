/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useDataChannel } from "@livekit/components-react";
import { useRouter } from "next/router";
import { CartDataProps } from "@/@types/cartProps";
import { ChannelCartProps } from "@/@types/livekitProps";

interface FetchOptions {
  endpoint: string;
  method?: string;
  body?: any;
}

function useCustomChannel() {
  const router = useRouter();
  const authCookie = JSON.parse(getCookie("authUser") || "");
  const [products, setProducts] = useState<any[]>([]);
  const [cartData, setCartData] = useState<CartDataProps[]>([]);
  const [checkoutProduct, setCheckoutProduct] = useState<any[]>([]);

  const fetchData = async ({
    endpoint,
    method = "POST",
    body,
  }: FetchOptions) => {
    try {
      const response = await fetch(`${process.env.ENDPOINT_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCookie}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) return data;

      throw data?.message || "Something went wrong";
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}`, error);
      deleteCookie("authUser");
      router.reload();
      throw error;
    }
  };

  const handleProduct = async (product: string[]) => {
    const data = await fetchData({
      endpoint: "/service/suggestions/",
      body: { ids: product },
    });
    setProducts(data);
  };

  const handleCartData = async (cartData: ChannelCartProps[]) => {
    const ids = cartData?.map((item) => item.id);
    const quantity = cartData?.map((item) => item.quantity);
    const data = await fetchData({
      endpoint: "/service/cart/",
      body: { ids },
    });
    const new_data = data.map((item: any, index: number) => ({
      ...item,
      quantity: quantity[index], // Add quantity to each product
      id: ids[index], // Ensure the id is also included
    }));

    // console.log(new_data);
    setCartData(new_data);
  };

  useDataChannel("products", (msg) => {
    if (msg?.payload) {
      const decodedPayload = new TextDecoder().decode(msg.payload);
      const jsonData = JSON.parse(decodedPayload);

      jsonData?.length !== 0 && handleProduct(jsonData);
      // console.log("products", jsonData);
    }
  });

  useDataChannel("cart", (msg) => {
    if (msg?.payload) {
      const decodedPayload = new TextDecoder().decode(msg.payload);
      const jsonData = JSON.parse(decodedPayload);
      jsonData?.length !== 0 && handleCartData(jsonData);
      // console.log("cart", jsonData);
    }
  });

  useDataChannel((msg) => {
    if (msg?.payload) {
      const decodedPayload = new TextDecoder().decode(msg.payload);
      const jsonData = JSON.parse(decodedPayload);
      console.log(msg.topic, jsonData);
    }
  });

  useDataChannel("checkout", (msg) => {
    if (msg?.payload) {
      const decodedPayload = new TextDecoder().decode(msg.payload);
      const jsonData = JSON.parse(decodedPayload);
      console.log(msg.topic, jsonData);
      jsonData?.[0] === "checkout" && setCheckoutProduct(cartData);
    }
  });

  const clearProduct = () => {
    setProducts([]);
  };

  return {
    products,
    cartData,
    checkoutProduct,
    clearProduct,
  };
}

export default useCustomChannel;
