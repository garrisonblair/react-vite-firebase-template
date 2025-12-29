import { ActionIcon, AppShell, Flex, Title } from "@mantine/core";
import { IconArrowLeft, IconLogout } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { getAuth, signOut } from "firebase/auth";
import { FormattedMessage } from "react-intl";
import { app } from "../../firebase";
import { useUserStore } from "../../services/zustand/user.hooks";

interface PropsType {
  children: React.ReactNode;
}
const Shell: React.FunctionComponent<PropsType> = ({ children }) => {
  const logout = useUserStore((state) => state.logout);

  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <AppShell header={{ height: 60 }} w="100vw" padding="xl">
      <AppShell.Header bg="pink.4">
        <Flex px="md" h="100%" w="100%" align="center" justify="space-between">
          <ActionIcon
            variant="transparent"
            onClick={onBack}
            c="white"
            style={{
              visibility: 'hidden'
            }}
          >
            <IconArrowLeft stroke={2} />
          </ActionIcon>
          <Title
            order={1}
            c="white"
            onDoubleClick={() => window.location.reload()}
          >
            <FormattedMessage id="app_name" />
          </Title>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              signOut(getAuth(app));
              logout();
            }}
            c="white"
          >
            <IconLogout stroke={2} />
          </ActionIcon>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Shell;