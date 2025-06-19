import React, { useState, useRef } from 'react';
import {
  Box,
  Input,
  Tag,
  TagLabel,
  VStack,
  List,
  ListItem,
  // useOutsideClick,
} from '@chakra-ui/react';
// Fix: Import TagCloseButton separately from the same package
// import { TagCloseButton } from '@chakra-ui/react';

const MentionsInputChakra = ({ users, value, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const ref = useRef();

  // useOutsideClick({
  //   ref: ref,
  //   handler: () => setShowDropdown(false),
  // });

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    // const match = val.match(/@([\w]*)$/);
    // if (match) {
    //   const search = match[1].toLowerCase();
    //   setFilteredUsers(
    //     users.filter(
    //       (u) =>
    //         !value.some((v) => v._id === u._id) &&
    //         u.name.toLowerCase().includes(search)
    //     )
    //   );
    //   setShowDropdown(true);
    // } else {
    //   setShowDropdown(false);
    // }
  };

  const handleUserSelect = (user) => {
    const newInput = input.replace(/@([\w]*)$/, '');
    setInput(newInput);
    onChange([...value, user]);
    setShowDropdown(false);
  };

  const handleRemove = (userId) => {
    onChange(value.filter((u) => u._id !== userId));
  };

  return (
    <Box position="relative" ref={ref}>
      <VStack align="stretch" spacing={2}>
        <Box display="flex" flexWrap="wrap" gap={2} mb={1}>
          {value.map((user) => (
            <Tag key={user._id} colorScheme="teal" borderRadius="full">
              <TagLabel>@{user.name}</TagLabel>
              {/* <TagCloseButton onClick={() => handleRemove(user._id)} /> */}
            </Tag>
          ))}
        </Box>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showDropdown && filteredUsers.length > 0 && (
          <List
            position="absolute"
            zIndex={10}
            bg="white"
            border="1px solid #ccc"
            borderRadius="md"
            mt={1}
            w="100%"
            maxH="150px"
            overflowY="auto"
            boxShadow="md"
          >
            {filteredUsers.map((user) => (
              <ListItem
                key={user._id}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: 'teal.50' }}
                onClick={() => handleUserSelect(user)}
              >
                @{user.name}{' '}
                <Box as="span" color="gray.500" fontSize="sm">
                  ({user.email})
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Box>
  );
};

export default MentionsInputChakra;
