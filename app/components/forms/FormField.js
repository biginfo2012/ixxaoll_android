import React from "react";
import { useFormikContext } from "formik";

import { ErrorMessage } from "app/components/forms";
import { AppTextInput } from "app/components";

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput onBlur={() => setFieldTouched(name)} onChangeText={handleChange(name)} width={width} {...otherProps} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
