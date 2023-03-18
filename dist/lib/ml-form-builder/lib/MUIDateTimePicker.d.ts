import * as React from 'react';
import { DatePickerProps, TimePickerProps } from '@mui/lab';
import { IFieldProps } from '..';
export interface IMUIDatePickerProps extends DatePickerProps<any> {
    outputFormat?: string;
}
export declare const MUIDatePicker: React.FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export declare const MUITimePicker: React.FC<IFieldProps & {
    fieldProps?: TimePickerProps<any>;
}>;
