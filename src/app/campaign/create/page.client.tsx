"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPageTemplate,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
} from "@elastic/eui";
import { is } from "@elastic/eui/src/utils/prop_types/is";

import {
  campaignTypeOptions,
  geoOptions,
  statusOptions,
  subCampaignTypeOptionsMap,
  updateFilteredAreaOptions,
} from "@/services/campaign/lib/options";
import { CampaignCreateInput } from "@/services/campaign/types";

export default function PageClient() {
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control, watch, resetField, setValue, trigger } =
    useForm<CampaignCreateInput>({
      defaultValues: {
        name: "",
        description: "",
        status: "Active",
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

  // URL Parsing
  const urlToOptionsMap = useMemo(
    (): {
      [key: string]: {
        fieldName: string;
        isTextInput?: boolean;
        options?: string[];
      };
    } => ({
      name: {
        fieldName: "name",
        isTextInput: true,
      },
      type: {
        fieldName: "type",
        options: campaignTypeOptions,
      },
      subtype: {
        fieldName: "subtype",
        options: subCampaignTypeOptions,
      },
      status: {
        fieldName: "status",
        options: statusOptions,
      },
      geo: {
        fieldName: "geo",
        options: geoOptions,
      },
      area: {
        fieldName: "area",
        options: filteredAreaOptions,
      },
    }),
    [subCampaignTypeOptions, filteredAreaOptions],
  );

  useEffect(() => {
    if (isSubmitting) return;
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams.toString());
    const updates: { [key: string]: any } = {};

    Object.entries(urlToOptionsMap).forEach(([key, fieldMapping]) => {
      const fieldValue = params.get(key);
      if (fieldValue) {
        const decodedValue = decodeURIComponent(fieldValue);
        const values = decodedValue
          .split(",")
          .map((v) => v.trim().toLowerCase());

        if (fieldMapping.isTextInput) {
          updates[fieldMapping.fieldName] = decodedValue;
        } else if (Array.isArray(fieldMapping.options)) {
          const matchedOption = fieldMapping.options.find((option) =>
            values.includes(decodeURIComponent(option.toLowerCase())),
          );
          if (matchedOption) {
            updates[fieldMapping.fieldName] = matchedOption;
          }
        }
      }

      Object.entries(updates).forEach(([field, value]) => {
        setValue(field as keyof CampaignCreateInput, value, {
          shouldValidate: false,
        });
      });

      trigger();
    });
  }, [isSubmitting, searchParams, setValue, trigger]);

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
            name="status"
            control={control}
            render={({
              field: { name, ref, value, ...rest },
              fieldState: { invalid, error },
            }) => (
              <EuiFormRow
                label={name}
                error={error?.message}
                isInvalid={invalid}
              >
                <EuiSwitch
                  showLabel={false}
                  label={name}
                  checked={value === "Active"}
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
