import axios from "axios";
import { Button } from "@mui/material";
const Payment = () => {
  const handleClick = () => {
    axios.post("http://localhost:4000/create-checkout-session", {
      headers: {
        token: localStorage.getItem("token"),
      },
      // body: JSON.stringify({
      //   items: [
      //     { id: 1, quantity: 3 },
      //     { id: 2, quantity: 1 },
      //   ],
      // }),
    });
  };
  return (
    <div>
      <h1>Payment</h1>
      <Button onClick={handleClick}>Check out</Button>
    </div>
  );
};

export default Payment;
