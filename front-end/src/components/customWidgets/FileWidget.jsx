import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

const FileWidget = (props) => {
    const { id, label, multiple, onChange, value } = props;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [finalFiles, setFinalFiles] = useState([]);

    useEffect(() => {
        if (value) {
            const arrayValue = JSON.parse(value);
            console.log("arrayValue-=", arrayValue);
            arrayValue.length > 0 && setFinalFiles(arrayValue);
        }
    }, [value])

    console.log("selectedFilesselectedFiles", selectedFiles);
    console.log("finalFilesfinalFiles", finalFiles);


    useEffect(() => {
        onChange(JSON.stringify(finalFiles));
    }, [finalFiles]);


    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        // setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

        const fileURLs = fileArray.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64Data = reader.result;
                setFinalFiles(oldArray => [...oldArray, base64Data]);
            };
            return URL.createObjectURL(file);
        });
    };

    const removeFile = (file) => {
        // setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
        setFinalFiles((prevBase64) => prevBase64.filter((base64, index) => finalFiles[index] !== file));
    };

    const handleAddClick = () => {
        const input = document.getElementById(id);
        input.click();
    };

    return (
        <FormControl>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type="file"
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
            {finalFiles.length > 0 && (
                <div>
                    <h4>Selected Images:</h4>
                    {finalFiles.map((file, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                // src={URL.createObjectURL(file)}
                                // src={`data:image/jpeg;base64,${file}`}
                                src={file}
                                alt={`Preview ${index}`}
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
                    ))}
                </div>
            )}
        </FormControl>
    );
};

export default FileWidget;
