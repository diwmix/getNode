const https = require('https');
const fs = require('fs');

const fileUrl = 'https://raw.githubusercontent.com/4nth0nyl1MHC/UK-Scanning-Directory-2019/77136ccadea675af2345a40a0287f93ebe40e51f/UK%20Scanning%20Directory%20-%20January%202019/Various%20Misc%20Files/UK%20Airports%202019%20(VHF%20%26%20UHF)/London%20Swanwick%20Control%202017.txt';
const fileName = 'file.txt';

https.get(fileUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Помилка завантаження файлу: ${res.statusMessage}`);
    return;
  }

  const file = fs.createWriteStream(fileName);
  res.pipe(file);

  file.on('finish', () => {
    console.log(`Файл успішно збережено як ${fileName}`);

    // Підраховуємо кількість рядків у файлі
    fs.readFile(fileName, 'utf8', (error, data) => {
      if (error) {
        console.error(`Помилка читання файлу: ${error.message}`);
        return;
      }

      const lines = data.split('\n').length;
      console.log(`Кількість рядків у файлі: ${lines}`);
    });
  });
}).on('error', (error) => {
  console.error(`Помилка завантаження файлу: ${error.message}`);
});
