import React from 'react';
import { IFieldProps } from '../index';
import { FieldArray, FormikValues } from 'formik';
import { get } from 'lodash';
import { IconButton, Button, ButtonProps, IconButtonProps, TextFieldProps } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { getComponentConfig } from '../index';
import { Theme } from '@mui/system';

interface IFieldArrayProps {
    name: string
    id: string
    itemType: string
    addButtonProps?: ButtonProps
    addButtonText?: string
    addButton?: JSX.Element
    removeButton?: JSX.Element
    removeButtonProps?: IconButtonProps
    textFieldProps?: TextFieldProps
    defaultData?: any
}
export interface IProps extends IFieldProps {
    fieldProps?: IFieldArrayProps
}

/* interface IArrayItemProps extends TextFieldProps {
    fieldValue?: string
    formikProps?: FormikValues
    name?: string
    itemIndex?: number

} */

/* export const ArrayItem:React.FC<IArrayItemProps> = (props) => {
    const {fieldValue='',} = props;
    return (
        <div>
            <TextField/>
        </div>
    )
} */

export const MUIFieldArray: React.FC<IProps> = (props) => {
    const { formikProps = {} as FormikValues, fieldProps = {} as IFieldArrayProps } = props;
    const { itemType, addButtonText = 'Add', addButtonProps, addButton, removeButton, removeButtonProps, textFieldProps = {}, defaultData = {} } = fieldProps;
    const values = get(formikProps, `values.${fieldProps.name}`);
    const itemComponentConfig = getComponentConfig(itemType);
    const classes = useStyles();



    return (
        <FieldArray name={fieldProps.name}
            render={arrayHelpers => (
                <div>
                    {
                        (values || []).map((value: any, index: number) => (
                            <div key={`${fieldProps.name}-${index}`} className={classes.arrayItem}>
                                {React.cloneElement(itemComponentConfig.component, { name: fieldProps.name, itemIndex: index, arrayHelpers, fieldValue: value, formikProps, ...itemComponentConfig.props, ...textFieldProps })}
                                {
                                    (removeButton) ? removeButton : (
                                        <IconButton className={classes.arrayRemoveIcon} size="small" onClick={() => arrayHelpers.remove(index)} {...removeButtonProps}><CloseIcon /></IconButton>
                                    )
                                }

                            </div>
                        ))
                    }
                    <div>
                        {(addButton) ? addButton : (<Button type="button" onClick={() => arrayHelpers.push(defaultData)} {...addButtonProps}>{addButtonText}</Button>)}
                    </div>

                </div>

            )}
        />
    )
}

const useStyles = makeStyles<Theme>(() => {
    return (createStyles({
        arrayItem: {
            position: 'relative'
        },
        arrayRemoveIcon: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(0,-50%)'
        }
    }))
})