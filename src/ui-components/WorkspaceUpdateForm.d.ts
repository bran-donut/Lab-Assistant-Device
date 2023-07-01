/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Workspace } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorkspaceUpdateFormInputValues = {
    name?: string;
    color?: string;
};
export declare type WorkspaceUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkspaceUpdateFormOverridesProps = {
    WorkspaceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkspaceUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkspaceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    workspace?: Workspace;
    onSubmit?: (fields: WorkspaceUpdateFormInputValues) => WorkspaceUpdateFormInputValues;
    onSuccess?: (fields: WorkspaceUpdateFormInputValues) => void;
    onError?: (fields: WorkspaceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkspaceUpdateFormInputValues) => WorkspaceUpdateFormInputValues;
    onValidate?: WorkspaceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkspaceUpdateForm(props: WorkspaceUpdateFormProps): React.ReactElement;
