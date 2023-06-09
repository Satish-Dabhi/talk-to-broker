import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { STORE_IMAGE_API } from '../../redux/services/api';
import { updateSnackBar } from '../../redux/common/snackBarSlice';
import { useDispatch } from 'react-redux';

const FileWidget = (props) => {
  const { id, label, multiple, onChange, value, schema } = props;
  const { minItems, maxItems } = schema;
  const [finalFiles, setFinalFiles] = useState(value);
  const [saveImageLoader, setSaveImageLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onChange(finalFiles);
  }, [finalFiles]);

  const handleFileChange = async (event) => {
    setSaveImageLoader(true);
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);

    const SaveImageResponse = await STORE_IMAGE_API('/property/uploadImages', formData);
    if (SaveImageResponse.success) {
      setSaveImageLoader(false);
      setFinalFiles((oldArray) => [...oldArray, SaveImageResponse.url]);
    } else {
      dispatch(
        updateSnackBar({
          open: true,
          message: 'Something went wrong',
          severity: 'error',
        })
      );
      setSaveImageLoader(false);
    }
  };

  const removeFile = (file) => {
    setFinalFiles((prevBase64) => prevBase64.filter((base64, index) => finalFiles[index] !== file));
  };

  const handleAddClick = () => {
    const input = document.getElementById(id);
    input.click();
  };

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <input
        id={id}
        type="file"
        name="file"
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/jpeg,image/png,image/gif"
      />
      <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} onClick={handleAddClick}>
        Add Images
      </Button>
      <Typography variant="subtitle1" gutterBottom>
        Choose an image between {minItems} to {maxItems}
      </Typography>
      {saveImageLoader && (
        <>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </>
      )}
      {finalFiles.length > 0 && (
        <div>
          <h4>Selected Images:</h4>
          {finalFiles.map((file, index) => {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={file}
                  alt={`property-img-${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                />
                <Button variant="outlined" color="secondary" startIcon={<ClearIcon />} onClick={() => removeFile(file)}>
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </FormControl>
  );
};

export default FileWidget;
