const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/chat-gpt-endpoint', async (req, res) => {
  const inputText = req.body.text;
  const theme = req.body.theme || "default";  // テーマが指定されていない場合は"default"を使用
  const prompt = `入力テキストを${theme}に沿ってタスク化し、リスト表示してください: ${inputText}`;

  try {
    const gptResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 200, // 適宜調整してください
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`, // あなたのOpenAIキーに置き換えてください
      },
    });

    res.send(gptResponse.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
