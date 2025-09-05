const fetch = require('node-fetch');
const base64Regex = /^[A-Za-z0-9+/=]+$/;

async function main() {
  // 获取今天的日期
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const baseUrl = `https://node.freeclashnode.com/uploads/${year}/${month}/`;
  const files = [
    ...[0, 1, 2, 3, 4].map(i => `${baseUrl}${i}-${year}${month}${day}.txt`),
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/yudou66.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/blues.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/clashmeta.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/ndnode.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/nodev2ray.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/nodefree.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/v2rayshare.txt',
    'https://raw.githubusercontent.com/Barabama/FreeNodes/main/nodes/wenode.txt'
  ];

  let decodedContents = [];

  for (const url of files) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const content = await response.text();

      // 检查是否为base64
      if (base64Regex.test(content.trim())) {
        try {
          const decoded = Buffer.from(content, 'base64').toString('utf-8');
          // console.log(`解码后内容(${url}):\n${decoded}\n`);
          decodedContents.push(decoded);
        } catch (e) {
          decodedContents.push('');
        }
      } else {
        decodedContents.push(content);
      }
    } catch (e) {
      decodedContents.push('');
    }
  }

  // 拼接全部5个文件内容
  const allContent = decodedContents.join('\n');
  // 转为base64编码
  const base64Output = Buffer.from(allContent, 'utf-8').toString('base64');
  require('fs').writeFileSync('output.txt', base64Output);
}

main().catch(e => {});