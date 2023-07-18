import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { CircularProgress, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CryptoJS from 'crypto-js';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSessionStorageObject } from '../../services/utils';
import * as constant from '../../services/utils/constant';
import './dashboard.css';
import { useSelector } from 'react-redux';
import ShareProperties from '../ShareProperties';


export default function BuyerInquiriesDataTable({ data, smallScreen, propertiesData }) {
  const { getBuyerInquiriesByUserLoader } = useSelector((store) => store.buyerInquiryHandler);
  const [tableData, setTableData] = React.useState({});
  const [sharePropertiesModal, setSharePropertiesModal] = React.useState(false);

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
    // { field: 'inquiryFor', headerName: 'Inquiry For', width: 150 },
    { field: 'name', headerName: 'Client Name', width: 150 },
    { field: 'inquiryIn', headerName: 'Inquiry In', width: 150 },
    { field: 'propertyType', headerName: 'Property Type', width: 200 },
    { field: 'subPropertyType', headerName: 'SubProperty Type', width: 200 },
    { field: 'budget', headerName: 'Budget', width: 200 },
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: renderEditCell },
    { field: 'share', headerName: 'Share', width: 70, renderCell: renderShareCell },
  ];

  function renderEditCell(params) {
    const handleEditClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(selectedFormData), constant.SESSION_OBJECT_SECRET_KEY).toString();
      setSessionStorageObject(constant.BUYER_INQUIRY_SESSION_KEY, encrypted);
      navigate(`/user/add-buyer`);
    };

    return (
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    );
  }

  function renderShareCell(params) {
    const handleShareClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      console.log("selectedFormDataselectedFormData", selectedFormData?.contactNumber);
      setSharePropertiesModal(true);
      // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(selectedFormData), constant.SESSION_OBJECT_SECRET_KEY).toString();
      // setSessionStorageObject(constant.BUYER_INQUIRY_SESSION_KEY, encrypted);
      // navigate(`/user/add-buyer`);
    };

    return (
      <IconButton onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>
    );
  }

  return (
    <>
      {sharePropertiesModal && <ShareProperties open={sharePropertiesModal} setOpen={setSharePropertiesModal} properties={propertiesData} smallScreen={smallScreen} />}
      <div style={{ height: 400, width: '100%' }}>
        {
          getBuyerInquiriesByUserLoader ? <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100vh" }}>
            <CircularProgress />
          </div> :
            <DataGrid
              rows={tableData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{ overflowX: 'scroll', width: `${smallScreen && '100vw'}` }}
            // checkboxSelection
            />
        }
      </div>
    </>
  );
}
