import { MailComposerAttachment } from "nodemailer/lib/mail-composer";
export declare const sendEmail: ({ to, subject, html, attachments }: {
    to: string;
    subject: string;
    html: string;
    attachments?: MailComposerAttachment[];
}) => Promise<boolean>;
export declare const generate_otp: () => Promise<string>;
//# sourceMappingURL=sendEmail.d.ts.map