import readline from 'readline';
import lodash from 'lodash';

const MAX = 100;

async function main() {
  const secretNumber = lodash.random(MAX);
  // console.log(`The secret number is ${secretNumber}`);

  while (true) {
    try {
      const guess = parseIntSafe(await question(`Guess a number 0 <= n < ${MAX}`));
      if (guess < secretNumber) {
        console.log('Too small.');
      } else if (guess > secretNumber) {
        console.log('Too big.');
      } else {
        console.log('You win!');
        break;
      }
    } catch (e) {
      console.error(e.message || e);
      continue;
    }
  }
}

main().catch(console.error);

async function question(message) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`${message} \n`, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

function parseIntSafe(str) {
  const num = parseInt(str);
  if (typeof num === 'number' && !isNaN(num)) {
    return num;
  } else {
    throw new Error(`"${str}" is not a number.`);
  }
}
