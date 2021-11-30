import React from 'react';

import Modal from '../Modal';

export default {
  title: 'Modal',
  component: Modal,
};

const Template = args => <Modal {...args} />;

export const ModalScreen = Template.bind({});
ModalScreen.args = {
  title: 'title',
  open: true,
  onClose: () => {},
  children: <div>children</div>,
};
