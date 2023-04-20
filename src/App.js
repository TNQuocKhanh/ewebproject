import { CommonProvider } from "./contexts/common/commonContext";
import { CartProvider } from "./contexts/cart/cartContext";
import RouterRoutes from "./routes/RouterRoutes";
import BackTop from "./components/common/BackTop";

const App = () => {
  return (
    <>
      <CommonProvider>
        <CartProvider>
          <RouterRoutes />
          <BackTop />
        </CartProvider>
      </CommonProvider>
    </>
  );
};

export default App;
