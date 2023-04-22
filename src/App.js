import { CommonProvider } from "./contexts/common/commonContext";
import { CartProvider } from "./contexts/cart/cartContext";
import RouterRoutes from "./routes/RouterRoutes";
import BackTop from "./components/common/BackTop";
import Messenger from "./components/common/Messenger";

const App = () => {
  return (
    <>
      <CommonProvider>
        <CartProvider>
          <RouterRoutes />
          <Messenger/>
          <BackTop />
        </CartProvider>
      </CommonProvider>
    </>
  );
};

export default App;
