import { StrictMode } from "react";
// Import createRoot function to mount the app
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {routeTree} from './routeTree.gen';


const router = createRouter({routeTree})
const queryClient = new QueryClient();

const App = () => {
    return (
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>
    )
};

// Get the container element from the DOM, where be render
const container = document.getElementById("root");
// Create a React root using the container
const root = createRoot(container);
// Render the App component inside the root
root.render(<App />);