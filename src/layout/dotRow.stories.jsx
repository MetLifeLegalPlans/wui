import React from 'react';
import { storiesOf } from '@storybook/react';

import Panel from './panel';
import DotRow from './dotRow';

storiesOf('Layout', module).add('DotRow', () => (
  <div style={{ padding: 5 }}>
    <Panel noOverflow>
      <DotRow active>
        <span>This is the first item.</span>
      </DotRow>
      <DotRow>
        <div>
          This is the second item.
          <br />
          It has multiple lines in the first
          <br />
          element, which the dot should be
          <br />
          centered on.
        </div>
        <div>The content spans multiple lines.</div>
      </DotRow>
      <DotRow>
        <div>This is the third item.</div>
      </DotRow>
    </Panel>

    <Panel noOverflow>
      <DotRow>
        <span>
          This is completed.
          <br />
          It has multiple lines, but
          <br />
          the dash should not extend
          <br />
          to the top.
        </span>
      </DotRow>
      <DotRow>
        <div>Completed 2</div>
        <div>There is some</div>
        <div>more stuff in here.</div>
      </DotRow>
      <DotRow active>
        <span>Active</span>
      </DotRow>
      <DotRow active>
        <span>Also Active</span>
      </DotRow>
      <DotRow>
        <span>
          This is pending.
          <br />
          It has multiple lines, but
          <br />
          the dash should not extend
          <br />
          to the bottom.
        </span>
        <div>Here is some more stuff.</div>
      </DotRow>
    </Panel>

    <Panel noOverflow>
      <DotRow>
        <span>Some stuff.</span>
      </DotRow>
      <DotRow active>
        <div className="dot-row-specific">
          <div>This line will not have the dot aligned to it.</div>
          <div className="dot-row-aligner">This line will have the dot aligned to it.</div>
          <div>This is some more content.</div>
        </div>
      </DotRow>
      <DotRow>
        <div>Some stuff.</div>
        <div style={{ position: 'relative' }}>
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              top: 20,
              left: -20,
              width: 300,
              height: 100,
              zIndex: 100,
              background: 'red',
              position: 'absolute',
              border: '1px solid black',
            }}
          >
            This is absolutely positioned but does not care about overflow. You should be able to
            see to it to the bottom of the panel.
          </div>
        </div>
      </DotRow>
    </Panel>
  </div>
));
