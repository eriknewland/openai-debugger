# openai-debugger

Debug your client and server errors with OpenAI's API. Written in typescript

## Methods

1. errorHandlerNode(options)

- Handles errors in Node environments

2. errorHandlerBrowser(options)

- Handles errors in Browser environment

### Options Configuration

Options object is required, though most parameters are optional.

```typescript
interface Options {
  apiKey: string; // your openAI API key
  model: string; // model name
  temperature?: number; // model temperature ranging from 0 to 2, defaults to 0.2
  top_p?: number; // controls sampling, defaults to 1
  n?: number; // number of replies, defaults to 1
  max_tokens?: number; // maximum reply length, default Infinity
  presence_penalty?: number; // penalize repetition. defaults 0, range 0-2
  frequency_penalty?: number; // penalize repetition. defaults 0, range 0-2
}
```

### Example Usage (Node)

```javascript
import { errorHandlerNode, errorHandlerBrowser } from  ('openai-debugger')

const optionsObj = {
  apiKey: '...',
  model: 'gpt-3.5-turbo',
  temperature: 0.1,
};

errorHandlerNode(optionsObj)
```

### Example Usage (Browser)

```javascript
import { errorHandlerNode, errorHandlerBrowser } from  ('openai-debugger')

const optionsObj = {
  apiKey: '...',
  model: 'gpt-3.5-turbo',
  temperature: 0.1,
};

errorHandlerBrowser(optionsObj)
```
