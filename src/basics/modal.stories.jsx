import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from './modal';

function close() {
  // eslint-disable-next-line
  console.log('clicked close');
}

storiesOf('Basics', module).add('Modal', () => (
  <Modal open onClose={close} title="This is a title">
    This is the content.
  </Modal>
));
