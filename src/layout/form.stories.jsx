import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from './form';
import Textbox from '@/input/textbox';

storiesOf('Layout', module).add('Form', () => (
  <div>
    The first element of a form should be some kind of input. The form adds the proper margin
    between the first input and the content before it.
    <Form>
      <Textbox value="" label="First Input" />

      <Textbox value="" label="Second Input" />
    </Form>
    <Form error="This is what a form looks like when there is an error submitting data.">
      <Textbox value="" label="First Input" />

      <Textbox value="" label="Second Input" />
    </Form>
  </div>
));
