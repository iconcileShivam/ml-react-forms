var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Select, FormControl, FormHelperText, MenuItem, InputLabel } from '@mui/material';
import { get, map, isString } from 'lodash';
import { getMenuOptions, getFieldError } from '../Utils';
export var MUISelectField = function (props) {
    var _a = props.fieldConfig, fieldConfig = _a === void 0 ? {} : _a, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b, _c = props.fieldProps, fieldProps = _c === void 0 ? {} : _c;
    var label = fieldProps.label, _d = fieldProps.options, options = _d === void 0 ? [] : _d, emptyItem = fieldProps.emptyItem, helperText = fieldProps.helperText, formControlProps = fieldProps.formControlProps, formHelperTextProps = fieldProps.formHelperTextProps, _e = fieldProps.emptyMenuItemProps, emptyMenuItemProps = _e === void 0 ? {} : _e, _f = fieldProps.menuItemProps, menuItemProps = _f === void 0 ? {} : _f, _g = fieldProps.inputLabelProps, inputLabelProps = _g === void 0 ? {} : _g, _h = fieldProps.hasObjectValue, hasObjectValue = _h === void 0 ? false : _h, selectProps = __rest(fieldProps, ["label", "options", "emptyItem", "helperText", "formControlProps", "formHelperTextProps", "emptyMenuItemProps", "menuItemProps", "inputLabelProps", "hasObjectValue"]);
    var labelId = "".concat(fieldConfig.id, "_label");
    var fieldError = getFieldError((fieldProps.name || ''), formikProps);
    var emptyItemText = (isString(emptyItem) ? emptyItem : 'None');
    var menuOptions = getMenuOptions(options);
    var value = get(formikProps, "values.".concat(fieldProps.name)) || ((selectProps.multiple) ? [] : '');
    if (hasObjectValue) {
        value = JSON.stringify(value);
    }
    var handleChange = function (e) {
        var data = e.target.value;
        if (hasObjectValue) {
            data = JSON.parse(data);
        }
        formikProps.setFieldValue(fieldProps.name, data);
    };
    return (React.createElement(FormControl, __assign({ error: !!fieldError }, formControlProps),
        label &&
            (React.createElement(InputLabel, __assign({ id: labelId }, inputLabelProps), label)),
        React.createElement(Select, __assign({ labelId: labelId, id: fieldConfig.id, value: value, onChange: handleChange, onBlur: formikProps.handleBlur, label: label }, selectProps),
            (emptyItem) &&
                (React.createElement(MenuItem, __assign({ value: '' }, emptyMenuItemProps), emptyItemText)),
            // @ts-ignore MenuItem props types have some ambiguity in Mui type Definition
            map(menuOptions, function (item, index) {
                var value = hasObjectValue ? JSON.stringify(item.value) : item.value;
                return (React.createElement(MenuItem, __assign({ key: "".concat(fieldConfig.id, "_menu_item_").concat(index), value: value }, menuItemProps, (item.menuItemProps || {})), item.name));
            })),
        (fieldError || fieldProps.helperText) &&
            (React.createElement(FormHelperText, __assign({}, formHelperTextProps), fieldError || fieldProps.helperText))));
};
//# sourceMappingURL=MUISelectField.js.map