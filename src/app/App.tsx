import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryProvider } from "./providers";
import { Loader } from "@/shared/ui";

const DevicesPage = lazy(() =>
  import("../pages/DevicesPage").then((m) => ({ default: m.DevicesPage }))
);

const DevicePage = lazy(() =>
  import("../pages/DevicePage").then((m) => ({ default: m.DevicePage }))
);

const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <QueryProvider>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<DevicesPage />} />
          <Route path="/devices/:deviceId" element={<DevicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  </QueryProvider>
);

export default App;
