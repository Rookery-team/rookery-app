import React, { useState } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import { ToggleInput } from '../../ToggleInput';

import 'rc-slider/assets/index.css';

const THEMES = [
  { key: 'economie', title: 'Économie' },
  { key: 'politique', title: 'Politique' },
  { key: 'people', title: 'People' },
  { key: 'international', title: 'International' },
  { key: 'sciences et technologies', title: 'Sciences et Technologies' },
  { key: 'société', title: 'Société' },
  { key: 'lifestyle', title: 'Lifestyle' },
  { key: 'culture', title: 'Culture' },
  { key: 'sport', title: 'Sport' },
  { key: 'finance', title: 'Finance' }
];

const Themes = ({ preferences, setPreferences }) => {
  const [newTheme, setNewTheme] = useState('');

  const Handle = Slider.Handle;

  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        value={value}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const wrapperStyle = { width: 283, padding: 10 };

  const removeTheme = event => {
    const word = event.currentTarget.id;
    const themes = preferences.preferences.themes;
    const index = themes.indexOf(word);

    if (index !== -1) {
      themes.splice(index, 1);
    }

    setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, themes: themes }
    }));
  };

  const addTheme = event => {
    event.preventDefault();

    const themes = preferences.preferences.themes;

    if (
      newTheme === '' ||
      themes.includes(newTheme) ||
      !THEMES.map(item => item.key).includes(newTheme)
    )
      return;

    themes.push(newTheme);

    setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, themes }
    }));

    setNewTheme('');
  };

  const wordChange = event => {
    event.persist();
    setNewTheme(event.target.value);
  };

  const handleClick = event => {
    if (event.currentTarget.classList.contains('active')) {
      removeTheme(event);
    } else {
      const themes = preferences.preferences.themes;

      themes.push(event.currentTarget.id);

      setPreferences(inputs => ({
        ...inputs,
        preferences: { ...inputs.preferences, themes: themes }
      }));
    }
  };

  const handlePrefsChange = newValue => {
    setPreferences(inputs => ({
      ...inputs,
      themes_activated: newValue,
      preferences: {
        ...inputs.preferences,
        prop_themes: newValue ? 0.5 : -1
      }
    }));
  };

  const handleRangeChange = rangeInput => {
    if (!preferences.themes_activated) return;
    setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, prop_themes: rangeInput / 100 }
    }));
  };

  const themes = preferences.preferences.themes;

  const splitedThemes = [];

  const themesClone = themes.slice();

  while (themesClone.length) {
    splitedThemes.push(themesClone.splice(0, 3));
  }

  return (
    <div>
      <ToggleInput
        id="toggle-switch-themes_activated"
        enabled={preferences.themes_activated}
        setEnabled={newValue => {
          handlePrefsChange(newValue);
        }}
        label="J'ai des préférences sur les thèmes"
      />

      <div
        style={{
          display: preferences.themes_activated ? 'block' : 'none'
        }}
      >
        {splitedThemes.map((list, themeIndex) => (
          <div className="themes" key={themeIndex}>
            {list.map((value, themeIndex) => (
              <div
                className="theme active"
                id={value}
                key={themeIndex}
                onClick={handleClick}
              >
                <p>{value}</p>
              </div>
            ))}
          </div>
        ))}

        <form className="add_element" onSubmit={addTheme}>
          <p>
            <select id="theme" value={newTheme} onChange={wordChange}>
              <option value="null"></option>

              {THEMES.map(item => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </p>

          <input className="add_button" type="submit" value="Ajouter" />
        </form>

        <p>Propension moyenne d'articles sur ces thèmes</p>

        <div className="slider" style={wrapperStyle}>
          <Slider
            min={30}
            max={80}
            onChange={handleRangeChange}
            step={10}
            value={preferences.preferences.prop_themes * 100}
            handle={handle}
          />

          <p>{preferences.preferences.prop_themes * 100}%</p>
        </div>
      </div>
    </div>
  );
};

export default Themes;
