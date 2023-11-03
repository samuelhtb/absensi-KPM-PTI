const startButton = document.getElementById('startButton');
const output = document.getElementById('output');

startButton.addEventListener('click', async () => {
  try {
    const reader = new NDEFReader();
    await reader.scan();
    reader.onreading = event => {
      const currentTime = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
      const formattedTime = currentTime.toLocaleDateString(undefined, options);
      
      output.innerHTML = `<p>Waktu Pembacaan NFC: ${formattedTime}</p>`;
      
      for (const record of event.message.records) {
        const recordType = record.recordType;
        const textDecoder = new TextDecoder();

        let content;
        if (recordType === 'url') {
          // Handle URL record
          const url = textDecoder.decode(record.data);
          content = `<p><strong>URL:</strong> <a href="${url}" target="_blank">${url}</a></p>`;
        } else if (recordType === 'text') {
          // Handle text record
          const text = textDecoder.decode(record.data);
          content = `<p><strong>Text:</strong> ${text}</p>`;
        } else {
          // Handle other record types
          const rawData = textDecoder.decode(record.data);
          content = `<p><strong>${recordType}:</strong> ${rawData}</p>`;
        }

        output.innerHTML += content;
      }
    };
  } catch (error) {
    console.error('Error accessing NFC: ', error);
    output.textContent = 'Error accessing NFC: ' + error;
  }
});
