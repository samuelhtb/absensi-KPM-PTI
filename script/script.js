const startButton = document.getElementById('startButton');
const output = document.getElementById('output');

startButton.addEventListener('click', async () => {
  try {
    const reader = new NDEFReader();
    await reader.scan();
    reader.onreading = event => {
      output.textContent = '';
      for (const record of event.message.records) {
        output.textContent += record.recordType + ": " + record.data + "\n";
      }
    };
  } catch (error) {
    console.error('Error accessing NFC: ', error);
    output.textContent = 'Error accessing NFC: ' + error;
  }
});
