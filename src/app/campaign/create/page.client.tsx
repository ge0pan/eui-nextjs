"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiPageTemplate,
} from "@elastic/eui";

import { CampaignCreateInput } from "@/services/campaign/types";

export default function PageClient() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CampaignCreateInput>({
    defaultValues: {
      name: "",
      description: "",
      status: "",
      geo: "",
      area: "",
      language: "",
    },
  });

  const onSubmit: SubmitHandler<CampaignCreateInput> = (data) =>
    console.log(data);

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
            render={({ field: { name, ref, ...rest } }) => (
              <EuiFormRow label={name}>
                <EuiFieldText inputRef={ref} {...rest} />
              </EuiFormRow>
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field: { name, ref, ...rest } }) => (
              <EuiFormRow
                label={name}
                error={errors[name]?.message}
                isInvalid={!!errors[name]}
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
