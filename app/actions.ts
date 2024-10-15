"use server";

import client from "@/lib/mongodb";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const mongoClient = await client.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    ); // because this is a server action, the console.log will be outputted to your terminal not in the browser
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}




export const createCurrency = async () => {
  try {
    const currency = await fetch("/api/currencies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
        code: "GHS",
        flag_url: "",
        name: "Ghana",
        symbol: "gh₵",
      }),
    });

    const data = await currency.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
