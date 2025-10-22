import { EuiButton, EuiCard } from "@elastic/eui";

import { Email } from "@/services/email/types";

export type EmailDraftCardProps = {
  draft: Email;
};

export const EmailDraftCard: React.FC<EmailDraftCardProps> = ({ draft }) => {
  return (
    <EuiCard
      title={`${draft.name} (Draft)`}
      description={`${draft.type} by ${draft.owner.name}`}
      footer={
        <EuiButton iconType="arrowRight" href="#">
          View
        </EuiButton>
      }
    />
  );
};
