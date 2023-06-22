import React from "react";
import { useFormikContext } from "formik";

import { AppButton } from "app/components";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
