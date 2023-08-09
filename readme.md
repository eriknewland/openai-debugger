# openai-debugger

Debug your client and server errors with OpenAI's API. Written in typescript, designed to be used as a dev dependency only.

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)

![openai-debugger-browser](https://github.com/eriknewland/openai-debugger/assets/114263701/ec5f3d50-c3fd-4efd-9a25-224a048d1d30)
![openai-debugger-node](https://github.com/eriknewland/openai-debugger/assets/114263701/fa2de870-aed1-4545-9308-2efe62f1b7f4)

## Installation:

```bash
npm install -D openai-debugger
```

## Methods

1. errorHandlerNode(options)

- Handles errors in Node environments

2. errorHandlerBrowser(options)

- Handles errors in Browser environment

### Options Configuration

Options object is required, though most parameters are optional. See the official [openAI API docs](https://platform.openai.com/docs/api-reference/chat) for more info

| Option            | Type              | Description                           | Default  |
| ----------------- | ----------------- | ------------------------------------- | -------- |
| apiKey            | string            | Your OpenAI API key                   | -        |
| model             | string            | Model name                            | -        |
| temperature       | number (optional) | Model temperature ranging from 0 to 2 | 0.2      |
| top_p             | number (optional) | Controls sampling                     | 1        |
| n                 | number (optional) | Number of replies                     | 1        |
| max_tokens        | number (optional) | Maximum reply length                  | Infinity |
| presence_penalty  | number (optional) | Penalize repetition. Range 0-2        | 0        |
| frequency_penalty | number (optional) | Penalize repetition. Range 0-2        | 0        |

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
