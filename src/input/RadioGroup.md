```jsx
import { useState } from 'react';
import { WuiThemeProvider } from '../theme';

const prompts = ['Prompt 1', 'Prompt 2'];

const defaultAnswers = new Array(prompts.length).fill(false);

const RadioGroupTest = () => {
  const [answers, setAnswers] = useState(defaultAnswers);

  const handleOnChange = index => value => {
    const updatedAnswers = Array.from(answers);
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return prompts.map((prompt, index) => (
    <React.Fragment key={prompt}>
      <RadioGroup label={prompt} value={answers[index]} onChange={handleOnChange(index)} />
    </React.Fragment>
  ));
};

<WuiThemeProvider>
  <RadioGroupTest />
</WuiThemeProvider>;
```
