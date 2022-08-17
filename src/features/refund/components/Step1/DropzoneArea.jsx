import { useTheme, Container, Typography, Link, Stack } from "@mui/material";
import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneArea = () => {
  const [files, setFiles] = useState([]);
  const theme = useTheme();

  const baseStyle = useMemo(() => {
    return {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderWidth: 2,
      borderColor: theme.palette?.primary.main,
      borderStyle: "dashed",
      borderRadius: "8px",
      backgroundColor: theme.palette?.background.paper,
      outline: "none",
      transition: "border .24s ease-in-out",
    };
  }, [theme?.palette]);

  const focusedStyle = useMemo(
    () => ({
      borderColor: theme.palette?.secondary.main,
    }),
    [theme.palette?.secondary.main]
  );

  const acceptStyle = useMemo(
    () => ({
      borderColor: theme.palette?.success.dark,
    }),
    [theme.palette?.success.dark]
  );

  const rejectStyle = useMemo(
    () => ({
      borderColor: theme.palette?.error.main,
    }),
    [theme.palette?.error.main]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const images = useMemo(
    () =>
      files.map((file) => (
        <div key={file.name}>
          <div>
            <img src={file.preview} style={{ width: "200px" }} alt="preview" />
          </div>
        </div>
      )),
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      baseStyle,
      isFocused,
      focusedStyle,
      isDragAccept,
      acceptStyle,
      isDragReject,
      rejectStyle,
    ]
  );

  return (
    <Container disableGutters>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <Stack direction="row" spacing={1}>
          <CloudUploadOutlinedIcon />
          <Typography>
            Drop files to attach, or <Link>Browse</Link>
          </Typography>
        </Stack>

        <Typography fontWeight="bold" color="text.secondary">
          (Individual file upload size limit 10 MB)
        </Typography>
      </div>
      <div>{images}</div>
    </Container>
  );
};

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default DropzoneArea;
