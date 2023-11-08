function redact() {
  const originalText = document.getElementById('originalText').value;
  const wordsToRedact = document.getElementById('wordsToRedact').value;
  const replacementText = document.getElementById('replacementText').value;

  fetch('/redact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalText, wordsToRedact, replacementText }),
  })
    .then(response => response.text())
    .then(redactedText => {
      document.getElementById('redactedResult').innerText = `Redacted Result: ${redactedText}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
