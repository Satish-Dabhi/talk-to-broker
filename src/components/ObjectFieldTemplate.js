import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import * as constant from "../services/utils/constant";

const useStyles = makeStyles({
    root: {
        marginTop: 10,
    },
});

const ObjectFieldTemplate = ({
    DescriptionField,
    description,
    TitleField,
    title,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
}) => {
    const layout = uiSchema["ui:layout"];
    const { $id } = idSchema;
    if ($id === "root_computed") {
        return null;
    }
    return (
        <>
            {(uiSchema["ui:title"] || title) && (
                <TitleField id={`${idSchema.$id}-title`} title={title} required={required} />
            )}
            {description && (
                <DescriptionField id={`${idSchema.$id}-description`} description={description} />
            )}
            <Grid container={true} spacing={2}>
                {properties.map((element, index) => {
                    const schemaObject = schema.properties[element.name];
                    const elementLayout = layout ? layout[element.name] : {};
                    return schemaObject?.hidden ? null : element.hidden ? (
                        element.content
                    ) : (
                        <Grid
                            item={true}
                            lg={
                                elementLayout?.lg ||
                                elementLayout?.md ||
                                elementLayout?.sm ||
                                elementLayout?.xs ||
                                schemaObject?.lg ||
                                schemaObject?.md ||
                                schemaObject?.sm ||
                                schemaObject?.xs ||
                                12
                            }
                            md={
                                elementLayout?.md ||
                                elementLayout?.sm ||
                                elementLayout?.xs ||
                                schemaObject?.md ||
                                schemaObject?.sm ||
                                schemaObject?.xs ||
                                12
                            }
                            sm={
                                elementLayout?.sm ||
                                elementLayout?.xs ||
                                schemaObject?.sm ||
                                schemaObject?.xs ||
                                12
                            }
                            xs={elementLayout?.xs || schemaObject?.xs || 12}
                            key={index}
                            className={elementLayout?.className || schemaObject?.className || ""}
                            variant={constant.OUTLINED_FORM_VARIANT}
                            style={{ marginBottom: "10px" }}
                        >
                            {element.content}
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ObjectFieldTemplate;
