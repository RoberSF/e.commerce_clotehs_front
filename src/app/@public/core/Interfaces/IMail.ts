export interface IMail {
    from?: string;
    to: string | Array<string>;
    subject: string;
    html: string;
}