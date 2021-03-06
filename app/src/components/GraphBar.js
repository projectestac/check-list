import React from "react";

/**
 * Displays an horizontal bar segmented in different color areas, each one
 * of a width proportional to its associated value.
 * @param {object} props 
 */
function GraphBar(props) {

  const {
    values, labels, colors,
    width = '100px', height = '30px',
    display = 'inline-grid',
    showLabels = true } = props;

  return (
    <div
      style={{
        display,
        gridTemplateColumns: values.map(v => `${v}fr`).join(' '),
        width,
        height,
      }}
    >
      {values.map((v, i) => (
        <div
          key={`seg#${i}`}
          style={{ backgroundColor: colors[i] }}
          title={showLabels && `${labels[i]}: ${v}`}
        />
      ))}
    </div>
  );
}

export default GraphBar;