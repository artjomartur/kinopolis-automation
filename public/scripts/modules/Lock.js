let Component;
var Lock_default = (React) => {
  if (!Component) {
    const renderPathForWeight = (weight, color, pathsByWeight2) =>
      !!pathsByWeight2.get(weight) ? pathsByWeight2.get(weight)(color) : null;
    const pathsByWeight = new Map();
    pathsByWeight.set("bold", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "24",
        }),
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "152",
          r: "16",
        })
      )
    );
    pathsByWeight.set("duotone", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          opacity: "0.2",
        }),
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "152",
          r: "12",
        })
      )
    );
    pathsByWeight.set("fill", () =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("path", {
          d: "M208,80H172V52a44,44,0,0,0-88,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm28-84H100V52a28,28,0,0,1,56,0Z",
        })
      )
    );
    pathsByWeight.set("light", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "12",
        }),
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "152",
          r: "10",
        })
      )
    );
    pathsByWeight.set("thin", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "8",
        }),
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "152",
          r: "8",
        })
      )
    );
    pathsByWeight.set("regular", (color) =>
      /* @__PURE__ */ React.createElement(
        React.Fragment,
        null,
        /* @__PURE__ */ React.createElement("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "16",
        }),
        /* @__PURE__ */ React.createElement("circle", {
          cx: "128",
          cy: "152",
          r: "12",
        })
      )
    );
    const renderPath = (weight, color) => renderPathForWeight(weight, color, pathsByWeight);
    const Lock = React.forwardRef((props, ref) =>
      /* @__PURE__ */ React.createElement(
        "g",
        {
          ref,
          ...props,
        },
        renderPath(props.weight, props.color)
      )
    );
    Lock.displayName = "Lock";
    Component = Lock;
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
export { __FramerMetadata__, Lock_default as default };
