import * as React from 'react';
import { IFieldProps } from '../index';
import { SwitchProps } from '@mui/material';
export interface IMUISwitchProps extends SwitchProps {
    label?: string;
}
export interface IProps extends IFieldProps {
    fieldProps?: IMUISwitchProps;
}
export declare const MUISwitch: React.FC<IProps>;
