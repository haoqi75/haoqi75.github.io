// scripts/fetch-data.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'haoqi75';
const DATA_DIR = path.resolve(__dirname, '../src/data');
const USER_FILE = path.join(DATA_DIR, 'user.json');

// 确保 data 目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 颜色输出（可选，使终端更易读）
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function fetchUserData() {
  log('🚀 开始获取 GitHub 用户数据...', 'blue');
  log(`📌 用户名: ${GITHUB_USERNAME}`, 'yellow');

  try {
    log('⏳ 正在请求 GitHub API...', 'yellow');
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

    if (!userRes.ok) {
      if (userRes.status === 403) {
        throw new Error('API 速率限制已超出，请稍后重试或设置 token');
      } else if (userRes.status === 404) {
        throw new Error(`用户 "${GITHUB_USERNAME}" 不存在`);
      } else {
        throw new Error(`HTTP 错误 ${userRes.status}: ${userRes.statusText}`);
      }
    }

    const user = await userRes.json();
    log('✅ 成功获取用户数据', 'green');

    // 写入文件
    log(`💾 写入文件: ${USER_FILE}`, 'yellow');
    fs.writeFileSync(USER_FILE, JSON.stringify(user, null, 2), 'utf-8');
    log('✅ 用户数据已保存', 'green');

    // 输出关键信息
    log(`📊 用户名: ${user.login}`, 'blue');
    log(`📊 姓名: ${user.name || '无'}`, 'blue');
    log(`📊 公开仓库数: ${user.public_repos}`, 'blue');
    log(`📊 粉丝数: ${user.followers}`, 'blue');
    log(`📊 关注数: ${user.following}`, 'blue');

    log(`⏰ 数据最后更新: ${new Date().toLocaleString()}`, 'yellow');
    log('🎉 数据获取完成！', 'green');

  } catch (error) {
    log(`❌ 错误: ${error.message}`, 'red');
    process.exit(1); // 构建失败
  }
}

fetchUserData();