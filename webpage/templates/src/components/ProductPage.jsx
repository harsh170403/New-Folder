import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDetails from "./ProductDetails";
import { GB_CURRENCY } from "../utils/constants";
import { callAPI } from "../utils/CallApi";
import { addToCart } from "../redux/cartSlice";
import User_header from '../user_dashboard/User_header';
import User_sidebar from '../user_dashboard/User_sidebar';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const productResults = await callAPI("data/products.json");
      if (productResults && productResults[id]) {
        setProduct(productResults[id]);
      } else {
        console.error("Product not found for the given ID");
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
  };

  const addQuantityToProduct = () => {
    return { ...product, quantity: parseInt(quantity, 10) };
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loading text-lg font-semibold">Loading Product...</div>
      </div>
    );

  return (
    <div className="h-screen bg-amazonclone-background">
      <User_header/>
      <User_sidebar/>
      <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3 p-8 rounded bg-white m-auto">
            <img src={product.image} alt={product.title} className="max-w-full" />
          </div>

          <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
            <div className="mb-3">
              <ProductDetails product={product} ratings={true} />
            </div>
            <div className="text-base xl:text-lg mt-3">{product.description}</div>
          </div>

          <div className="col-span-2 p-4 rounded bg-white">
            <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
              {GB_CURRENCY.format(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                RRP:{" "}
                <span className="line-through">
                  {GB_CURRENCY.format(product.oldPrice)}
                </span>
              </div>
            )}
            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
              FREE Returns
            </div>
            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
              FREE Delivery
            </div>
            <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
              In Stock
            </div>
            <div className="text-base xl:text-lg mt-3">
              Quantity:
              <select
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 bg-white border rounded-md focus:border-indigo-600 mt-1"
                aria-label="Select quantity"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
            <Link to="/cart">
              <button
                onClick={() => dispatch(addToCart(addQuantityToProduct()))}
                className="p-2 w-full bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
