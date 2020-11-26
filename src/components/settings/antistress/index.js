import React, { useState } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { ToggleInput } from '../../ToggleInput';

// @ts-ignore
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};
const wrapperStyle = { width: 283, padding: 10 };

const AntiStress = props => {
  props = props.props;

  const [filterActivated, setFilterActivated] = useState(
    props.preferences.preferences.good_news_min !== -1
  );
  const handleRangeChange = rangeInput => {
    props.setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, good_news_min: rangeInput / 100 }
    }));
  };

  const handleGnChange = newValue => {
    if (newValue) {
      handleRangeChange(50);
    } else {
      handleRangeChange(-100);
    }

    setFilterActivated(newValue);
  };

  return (
    <>
      <ToggleInput
        enabled={filterActivated}
        setEnabled={handleGnChange}
        label="Activer le filtre"
      />

      {filterActivated && (
        <div className="slider">
          <p>À quel point ?</p>

          <div style={wrapperStyle}>
            <Slider
              min={30}
              max={70}
              onChange={handleRangeChange}
              step={10}
              value={props.preferences.preferences.good_news_min * 100}
              handle={handle}
            />
          </div>

          <p className="settings-helper">
            {props.preferences.preferences.good_news_min * 100}% environ
            d'articles non-négatifs en moyenne
          </p>
        </div>
      )}
    </>
  );
};

export default AntiStress;
