import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@mantine/core/styles.css";
import "./index.css";
import enMessages from "./translations/en.json";
import frMessages from "./translations/fr.json";
import { MantineProvider } from '@mantine/core';
import { theme, resolver } from './theme';
import { IntlProvider } from './services/intl/IntlProvider.tsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider translations={{ fr: frMessages, en: enMessages }}>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          defaultColorScheme="auto"
        >
          <RouterProvider router={router} />
        </MantineProvider>
    </IntlProvider>
  </StrictMode>,
)
