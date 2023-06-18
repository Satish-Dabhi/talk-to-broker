import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { POST_API, UPLOAD_IMAGE_END_POINT } from '../../redux/services/api';

const FileWidget = (props) => {
    const { id, label, multiple, onChange, value } = props;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [finalFiles, setFinalFiles] = useState([]);

    useEffect(() => {
        if (value) {
            const arrayValue = JSON.parse(value);
            // console.log("arrayValue-=", arrayValue);
            arrayValue.length > 0 && setFinalFiles(arrayValue);
        }
    }, [value])

    console.log("....finalFiles.......", finalFiles);


    useEffect(() => {
        // onChange(JSON.stringify(finalFiles));
        console.log("JSON.stringify(finalFiles)", JSON.stringify(finalFiles));
        // onChange(JSON.stringify(finalFiles));
    }, [finalFiles]);


    const handleFileChange = async (event) => {
        const selectedFile = event.target.files;

        console.log("...........", selectedFile);
        const newSelectedFiles = Array.from(selectedFile);
        const formData = new FormData(selectedFile);
        // newSelectedFiles.forEach((file, index) => {
        //     console.log("formData =>", file);
        //     formData.append(id, file);
        // });
        console.log("formData formData=>", formData);

        // const formData = new FormData();
        // formData.append('image', selectedFile);
        // console.log("image-formData", formData);


        const resp = await POST_API(UPLOAD_IMAGE_END_POINT, formData);

        console.log("resp....", resp);

        setFinalFiles(oldArray => [...oldArray, selectedFile]);

        // const fileArray = Array.from(files);
        // setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

        // const fileURLs = fileArray.map((file) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onloadend = () => {
        //         const base64Data = reader.result;
        //         setFinalFiles(oldArray => [...oldArray, base64Data]);
        //     };
        //     return URL.createObjectURL(file);
        // });
        // console.log("fileURLs",fileURLs);
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
                    {finalFiles.map((file, index) => {
                        // console.log("}/././.",file);
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                                // src={URL.createObjectURL(file)}
                                // src={`data:image/jpeg;base64,${file}`}
                                // src={file}
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
