import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import './dashboard.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { convertToTitleCase, setSessionStorageObject } from '../../services/utils';
import CryptoJS from 'crypto-js';
import * as constant from '../../services/utils/constant';
import { useNavigate } from 'react-router-dom';




const rows = [
  { id: 1, propertyStatus: 'Snow', propertyType: 'Jon', propertyOwnership: 35 },
  { id: 2, propertyStatus: 'Lannister', propertyType: 'Cersei', propertyOwnership: 42 },
  { id: 3, propertyStatus: 'Lannister', propertyType: 'Jaime', propertyOwnership: 45 },
  { id: 4, propertyStatus: 'Stark', propertyType: 'Arya', propertyOwnership: 16 },
  { id: 5, propertyStatus: 'Targaryen', propertyType: 'Daenerys', propertyOwnership: null },
  { id: 6, propertyStatus: 'Melisandre', propertyType: null, propertyOwnership: 150 },
  { id: 7, propertyStatus: 'Clifford', propertyType: 'Ferrara', propertyOwnership: 44 },
  { id: 8, propertyStatus: 'Frances', propertyType: 'Rossini', propertyOwnership: 36 },
  { id: 9, propertyStatus: 'Roxie', propertyType: 'Harvey', propertyOwnership: 65 },
];

export default function DataTable({ data }) {
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
      setSessionStorageObject(constant.SESSION_KEY, encrypted);
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
