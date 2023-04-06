import * as React from 'react';
import { DatePickerProps, TimePickerProps } from '@mui/x-date-pickers';
import { IFieldProps } from '..';
export interface IMUIDatePickerProps extends DatePickerProps<any> {
    outputFormat?: string;
    name?: string;
}
export declare const MUIDatePicker: React.FC<IFieldProps & {
    fieldProps?: IMUIDatePickerProps;
}>;
export interface IMUITimePickerProps extends TimePickerProps<any> {
    name?: string;
}
export declare const MUITimePicker: React.FC<IFieldProps & {
    fieldProps?: IMUITimePickerProps;
}>;
