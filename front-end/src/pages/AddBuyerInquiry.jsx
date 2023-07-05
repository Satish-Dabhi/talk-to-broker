import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VerticalLinearStepper from "../components/VerticalLinearStepper";
import BuyerInquiryForm from "../components/jsonForm/BuyerInquiryForm";
import { ADD_BUYER_INQUIRY_FORMS } from "../services/utils";
import { getActiveBuyerInquiryForm } from "../services/utils/getActiveForm";

function AddBuyerInquiry() {
  const [activeForm, setActiveForm] = useState(0);
  const [form, setForm] = useState({});


  useEffect(() => {
    setForm(getActiveBuyerInquiryForm(activeForm));
  }, [activeForm]);

  return (
    <Grid container>
      <Grid item xs={4}>
        <VerticalLinearStepper activeForm={activeForm} setActiveForm={setActiveForm} stepperData={ADD_BUYER_INQUIRY_FORMS} />
      </Grid>
      <Grid item xs={8} id="ttb-form">
        {Object.keys(form).length > 0 && (
          <BuyerInquiryForm
            schema={form.schema}
            uiSchema={form.uiSchema}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default AddBuyerInquiry;
