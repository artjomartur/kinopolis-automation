let Component;
var Target_default = (React) => {
  if (!Component) {
    const renderPathForWeight = (weight, color, pathsByWeight2) =>
      !!pathsByWeight2.get(weight) ? pathsByWeight2.get(weight)(color) : null;
    const pathsByWeight = new Map();
    pathsByWeight.set("bold", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("line", {
          x1: "128",
          y1: "128",
          x2: "224",
          y2: "32",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M161.9,94.1a47.9,47.9,0,1,0,0,67.8,47.1,47.1,0,0,0,13.2-24.4",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M195.9,60.1A96.1,96.1,0,1,0,218,94.6",
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
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "128",
          r: "48",
          opacity: "0.2",
        }),
        /* @__PURE__ */ React.createElement("line", {
          x1: "128",
          y1: "128",
          x2: "224",
          y2: "32",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M161.9,94.1a47.9,47.9,0,1,0,14,31.2",
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
          d: "M211.2,79.4a8,8,0,0,0-3.8,10.7,88,88,0,1,1-23.1-29.7L161.5,83.2a56,56,0,0,0-73.1,84.4h0a56,56,0,0,0,95.5-42.8,7.9,7.9,0,0,0-8.4-7.5,8,8,0,0,0-7.6,8.4,40,40,0,0,1-62,35.7l24-24,37.7-37.7h0l62.1-62a8.1,8.1,0,0,0-11.4-11.4L195.7,49A104,104,0,0,0,54.5,54.5a103.8,103.8,0,0,0,0,147,103.8,103.8,0,0,0,147,0A104,104,0,0,0,221.9,83.2,8,8,0,0,0,211.2,79.4Z",
        })
      )
    );
    pathsByWeight.set("light", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("line", {
          x1: "128",
          y1: "128",
          x2: "224",
          y2: "32",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M161.9,94.1a47.9,47.9,0,1,0,14,31.2",
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
        /* @__PURE__ */ React.createElement("line", {
          x1: "128",
          y1: "128",
          x2: "224",
          y2: "32",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M161.9,94.1a47.9,47.9,0,1,0,14,31.2",
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
        /* @__PURE__ */ React.createElement("line", {
          x1: "128",
          y1: "128",
          x2: "224",
          y2: "32",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M161.9,94.1a47.9,47.9,0,1,0,14,31.2",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        })
      )
    );
    const renderPath = (weight, color) => renderPathForWeight(weight, color, pathsByWeight);
    const Target = React.forwardRef((props, ref) =>
      /* @__PURE__ */ React.createElement(
        "g",
        {
          ref,
          ...props,
        },
        renderPath(props.weight, props.color)
      )
    );
    Target.displayName = "Target";
    Component = Target;
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
export { __FramerMetadata__, Target_default as default };
