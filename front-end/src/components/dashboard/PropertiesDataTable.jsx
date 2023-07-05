import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CryptoJS from 'crypto-js';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSessionStorageObject } from '../../services/utils';
import * as constant from '../../services/utils/constant';
import './dashboard.css';


export default function PropertiesDataTable({ data }) {
  const [tableData, setTableData] = React.useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const t_data = Object.keys(data).length > 0 && data.map((item, index) => {
      return {
        id: index + 1,
        ...item
      }
    });
    setTableData(t_data);

  }, [data]);

  const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'propertyType', headerName: 'Property Type', width: 200 },
    { field: 'propertyStatus', headerName: 'Property Status', width: 200 },
    {
      field: 'propertyOwnership',
      headerName: 'Property Ownership',
      width: 200,
    },
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: renderEditCell },
  ];

  function renderEditCell(params) {
    const handleEditClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(selectedFormData), constant.SESSION_OBJECT_SECRET_KEY).toString();
      setSessionStorageObject(constant.PROPERTY_SESSION_KEY, encrypted);
      navigate(`/user/add-property`);
    };

    return (
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    );
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      // checkboxSelection
      />
    </div>
  );
}
