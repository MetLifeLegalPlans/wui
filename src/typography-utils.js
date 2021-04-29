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
      40,
      42,
      {
        letterSpacing: 0.28,
      },
    ],
    phone: [28, 32],
  },
  h2: {
    desktop: [
      32,
      42,
      {
        marginBottom: 8,
        letterSpacing: 0.22,
      },
    ],
    phone: [24, 32],
  },
  h3: {
    desktop: [28, 39],
    phone: [24, 39],
  },
  h4: {
    desktop: [
      24,
      39,
      {
        marginBottom: 4,
      },
    ],
    phone: [22, 39],
  },
  h5: {
    desktop: [
      22,
      32,
      {
        marginBottom: 4,
      },
    ],
  },
  h6: {
    desktop: [18, 28],
  },
};

export const bodyDefinitions = {
  subtitle1: {
    aliases: ['superhero'],
    color: 'superhero',
    style: [24, 34],
  },
  body1: {
    aliases: ['intro'],
    color: 'secondary',
    style: [18, 28],
  },
  body2: {
    aliases: ['medium', 'default'],
    color: 'secondary',
    style: [16, 26],
  },
  caption: {
    aliases: ['regular'],
    color: 'secondary',
    style: [14, 24],
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
      definitions[variant][theme.breakpoints.phone] = makeStyle(phone, 600);
    }
  });

  Object.entries(bodyDefinitions).forEach(([variant, { color, style }]) => {
    definitions[variant] = {};
    definitions[variant] = makeStyle(style);
    definitions[variant].color = theme.palette.text[color];
  });

  return deepmerge(theme.typography, definitions);
}
