import axios from 'axios';

interface Options {
  apiKey: string;
  model: string;
  temperature?: number;
  top_p?: number;
  n?: number;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
}

interface Response {
  choices: Choice[];
}

interface Choice {
  message: {
    content: string;
  };
}

async function getDebugHelp(error: string, options: Options): Promise<string> {
  const prompt = `I encountered the following error in my JavaScript code: "${error}". What could be the possible cause and solution?`;

  const response = await axios.post<Response>(
    'https://api.openai.com/v1/chat/completions',
    {
      model: options.model,
      messages: [
        { role: 'system', content: 'You are an expert at debugging javascript' },
        { role: 'user', content: prompt },
      ],
      temperature: options.temperature || 0.2,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${options.apiKey}`,
      },
    }
  );

  const data = response.data;
  return data.choices[0].message.content;
}

function errorHandlerNode(options: Options): void {
  if (typeof process !== 'undefined') {
    process.on('uncaughtException', async (err) => {
      console.error('Original Error: ', err);
      console.log('\x1b[33m%s\x1b[0m', 'Using OpenAI to analyze your error...');
      try {
        const help = await getDebugHelp(err.toString(), options);
        const formattedHelp = help.replace(/\n/g, '\n\t');
        console.log(`\n\x1b[32mOpenAI Debug Help:\n\t${formattedHelp}\n\x1b[0m`);
      } catch (err) {
        console.error(err);
      }
    });

    process.on('unhandledRejection', async (reason: any, promise: Promise<any>) => {
      console.error('Original Error: ', reason);
      console.log('\x1b[33m%s\x1b[0m', 'Using OpenAI to analyze your error...');
      try {
        const help = await getDebugHelp(reason.toString(), options);
        const formattedHelp = help.replace(/\n/g, '\n\t');
        console.log(`\n\x1b[32mOpenAI Debug Help:\n\t${formattedHelp}\n\x1b[0m`);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

function errorHandlerBrowser(options: Options): void {
  if (typeof window !== 'undefined') {
    window.onerror = async function (
      event: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) {
      let errorMessage: string;
      if (error) {
        errorMessage = error.toString();
      } else if (typeof event === 'string') {
        errorMessage = event;
      } else {
        errorMessage = event.toString();
      }
      console.log(errorMessage);
      console.log('Using OpenAI to analyze your error...');
      try {
        const help = await getDebugHelp(errorMessage, options);
        console.log('OpenAI Debug Help: ', help);
      } catch (err) {
        console.error(err);
      }
    };

    window.onunhandledrejection = async function (event: PromiseRejectionEvent) {
      console.log('this is event:', event);
      console.log('Using OpenAI to analyze your error...');
      try {
        const help = await getDebugHelp(event.reason, options);
        console.log('OpenAI Debug Help: ', help);
        event.preventDefault(); // Prevents default handler
      } catch (err) {
        console.error(err);
      }
    };
  }
}

export { errorHandlerNode, errorHandlerBrowser };
