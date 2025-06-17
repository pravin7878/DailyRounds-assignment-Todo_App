
import { Box, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { MdAddTask, MdOutlineDashboardCustomize } from 'react-icons/md';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { useColorMode } from '../ui/color-mode';
import { Link } from 'react-router-dom';

const Sidebar = () => {
const {colorMode} = useColorMode()
// console.log(colorMode);

    const navItems = [
        // { label: 'Dashboard', icon: <MdOutlineDashboardCustomize /> },
        // { label: 'Team', icon: <AiOutlineTeam /> },
        { label: 'All Tasks', icon: <MdAddTask /> ,path : "/" },
        // { label: 'Analytics', icon: <TbBrandGoogleAnalytics /> },
    ]


    return (
        <Box
            w={"full"}
            h={"95vh"}
            shadow={"md"}
            py={3}
        >
            <Flex
                direction={"column"}
                w={"full"}
                justify={"center"}
                align={"center"}
               my={6}
               
            >
                <Box >
                    <Icon>
                    <MdAddTask size={30}/>
                    </Icon>
                </Box>
                <Text>Task Managment</Text>
            </Flex>

            <VStack align={"start"} px={[5]}>
                {navItems?.map((item, ind) => {
                    return <Link key={ind} to={item.path}>
                    <HStack
                    
                        w={"full"}
                        cursor={"pointer"}
                        _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.300" }}
                        px={4}
                        rounded={"sm"}
                    >
                        <Icon>{item?.icon}</Icon>
                        <Text>{item?.label}</Text>
                    </HStack>
                    </Link>
                })}
            </VStack>


        </Box>
    );
};

export default Sidebar;