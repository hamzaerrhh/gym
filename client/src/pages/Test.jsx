import { useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { ethers } from "ethers";

export default function Test() {
  const {
    mutate: sendTransaction,
    isLoading,
    isError,
    data,
  } = useSendTransaction();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const call = async () => {
    try {
      const transaction = {
        to: receiver,
        value: ethers.utils.parseEther(amount),
      };
      await sendTransaction(transaction);
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={call} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Transaction"}
      </button>
      {isError && <p>Error occurred while sending transaction</p>}
      {data && <p>Transaction Hash: {data.transactionHash}</p>}
    </div>
  );
}
