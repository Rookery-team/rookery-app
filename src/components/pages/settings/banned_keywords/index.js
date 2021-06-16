import React, { useState } from 'react';

import x from '../../../assets/images/feather/xgrey.svg';

const BannedKeywords = ({ preferences, setPreferences }) => {
  const [newWord, setNewWord] = useState('');

  const removeWord = event => {
    const word = event.currentTarget.attributes.value.value;
    const banned_keywords = preferences.preferences.banned_keywords;
    const index = banned_keywords.indexOf(word);

    if (index !== -1) {
      banned_keywords.splice(index, 1);
    }

    setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, banned_keywords }
    }));
  };

  const addWord = event => {
    event.preventDefault();

    const banned_keywords = preferences.preferences.banned_keywords;

    banned_keywords.push(newWord);

    setPreferences(inputs => ({
      ...inputs,
      preferences: { ...inputs.preferences, banned_keywords }
    }));

    setNewWord('');
  };

  const wordChange = event => {
    event.persist();

    setNewWord(event.target.value);
  };

  return (
    <>
      <form className="add_element" onSubmit={addWord}>
        <p>
          <input
            onChange={wordChange}
            type="text"
            value={newWord}
            placeholder="Entrer les mots à bloquer ici"
          />
        </p>
        <input
          className="add_button button_with_margin"
          type="submit"
          value="Ajouter"
        />
      </form>

      <div className="words">
        {preferences.preferences.banned_keywords.map((value, index) => {
          return (
            <div className="word" id={value} key={index}>
              <p>{value}</p>

              <img
                src={x}
                onClick={removeWord}
                value={value}
                alt="Supprimer le mot"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BannedKeywords;
