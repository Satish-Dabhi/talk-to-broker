import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import * as constant from '../../services/utils/constant';

const InputAdornmentField = ({
  id,
  label,
  value,
  onChange,
  schema,
  uiSchema,
  required
}) => {
  const { icon, position } = uiSchema;
  return (
    <>
      <TextField
        label={required ? `${label}*` : label}
        id={id}
        // sx={{ m: 1}}
        InputProps={{
          endAdornment: <InputAdornment position={position}>{icon}</InputAdornment>,
        }}
        //startAdornment
        value={value || ''}
        onChange={(e) => e.target.value && onChange(e.target.value)}
        variant={constant.OUTLINED_FORM_VARIANT}
      />
    </>
  );
}

export default InputAdornmentField;