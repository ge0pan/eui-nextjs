"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPageTemplate,
  EuiSelect,
  EuiTextArea,
} from "@elastic/eui";

import {
  campaignTypeOptions,
  geoOptions,
  subCampaignTypeOptionsMap,
  updateFilteredAreaOptions,
} from "@/services/campaign/lib/options";
import { CampaignCreateInput } from "@/services/campaign/types";

export default function PageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const geo = watch("geo");

  const [subCampaignTypeOptions, setSubCampaignTypeOptions] = useState<
    string[]
  >([]);
  const [filteredAreaOptions, setFilteredAreaOptions] = useState<string[]>([]);

  // Field Dependencies
  useEffect(() => {
    if (isSubmitting) return;

    if (campaignType) {
      const options =
        subCampaignTypeOptionsMap[
          campaignType as keyof typeof subCampaignTypeOptionsMap
        ] || [];
      setSubCampaignTypeOptions(options);
      resetField("subtype", { defaultValue: "" });
    } else {
      setSubCampaignTypeOptions([]);
      resetField("subtype", { defaultValue: "" });
    }
  }, [isSubmitting, campaignType, resetField]);

  useEffect(() => {
    if (isSubmitting) return;

    updateFilteredAreaOptions(geo, setFilteredAreaOptions);
  }, [geo, isSubmitting]);

  const onSubmit: SubmitHandler<CampaignCreateInput> = useCallback((data) => {
    setIsSubmitting(true);

    const t = setTimeout(() => {
      console.log("Submitted:", data);
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
                <EuiFieldText isInvalid={invalid} inputRef={ref} {...rest} />
              </EuiFormRow>
            )}
          />

          <Controller
            name="type"
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
                <EuiSelect
                  isInvalid={invalid}
                  options={[
                    { value: "", text: "Select..." },
                    ...campaignTypeOptions.map((text) => ({
                      text,
                    })),
                  ]}
                  {...rest}
                />
              </EuiFormRow>
            )}
          />

          <Controller
            name="subtype"
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
                <EuiSelect
                  isInvalid={invalid}
                  options={[
                    { value: "", text: "Select..." },
                    ...subCampaignTypeOptions.map((text) => ({
                      text,
                    })),
                  ]}
                  {...rest}
                />
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
                <EuiTextArea isInvalid={invalid} inputRef={ref} {...rest} />
              </EuiFormRow>
            )}
          />

          <Controller
            name="geo"
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
                <EuiSelect
                  isInvalid={invalid}
                  options={[
                    { value: "", text: "Select..." },
                    ...geoOptions.map((text) => ({
                      text,
                    })),
                  ]}
                  {...rest}
                />
              </EuiFormRow>
            )}
          />

          <Controller
            name="area"
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
                <EuiSelect
                  isInvalid={invalid}
                  options={[
                    { value: "", text: "Select..." },
                    ...filteredAreaOptions.map((text) => ({
                      text,
                    })),
                  ]}
                  {...rest}
                />
              </EuiFormRow>
            )}
          />

          <EuiButton type="submit" isLoading={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </EuiButton>
        </EuiForm>
      </EuiPageTemplate.Section>
    </>
  );
}
