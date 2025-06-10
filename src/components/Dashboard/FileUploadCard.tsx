// components/Dashboard/FileUploadCard.tsx
"use client";

import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaFileUpload, FaTrashAlt } from "react-icons/fa";

export default function FileUploadCard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={isDragging ? "blue.400" : "gray.300"}
      borderRadius="lg"
      p={6}
      textAlign="center"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      cursor="pointer"
      bg={isDragging ? "blue.50" : "white"}
      transition="background 0.2s"
    >
      <VStack gap={3}>
        <FaFileUpload size={28} />
        <Text fontWeight="bold">Upload your case files</Text>
        <Text fontSize="sm" color="gray.600">
          Drag & drop or click to select a PDF file
        </Text>
        {selectedFile && (
          <HStack gap={3} mt={2}>
            <Text fontSize="sm" color="green.600">
              {selectedFile.name}
            </Text>
            <IconButton
              size="xs"
              colorScheme="red"
              aria-label="Remove file"
              onClick={(e) => {
                e.stopPropagation(); // prevent opening file dialog
                removeFile();
              }}
            >
              <FaTrashAlt />
            </IconButton>
          </HStack>
        )}
      </VStack>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </Box>
  );
}
