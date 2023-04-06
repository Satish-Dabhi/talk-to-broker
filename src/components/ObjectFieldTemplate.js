import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

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
    const layout = uiSchema['ui:layout'];
    const { $id } = idSchema;
    if ($id === 'root_computed') {
      return null;
    }
    return (
      <>
        {(uiSchema['ui:title'] || title) && (
          <TitleField
            id={`${idSchema.$id}-title`}
            title={title}
            required={required}
          />
        )}
        {description && (
          <DescriptionField
            id={`${idSchema.$id}-description`}
            description={description}
          />
        )}
        <Grid container={true} spacing={2} >
          {properties.map((element, index) => {
            const elementLayout = layout ? layout[element.name] : {};
            return (
              element.hidden ? (
                element.content
              ) : (
                <Grid
                  item={true}
                  lg={
                    elementLayout?.lg ||
                    elementLayout?.md ||
                    elementLayout?.sm ||
                    elementLayout?.xs ||
                    12
                  }
                  md={
                    elementLayout?.md ||
                    elementLayout?.sm ||
                    elementLayout?.xs ||
                    12
                  }
                  sm={elementLayout?.sm || elementLayout?.xs || 12}
                  xs={elementLayout?.xs || 12}
                  key={index}
                  className={elementLayout?.className || ''}
                  variant="filled"
                  style={{ marginBottom: '10px' }}
                >
                  {element.content}
                </Grid>
              )
            );
          })}
        </Grid>
      </>
    );
  };

export default ObjectFieldTemplate;