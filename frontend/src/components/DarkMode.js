import {
  useColorMode,
  IconButton,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.200", "gray.900");
  const color = useColorModeValue("cyan.600", "cyan.200");

  return (
    <div>
      <Flex bg={bg} color={color}>
        <Box>
          <IconButton
            aria-label="Toggle Dark Switch"
            p={2}
            m={2}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            bg={bg}
            color={color}
          />
        </Box>
      </Flex>
    </div>
  );
}

export default DarkMode;
