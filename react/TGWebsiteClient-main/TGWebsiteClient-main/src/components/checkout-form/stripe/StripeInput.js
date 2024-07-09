import React from "react";

import { useTheme } from '@mui/material/styles';

const StripeInput = React.forwardRef(function StripeInput(props, ref) {
    const {component: Component, editorRef, handleOnChange, ...rest} = props;

    const theme = useTheme();

    React.useImperativeHandle(ref, () => ({
        focus: () => {
            editorRef.current.focus();
        },
    }));

    return <Component
        options={{
            style: {
                base: {
                    fontSize: "16px",
                    lineHeight: "33px",
                    color: theme.palette.mode === "dark" ? "white" : "black"
                }
            }
        }}
        onReady={element => (editorRef.current = element)}
        ref={editorRef}
        {...rest} />;
});

export default StripeInput;