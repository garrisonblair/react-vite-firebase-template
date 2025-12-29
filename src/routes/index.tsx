import { createFileRoute } from "@tanstack/react-router";
import Shell from "../components/AppShell/AppShell";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <Shell>
      HOME
    </Shell>

  );
};
