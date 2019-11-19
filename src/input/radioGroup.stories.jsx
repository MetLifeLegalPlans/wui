import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import RadioGroup from './radioGroup';

const radioGroups = {
  'Nothing Selected': {},
  'Default Selection': { value: true },
  'Custom Options': {
    options: [
      [1, 'One', 'This description is displayed for the dot variant.'],
      [2, 'Two'],
      [3, 'Three', 'Not all options need a description, as can bee seen above.'],
    ],
  },
};

function makeDotsName(name) {
  return `${name} Dots`;
}

const stores = Object.entries(radioGroups).reduce(
  (r, [name, props]) => ({
    ...r,
    [name]: new Store({
      value: props.value || null,
    }),
    [makeDotsName(name)]: new Store({
      value: props.value || null,
    }),
  }),
  {},
);

const example = (name, props, dots = false) => state => {
  const appliedProps = {
    ...props,
    dots,
    value: state.value,
    onChange: value => stores[name].set({ value }),
  };

  return (
    <React.Fragment>
      <div>
        <RadioGroup label={name} {...appliedProps} />
      </div>
      <div>
        <RadioGroup disabled {...appliedProps} label={`${name} Disabled`} />
      </div>
    </React.Fragment>
  );
};

storiesOf('Input', module).add('RadioGroup', () =>
  Object.entries(radioGroups).map(([name, props]) => {
    const dotsName = makeDotsName(name);

    return (
      <React.Fragment>
        <State key={name} store={stores[name]}>
          {example(name, props)}
        </State>
        <State key={dotsName} store={stores[dotsName]}>
          {example(dotsName, props, true)}
        </State>
      </React.Fragment>
    );
  }),
);
