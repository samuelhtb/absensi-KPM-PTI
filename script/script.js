const startButton = document.getElementById('startButton');
const output = document.getElementById('output');

startButton.addEventListener('click', async () => {
  try {
    const reader = new NDEFReader();
    await reader.scan();
    reader.onreading = event => {
      output.innerHTML = '';
      for (const record of event.message.records) {
        const recordType = record.recordType;
        const textDecoder = new TextDecoder();

        let content;
        if (recordType === 'url') {
          // Handle URL record
          const url = textDecoder.decode(record.data);
          content = `<a href="${url}" target="_blank">${url}</a>`;
        } else if (recordType === 'text') {
          // Handle text record
          const text = textDecoder.decode(record.data);
          content = `<p>${text}</p>`;
        } else {
          // Handle other record types
          const rawData = textDecoder.decode(record.data);
          content = `<p>${recordType}: ${rawData}</p>`;
        }

        output.innerHTML += content;
      }
    };
  } catch (error) {
    console.error('Error accessing NFC: ', error);
    output.textContent = 'Error accessing NFC: ' + error;
  }
});
