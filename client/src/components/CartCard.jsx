import React from "react";

const CartCard = ({ item }) => {
    
  const { product, quantity } = item;
  console.log(product);

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex gap-6">
        <div>
          <img src={product.image} />
        </div>
        <div>
          {product.name}
          {product.description}
          {product.price}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
