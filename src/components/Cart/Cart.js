import React, { useContext, useState, useRef, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CartContext } from "../../context/cartContext";

const Cart = () => {
  const { cartItems, removeFromCart, emptyCart, handleOrder } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const cartRef = useRef();
  useClickOutside(cartRef, () => setIsOpen(false));

  useEffect(() => {
    total();
  },[cartItems]);

  let total = () =>{
    let total = 0;
    for (const pizza of cartItems) {
      if(pizza.selectedPizzaSize === "голема"){

        total+= pizza.quantity * pizza.priceBig;
      }
       if (pizza.selectedPizzaSize === "мала"){
        total+= pizza.quantity * pizza.priceSmall;
      }
    }
    return total;
  }

  // function handleOrder() {
  //   // axios
  //   //   .post("backendURL", {
  //   //     cartItems: cartItems,
  //   //   })
  //   //   .then(function () {
  //   //     emptyCart();
  //   //    setIsOpen(false);
  //   //    alert('Fala sto kupuvate kaj nas')
  //   //   })
  //   //   .catch((error) => console.log(error));

  //   setTimeout(() => {
  //     emptyCart();
  //     setIsOpen(false);
  //     alert("Fala sto kupuvate kaj nas");
  //   }, 1000);
  // }

  return (
    <div>
      {isOpen && (
        <div
          className="test"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: `rgba(0,0,0,0.4)`,
            zIndex: 10,
          }}
        ></div>
      )}
      <div
        ref={cartRef}
        className="cartDiv"
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {" "}
          Cart <spam className="cartItemsLength">{cartItems.length && cartItems.length}</spam>
        </div>

        <div
          style={{
            display: !isOpen ? "none" : "block",
          }}
        >
          {cartItems.map((pizza) => (
            <div key={pizza.id + pizza.selectedPizzaSize}>
              <h2>
                {pizza.name}{" "}
                <button
                  onClick={() =>
                    removeFromCart(pizza.id, pizza.selectedPizzaSize)
                  }
                >
                  ❌
                </button>
              </h2>
              <h3>{pizza.selectedPizzaSize}</h3>
              <div>
                {pizza.selectedPizzaSize === "мала" &&
                  "Price: " +
                    pizza.quantity +
                    "  x  " +
                    pizza.priceSmall + " den."}
              </div>
              <div>
                {pizza.selectedPizzaSize === "голема" &&
                  "Price: " +
                  pizza.quantity +
                  "  x  " +
                  pizza.priceBig + " den."}
              </div>
                  <hr></hr>
            </div>
          ))}
              <div>
                Total: {total()} den.
              </div>
          <button onClick={handleOrder}>Order all</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
