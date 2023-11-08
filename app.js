const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/redact', (req, res) => {
  console.log('Request received:', req.body);
  const { originalText, wordsToRedact, replacementText } = req.body;
  const redactedText = redactText(originalText, wordsToRedact, replacementText);
  console.log('Redacted Text:', redactedText);
  res.send(redactedText);
});

function redactText(text, wordsToRedact, replacementText) {
  wordsToRedact.split(' ').forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    text = text.replace(regex, replacementText);
  });

  return text;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
