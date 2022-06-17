import React from 'react';

import Modal from '../Modal';

export default {
  title: 'Modal',
  component: Modal,
};

const Template = args => <Modal {...args} />;

export const ModalScreen = Template.bind({});

ModalScreen.args = {
  title: 'This Is An Example Title',
  open: true,
  onClose: () => {},
  children: (
    <div>
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
      egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
      commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
      laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent
      commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
      ullamcorper nulla non metus auctor fringilla.
    </div>
  ),
};
