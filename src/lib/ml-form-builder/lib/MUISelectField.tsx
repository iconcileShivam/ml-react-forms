import * as React from 'react';
import { Select, FormControl, FormControlProps, FormHelperText, FormHelperTextProps, MenuItem, InputLabel, SelectProps, MenuItemProps, InputLabelProps } from '@mui/material';
import { IFieldProps, FormConfig } from '../index';
import { FormikValues } from 'formik';
import { get, map, isString } from 'lodash';
import { MenuOptions, MenuOptionObject, getMenuOptions, getFieldError } from '../Utils';

export interface IMUISelectProps extends SelectProps {
    label?: string
    options?: MenuOptions
    emptyItem?: string | boolean
    helperText?: string
    formControlProps?: FormControlProps
    formHelperTextProps?: FormHelperTextProps
    emptyMenuItemProps?: object
    menuItemProps?: object
    inputLabelProps?: object
    hasObjectValue?: boolean
}

export interface IProps extends IFieldProps {
    fieldProps?: IMUISelectProps
}

export const MUISelectField: React.FC<IProps> = (props) => {
    const { fieldConfig = {} as FormConfig, formikProps = {} as FormikValues, fieldProps = {} as IMUISelectProps } = props;
    const { label,
        options = [],
        emptyItem,
        helperText,
        formControlProps,
        formHelperTextProps,
        emptyMenuItemProps = {} as MenuItemProps,
        menuItemProps = {} as MenuItemProps,
        inputLabelProps = {} as InputLabelProps,
        hasObjectValue = false,
        ...selectProps } = fieldProps;
    const labelId = `${fieldConfig.id}_label`;
    const fieldError = getFieldError((fieldProps.name || ''), formikProps);
    const emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    const menuOptions = getMenuOptions(options);
    let value = get(formikProps, `values.${fieldProps.name}`) || ((selectProps.multiple) ? [] : '');

    if (hasObjectValue) {
        value = JSON.stringify(value)
    }

    return (
        <FormControl error={!!fieldError} {...formControlProps}
        >
            {
                label &&
                (<InputLabel id={labelId} {...inputLabelProps}>{label}</InputLabel>)
            }
            <Select
                labelId={labelId}
                id={fieldConfig.id}
                value={value}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                label={label}
                {...selectProps}
            >
                {
                    (emptyItem) &&
                    (<MenuItem value='' {...emptyMenuItemProps}>
                        {emptyItemText}
                    </MenuItem>)
                }
                {
                    // @ts-ignore MenuItem props types have some ambiguity in Mui type Definition
                    map(menuOptions, (item: MenuOptionObject, index: number) => (<MenuItem key={`${fieldConfig.id}_menu_item_${index}`} value={item.value} {...menuItemProps} {...(item.menuItemProps || {})} >{item.name}</MenuItem>))
                }
            </Select>
            {
                (fieldError || fieldProps.helperText) &&
                (
                    <FormHelperText {...formHelperTextProps}>{fieldError || fieldProps.helperText}</FormHelperText>
                )
            }

        </FormControl>
    )
}