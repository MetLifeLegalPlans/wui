import deepmerge from 'deepmerge';

// Each outer key is the variant. The value is a dictionary
//   with keys for each breakpoint. The inner value is an
//   array, where the items in order are:
//   - font size (required)
//   - line height (required)
//   - additional properties to merge in
// If any of the above are a falsey value, they are not set.
export const headerDefinitions = {
  h1: {
    desktop: [
      44,
      50,
      {
        letterSpacing: -0.46,
      },
    ],
    phone: [
      28,
      38,
      {
        letterSpacing: -0.63,
      },
    ],
  },
  h2: {
    desktop: [
      32,
      40,
      {
        marginBottom: 8,
        letterSpacing: -0.46,
      },
    ],
    phone: [24, 30, { letterSpacing: -0.34 }],
  },
  h3: {
    desktop: [28, 40],
    phone: [24, 30, { letterSpacing: -0.34 }],
  },
  h4: {
    desktop: [
      32,
      30,
      {
        marginBottom: 4,
      },
    ],
  },
  h5: {
    desktop: [
      22,
      30,
      {
        marginBottom: 4,
      },
    ],
  },
  h6: {
    desktop: [18, 22],
  },
};

export const bodyDefinitions = {
  subtitle1: {
    aliases: ['superhero'],
    color: 'superhero',
    style: [20, 30],
  },
  body1: {
    aliases: ['intro'],
    color: 'secondary',
    style: [18, 32, { fontFamily: '"Noto Sans", "Roboto", sans-serif' }],
  },
  body2: {
    aliases: ['medium', 'default'],
    color: 'secondary',
    style: [16, 30, { fontFamily: '"Noto Sans", "Roboto", sans-serif' }],
  },
  caption: {
    aliases: ['regular'],
    color: 'secondary',
    style: [20, 30],
  },
};

function makeStyle([fontSize, lineHeight, additional], fontWeight = null) {
  const style = {
    fontSize,
    lineHeight: `${lineHeight}px`,
  };

  if (additional) {
    Object.assign(style, additional);
  }

  if (fontWeight) {
    style.fontWeight = fontWeight;
  }

  return style;
}

export default function addTypography(theme) {
  const definitions = {};

  Object.entries(headerDefinitions).forEach(([variant, { desktop, phone }]) => {
    definitions[variant] = {};
    definitions[variant] = makeStyle(desktop, 600);

    if (phone) {
      definitions[variant][theme.breakpoints.down('xs')] = makeStyle(phone, 600);
    }
  });

  Object.entries(bodyDefinitions).forEach(([variant, { color, style }]) => {
    definitions[variant] = {};
    definitions[variant] = makeStyle(style);
    definitions[variant].color = theme.palette.text[color];
  });

  return deepmerge(theme.typography, definitions);
}
