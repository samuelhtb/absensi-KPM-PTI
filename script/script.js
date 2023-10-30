const startButton = document.getElementById('startButton');
const output = document.getElementById('output');

startButton.addEventListener('click', async () => {
  try {
    const reader = new NDEFReader();
    await reader.scan();
    reader.onreading = event => {
      output.innerHTML = '';
      for (const record of event.message.records) {
        if (record.recordType === 'url') {
          const url = new TextDecoder().decode(record.data);
          const a = document.createElement('a');
          a.href = url;
          a.textContent = url;
          a.target = '_blank'; // Opens the URL in a new tab
          output.appendChild(a);
        } else {
          const p = document.createElement('p');
          p.textContent = record.recordType + ": " + new TextDecoder().decode(record.data);
          output.appendChild(p);
        }
      }
    };
  } catch (error) {
    console.error('Error accessing NFC: ', error);
    output.textContent = 'Error accessing NFC: ' + error;
  }
});
