import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
//third web provider

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_3WEB_ID,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x149c8D7de8519Bf1438E057F6B623C4FCd857922",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThirdwebProvider
              activeChain="ethereum"
              clientId={`${import.meta.env.VITE_3WEB_ID}`}
            >
              <App />
            </ThirdwebProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
