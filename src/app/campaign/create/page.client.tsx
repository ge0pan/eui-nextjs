"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPageTemplate,
} from "@elastic/eui";

import { CampaignCreateInput } from "@/services/campaign/types";

const subCampaignTypeOptionsMap = {
  General: ["All"],
};

export default function PageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("isSubmitting", isSubmitting);

  const [subCampaignTypeOptions, setSubCampaignTypeOptions] = useState<
    string[]
  >([]);
  const [filteredDeliveryOptions, setFilteredDeliveryOptions] = useState<
    string[]
  >([]);

  const { handleSubmit, control, watch, resetField } =
    useForm<CampaignCreateInput>({
      defaultValues: {
        name: "",
        description: "",
        status: "",
        geo: "",
        area: "",
        language: "",
      },
    });

  const campaignType = watch("type");
  const subCampaignType = watch("subtype");
  const geo = watch("geo");
  const area = watch("area");

  // Field Dependencies
  useEffect(() => {
    if (isSubmitting) return;

    if (campaignType) {
      // const options = subCampaignTypeOptionsMap[campaignType] || [];
      const options: string[] = [];
      setSubCampaignTypeOptions(options);
      resetField("subtype", { defaultValue: "" });
    } else {
      setSubCampaignTypeOptions([]);
      resetField("subtype", { defaultValue: "" });
    }
  }, [isSubmitting, campaignType, resetField]);

  // useEffect(() => {
  //   if (isSubmitting) return;

  //   updateFilteredAreaOptions(selectedGeo, setFilteredAreaOptions);
  // }, [selectedGeo, isSubmitting]);

  const onSubmit: SubmitHandler<CampaignCreateInput> = useCallback((data) => {
    setIsSubmitting(true);
    console.log(data);

    const t = setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Campaign Create"
        description="Create a new campaign"
      />

      <EuiPageTemplate.Section>
        <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({
              field: { name, ref, ...rest },
              fieldState: { invalid, error },
            }) => (
              <EuiFormRow
                label={name}
                error={error?.message}
                isInvalid={invalid}
              >
                <EuiFieldText inputRef={ref} {...rest} />
              </EuiFormRow>
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "This field is required" }}
            render={({
              field: { name, ref, ...rest },
              fieldState: { invalid, error },
            }) => (
              <EuiFormRow
                label={name}
                error={error?.message}
                isInvalid={invalid}
              >
                <EuiFieldText inputRef={ref} {...rest} />
              </EuiFormRow>
            )}
          />

          <EuiButton type="submit">Submit</EuiButton>
        </EuiForm>
      </EuiPageTemplate.Section>
    </>
  );
}
