import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div className={props.class} style={showWhenVisible}>
        {props.children}
        <Button variant='warning' onClick={toggleVisibility}>close</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisibility}>{props.btnLabel}</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

export default Togglable;
