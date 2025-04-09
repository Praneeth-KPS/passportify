
import { useRef, useState, useEffect } from "react";

import Body1 from "components/ui/typo/Body1";

import { noop } from "utils/misc";

import { primary, white, element, paragraph, grey, hover, heading, red } from "styles/colors";

const numbers = ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Backspace",
"Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9"];

const TextField = props => {

    const {
        label,
        type,
        value,
        lead,
        color,
        colorB,
        width,
        height,
        grow,
        error,
        helper,
        testid,
        auto,
        style,
        options,
        onKeyPress,
        placeholder,
        disabled,
        readonly,
        onInputClick,
    } = props;

    const ref = props.r || useRef();

    const timeout = useRef();
    const stripRef = useRef();
    const labelRef = useRef();

    const [temp, setTemp] = useState(["", "", "", "", "", ""]);
    const [focus, setFocus] = useState(false);
    const [anchor, setAnchor] = useState(null);

    const setWidth = () => {
        if (label) {
            const width = `${labelRef.current.clientWidth * 0.95}px`;
            stripRef.current.style.width = width;
        }
    };

    useEffect(() => {
        if (props.focus) ref.current.focus();
        setWidth();
        timeout.current = setTimeout(() => setWidth(), 200);
        return () => clearTimeout(timeout.current || 0);
    }, []);

    useEffect(() => {
        if (focus) ref.current.focus();
        else ref.current.blur()
    }, [focus]);

    useEffect(() => setWidth(), [label.length]);

    const bool = Boolean(value);
    const pop = Boolean(props.children) || Boolean(props.info);
    const oLa = Boolean(label);
    const oL = Boolean(lead);

    const onFocus = e => {
        setFocus(true);
        props.onFocus(e);
    };

    const onBlur = () => {
        setFocus(false);
        props.onBlur();
    };

    const onChange = e => {
        const { selectionStart, selectionEnd } = e.target;
        const str = e.target.value;
        if (options.mode === "numeric") str = str.replace(/\D+/g, "");
        if (options.max) str = str.charAt(0);
        props.onChange(str);
        setTimeout(() => {
            if (ref && ref.current) ref.current.setSelectionRange(selectionStart, selectionEnd);
        }, 0);
    };

    const onClick = e => {
        if (pop) setAnchor(e.currentTarget);
        else props.onClick();
    };

    const onKeyDown = e => {
        if (options.mode === "numeric") {
            if (e.code && !numbers.includes(e.code)) e.preventDefault()
        }
    };

    const spread = testid ? { "data-testid": testid } : {};

    return (
        <Container
            width = {width}
            height = {height}
            grow = {grow.toString()}
            focus = {focus}
            error = {error.toString()}
            onKeyPress = {onKeyPress}
            onClick = {e => onFocus(e)}
            opacity = {disabled ? 0.6 : 1}>
            {oLa &&
                <Strip
                    ref = {stripRef}
                    show = {focus || bool} />
            }
            {oLa &&
                <Label
                    ref = {labelRef}
                    focus = {focus}
                    value = {bool}>
                    <Body1
                        text = {label}
                        color = {focus || bool ? paragraph : grey}
                        clamp = {1} />
                </Label>
            }
            <Wrapper>
                <Input padding = {oL ? "0px 14px 0px 0px" : "0px 14px"}>
                    <input
                        ref = {ref}
                        data-testid = {label}
                        style = {{
                            textAlign: style.align,
                            textTransform: props.transform
                        }}
                        {...spread}
                        type = {type}
                        value = {value}
                        placeholder = {placeholder}
                        onChange = {onChange}
                        onFocus = {e => onFocus(e)}
                        onBlur = {onBlur}
                        autoComplete = {auto}
                        disabled = {disabled || false}
                        readOnly = {readonly || false}
                        onClick = {onInputClick}
                        onKeyDown = {onKeyDown} />
                </Input>
            </Wrapper>
        </Container>
    );

};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    lead: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
    colorB: PropTypes.string,
    grow: PropTypes.bool,
    error: PropTypes.bool,
    helper: PropTypes.string,
    auto: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.object,
    transform: PropTypes.string,
    focus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func
};

TextField.defaultProps = {
    height: "52px",
    label: "",
    type: "text",
    placeholder: "",
    grow: false,
    error: false,
    color: grey,
    colorB: grey,
    helper: "",
    auto: "off",
    style: { align: "left" },
    options: {
        max: 0,
        mode: "text"
    },
    transform: "none",
    focus: false,
    onChange: noop,
    onClick: noop,
    onFocus: noop,
    onBlur: noop,
    onKeyPress: noop
};

const Container = Styled.div`
    min-width: 44px;
    ${({ width }) => Boolean(width) && ` width: ${width} `};
    ${({ grow }) => grow === "true" && ` flex-grow: 1; `};
    min-height: ${({ height }) => height};
    height: ${({ height }) => height};
    background: ${({ focus }) => focus ? primary : element};
    ${({ focus, error }) => error === "true" && ` background: ${red}; `};
    opacity: ${({ opacity }) => opacity || 1};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    position: relative;
    font-family: Poppins;
    transition: background ease 0.25s;
    cursor: text;
`;

const Wrapper = Styled.div`
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: ${white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    position: relative;
    font-family: Poppins;
`;

const Label = Styled.div`
    position: absolute;
    left: 10px;
    top: 14px;
    pointer-events: none;
    transition: top ease 0.25s, transform ease 0.25s, left ease 0.25s;
    border-radius: 5px;
    padding: 0px 6px;
    z-index: 1;
    ${({ value, focus }) => (value || focus) && `
        top: -14px;
        left: 5px;
        transform: scale(0.95);
    `};
`;

const Strip = Styled.div`
    min-width: 20px;
    height: 2px;
    background: ${white};
    top: 0px;
    left: 8px;
    position: absolute;
    opacity: ${({ show }) => show ? 1 : 0};
`;

const Input = Styled.div`
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    input {
        width: 100%;
        border: none;
        background: none;
        padding: 0px;
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        color: ${paragraph};
        :focus { outline: 0; }
    }
`;

const Inner = Styled.div`
    width: 100%;
    height: ${({ open }) => open ? "22px" : "0px"};
    display: flex;
    padding: 0px 5px 0px 5px;
    transition: height ease 0.25s;
    overflow: hidden;
`;

const SuggestionPaper = Styled.div`
    width: calc(100% - 10px);
    padding: 5px 5px;
    margin: 0px 5px;
    background: ${primary};
    border-radius: 8px;
    cursor: pointer;
`;

export default TextField;
