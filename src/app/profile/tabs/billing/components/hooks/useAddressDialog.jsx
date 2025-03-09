import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { _addresses } from "api/addresses/addresses";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

export const useAddressDialog = ({ handleClose }) => {
  const { t } = useTranslation("index");

  // Schema validation using Yup
  const schema = yup.object().shape({
    title: yup.string().required(t("Title is required")),
    first_name: yup.string().required(t("First name is required")),
    last_name: yup.string().required(t("Last name is required")),
    contact_email: yup
      .string()
      .email(t("Invalid email"))
      .required(t("Email is required")),
    city: yup.string().required(t("City is required")),
    state: yup.string().required(t("State is required")),
    line_one: yup.string().required(t("Address is required")),
    delivery_instructions: yup.string(),
  });

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  // Toggle default address checkbox
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data) => _addresses.post(data), // Mutation for creating address
    {
      onSuccess: (res) => {
        if (res.code === 200) {
          handleClose(); // Close dialog on successful creation
          queryClient.invalidateQueries(["addresses"]); // Invalidate queries to refresh address list
        }
        setLoading(false); // Stop loading after response
      },
      onError: (error) => {
        console.error("Error creating address:", error);
        setLoading(false); // Stop loading if there was an error
      },
    }
  );

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  const handleCreate = (input) => {
    if (!userData || !userData.user_id) {
      console.error("User data is not available.");
      return;
    }

    setLoading(true);

    const newInput = {
      ...input,
      user_id: userData.user_id,
      country_id:228,
      billing_default: checked,
      shipping_default: checked,
    };

    mutate(newInput);
  };

  return {
    handleCreate,
    register,
    errors,
    handleChange,
    loading,
    handleSubmit,
    t,
    control,
    setChecked,
  };
};
