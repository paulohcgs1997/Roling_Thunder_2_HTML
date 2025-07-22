const fs = require('fs');
const path = require('path');

const pastaImagens = './imagens';
const saida = './saida.js';

const formatosAceitos = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];

// Lê todos os arquivos da pasta
let arquivos = fs.readdirSync(pastaImagens);

// Filtra apenas os arquivos de imagem
arquivos = arquivos.filter(arquivo => {
  const ext = path.extname(arquivo).toLowerCase();
  return formatosAceitos.includes(ext);
});

// Ordena numericamente com base nos números nos nomes dos arquivos
arquivos.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
  const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
  return numA - numB;
});

let output = '';
let index = 0;

for (const arquivo of arquivos) {
  const caminhoImagem = path.join(pastaImagens, arquivo);
  const buffer = fs.readFileSync(caminhoImagem);
  const base64 = buffer.toString('base64');

  output += `/*${arquivo}*/ 0x${index.toString(16).padStart(2, '0')}: "${base64}",\n`;
  index++;
}

fs.writeFileSync(saida, output);
console.log(`✅ Conversão concluída! Arquivo gerado: ${saida}`);
