import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDetails from "./ProductDetails";
import { GB_CURRENCY } from "../utils/constants";
import { callAPI } from "../utils/CallApi";
import { addToCart } from "../redux/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  const getProduct = async () => {
    const productResults = await callAPI("data/products.json");
    setProduct(productResults[id]);
  };

  const addQuantityToProduct = () => {
    return { ...product, quantity };
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div className="loading">Loading Product...</div>;

  return (
    <div className="h-screen bg-amazonclone-background">
      <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-3 p-8 rounded bg-white m-auto">
            <img src={product.image} alt={product.title} />
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
            <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
              RRP:{" "}
              <span className="line-through">
                {GB_CURRENCY.format(product.oldPrice)}
              </span>
            </div>
            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
              FREE Returns
            </div>
            <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
              FREE Delivery
            </div>
            <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
              In Stock
            </div>
            <div className="text-base xl:text-lg mt-1">
              Quantity:
              <select
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 bg-white border rounded-md focus:border-indigo-600"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <Link to={"/checkout"}>
              <button
                onClick={() => dispatch(addToCart(addQuantityToProduct()))}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
