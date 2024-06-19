import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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

  const whenVisible = () => (
    <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisibility}>close</button>
    </div>
  );

  const whenNotVisible = () => (
    <div style={hideWhenVisible}>
      <button onClick={toggleVisibility}>{props.btnLabel}</button>
    </div>
  );

  return (
    <div>
      <div className={props.class} style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>close</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      {/* {visible === true && whenVisible()}
      {visible === false && whenNotVisible()} */}
    </div>
  );
});

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

export default Togglable;
