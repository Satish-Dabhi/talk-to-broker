import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { STORE_IMAGE_API } from '../../redux/services/api';

const FileWidget = (props) => {
    const { id, label, multiple, onChange, value } = props;
    const [finalFiles, setFinalFiles] = useState([]);
    const [saveImageLoader, setSaveImageLoader] = useState(false);

    useEffect(() => {
        if (value) {
            const arrayValue = JSON.parse(value);
            arrayValue.length > 0 && setFinalFiles(arrayValue);
        }
    }, [value]);

    useEffect(() => {
        onChange(JSON.stringify(finalFiles));
    }, [finalFiles]);


    const handleFileChange = async (event) => {
        setSaveImageLoader(true);
        const selectedFile = event.target.files[0];

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('u_id', 12345);

        const SaveImageResponse = await STORE_IMAGE_API('/property/uploadImages', formData);
        setSaveImageLoader(false);
        setFinalFiles(oldArray => [...oldArray, SaveImageResponse]);
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
            />
            <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                onClick={handleAddClick}
            >
                Add Images
            </Button>
            {saveImageLoader && <>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box></>
            }
            {finalFiles.length > 0 && (
                <div>
                    <h4>Selected Images:</h4>
                    {finalFiles.map((file, index) => {
                        return <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                src={file?.url}
                                alt={file.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<ClearIcon />}
                                onClick={() => removeFile(file)}
                            >
                                Remove
                            </Button>
                        </div>
                    })}
                </div>
            )}
        </FormControl>
    );
};

export default FileWidget;
