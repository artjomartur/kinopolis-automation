let Component;
var Bell_default = (React) => {
  if (!Component) {
    const renderPathForWeight = (weight, color, pathsByWeight2) =>
      !!pathsByWeight2.get(weight) ? pathsByWeight2.get(weight)(color) : null;
    const pathsByWeight = new Map();
    pathsByWeight.set("bold", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M96,192v8a32,32,0,0,0,64,0v-8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        })
      )
    );
    pathsByWeight.set("duotone", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          opacity: "0.2",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M96,192v8a32,32,0,0,0,64,0v-8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        })
      )
    );
    pathsByWeight.set("fill", () =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M220.8,175.9c-5.9-10.2-13-29.6-13-63.9v-7.1c0-44.3-35.5-80.6-79.2-80.9H128a79.9,79.9,0,0,0-79.8,80v8c0,34.3-7.1,53.7-13,63.9A16,16,0,0,0,49,200H88a40,40,0,0,0,80,0h39a15.9,15.9,0,0,0,13.9-8A16.2,16.2,0,0,0,220.8,175.9ZM128,224a24.1,24.1,0,0,1-24-24h48A24.1,24.1,0,0,1,128,224Z",
        })
      )
    );
    pathsByWeight.set("light", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M96,192v8a32,32,0,0,0,64,0v-8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        })
      )
    );
    pathsByWeight.set("thin", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M96,192v8a32,32,0,0,0,64,0v-8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        })
      )
    );
    pathsByWeight.set("regular", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M56.2,104a71.9,71.9,0,0,1,72.3-72c39.6.3,71.3,33.2,71.3,72.9V112c0,35.8,7.5,56.6,14.1,68a8,8,0,0,1-6.9,12H49a8,8,0,0,1-6.9-12c6.6-11.4,14.1-32.2,14.1-68Z",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M96,192v8a32,32,0,0,0,64,0v-8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        })
      )
    );
    const renderPath = (weight, color) => renderPathForWeight(weight, color, pathsByWeight);
    const Bell = React.forwardRef((props, ref) =>
      /* @__PURE__ */ React.createElement(
        "g",
        {
          ref,
          ...props,
        },
        renderPath(props.weight, props.color)
      )
    );
    Bell.displayName = "Bell";
    Component = Bell;
  }
  return Component;
};
const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      slots: [],
      annotations: { framerContractVersion: "1" },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
export { __FramerMetadata__, Bell_default as default };
