"use client";

import {
  Box,
  VStack,
  Button,
  useDisclosure,
  Collapsible,
} from "@chakra-ui/react";
import {
  FaUser,
  FaHome,
  FaGlobe,
  FaFolder,
  FaFileAlt,
  FaFilePdf,
  FaStickyNote,
  FaUserPlus,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useAppStore } from "@/store/useAppStore";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const { user, logout } = useAppStore();
  const { open: isCaseOpen, onToggle: toggleCase } = useDisclosure({
    defaultOpen: true,
  });

  const { open: isArchiveOpen, onToggle: toggleArchive } = useDisclosure({
    defaultOpen: true,
  });

  console.log(user);

  return (
    <Box
      w={"280px"}
      transition="width 0.2s ease"
      h="100vh"
      bg="white"
      borderRight="1px solid #E2E8F0"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack align="stretch" gap={4}>
        {/* User */}
        <Button variant="ghost" justifyContent="flex-start">
          <FaUser />
          {user?.displayName}
        </Button>
        {/* Nav */}
        <Button variant="ghost" justifyContent="flex-start">
          <FaHome />
          Home
        </Button>
        <Button variant="ghost" justifyContent="flex-start">
          <FaGlobe />
          Search Web
        </Button>

        <Box h="1px" w="full" bg="gray.200" />

        {/* Case Folders */}
        <Box>
          <Button
            variant="ghost"
            onClick={toggleCase}
            justifyContent="space-between"
            w="full"
          >
            Case folders
            {isCaseOpen ? <FaChevronUp /> : <FaChevronDown />}
          </Button>

          <Collapsible.Root open={isCaseOpen}>
            <VStack align="start" mt={2} pl={4}>
              <Button variant="ghost">
                <FaFolder />
                &lt;Folder 1&gt;
              </Button>
              <VStack align="start" w="full">
                <Button variant="ghost">
                  <FaFolder />
                  &lt;Folder 2&gt;
                </Button>
                <Box pl={4}>
                  <Button variant="ghost">
                    <FaFolder />
                    &lt;Folder 2.1&gt;
                  </Button>
                  <VStack pl={4} align="start">
                    <Button variant="ghost">
                      <FaFileAlt />
                      File 2.1
                    </Button>
                    <Button variant="ghost">
                      <FaFilePdf />
                      Document 2.1
                    </Button>
                    <Button variant="ghost">
                      <FaStickyNote />
                      Note 2.1
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          </Collapsible.Root>
        </Box>

        {/* Archive */}
        <Box mt={4}>
          <Button
            variant="ghost"
            onClick={toggleArchive}
            justifyContent="space-between"
            w="full"
          >
            Archive
            {isArchiveOpen ? <FaChevronUp /> : <FaChevronDown />}
          </Button>

          <Collapsible.Root open={isArchiveOpen}>
            <VStack align="start" mt={2} pl={4}>
              <Button variant="ghost">
                <FaFolder />
                &lt;Folder 1&gt;
              </Button>
              <Button variant="ghost">
                <FaFolder />
                &lt;Folder 2&gt;
              </Button>
            </VStack>
          </Collapsible.Root>
        </Box>
      </VStack>

      {/* Footer */}
      <VStack align="stretch" pt={6}>
        <Button variant="ghost" justifyContent="flex-start">
          <FaUserPlus />
          Invite members
        </Button>
        <Button
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => logout()}
        >
          <FaSignOutAlt />
          Sign out
        </Button>
      </VStack>
    </Box>
  );
}
