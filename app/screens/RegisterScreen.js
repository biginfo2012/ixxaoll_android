import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "app/components/forms";
import { AppScreen } from "app/components";
import i18n from "../constants/i18n";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  return (
    <AppScreen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        // onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField autoCorrect={false} icon="account" name="name" placeholder={i18n.t('register.name')} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder={i18n.t('register.email')}
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder={i18n.t('register.password')}
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title={i18n.t('register.register')} />
      </Form>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
