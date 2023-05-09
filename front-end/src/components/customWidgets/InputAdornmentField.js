import { InputAdornment, OutlinedInput, TextField } from '@material-ui/core';
import React from 'react';
import * as constant from '../../services/utils/constant';

const InputAdornmentField = ({
  id,
  label,
  value,
  onChange,
  schema,
  uiSchema,
}) => {
  const {icon, position} = uiSchema;

  return (
    <>
      <TextField
          label={label}
          id={id}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position={position}>{icon}</InputAdornment>,
          }}
          //startAdornment
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          variant={constant.OUTLINED_FORM_VARIANT}
        />
    </>
  );
}

export default InputAdornmentField;