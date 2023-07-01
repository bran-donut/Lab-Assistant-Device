/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorkspaceCreateFormInputValues = {
    name?: string;
    color?: string;
};
export declare type WorkspaceCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkspaceCreateFormOverridesProps = {
    WorkspaceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkspaceCreateFormProps = React.PropsWithChildren<{
    overrides?: WorkspaceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorkspaceCreateFormInputValues) => WorkspaceCreateFormInputValues;
    onSuccess?: (fields: WorkspaceCreateFormInputValues) => void;
    onError?: (fields: WorkspaceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkspaceCreateFormInputValues) => WorkspaceCreateFormInputValues;
    onValidate?: WorkspaceCreateFormValidationValues;
} & React.CSSProperties>;
export default function WorkspaceCreateForm(props: WorkspaceCreateFormProps): React.ReactElement;
