function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }
 
  const pastelColors = ['#FFB3BA', '#FFDFBA', '#FFC107', '#BAFFC9', '#BAE1FF', '#E7BAFF'];
  
  let purchasedNumbers = [];
  let totalPrice = 0;
  
  function createNumberBall(number) {
    const span = document.createElement('span');
    span.className = 'number-ball';
    span.textContent = number;
    span.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    return span;
  }

  document.getElementById('purchase-count').addEventListener('input', (event) => {
    const count = parseInt(event.target.value) || 0;
    document.getElementById('total-price').textContent = (count * 1000).toLocaleString();
  });

  document.getElementById('purchase-btn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('purchase-count').value);
    if (!count || count <= 0) {
      alert('구매 수량을 입력하세요!');
      return;
    }
  
    purchasedNumbers = [];
    for (let i = 0; i < count; i++) {
      purchasedNumbers.push(generateLottoNumbers());
    }
  
    totalPrice = count * 1000;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
  
    const purchasedContainer = document.getElementById('purchased-numbers');
    purchasedContainer.innerHTML = '';
    purchasedNumbers.forEach((set) => {
      const line = document.createElement('div');
      set.forEach(num => {
        line.appendChild(createNumberBall(num));
      });
      purchasedContainer.appendChild(line);
    });
  
    alert(`총 ${count}장 결제 완료입니다!`);
  
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.disabled = false;
    generateBtn.classList.remove('disabled');
  
    document.querySelector('.purchased-area').style.display = 'block';

    document.querySelector('.result-area').style.display = 'block';
  });
  
  document.getElementById('generate-btn').addEventListener('click', () => {
    if (purchasedNumbers.length === 0) {
      alert('로또를 구매해주세요!');
      return;
    }

    document.querySelector('.result-area').style.display = 'block';
  
    const winningNumbers = generateLottoNumbers();
    const winningContainer = document.getElementById('winning-numbers');
    winningContainer.innerHTML = '';
    winningNumbers.forEach(num => {
      winningContainer.appendChild(createNumberBall(num));
    });
  
    let resultText = '';
    let isJackpot = false;
  
    purchasedNumbers.forEach((set, index) => {
      const matched = set.filter(num => winningNumbers.includes(num));
      if (matched.length === 6) {
        isJackpot = true;
        resultText += `${index + 1}번: ${matched.join(', ')} - 🎉 당첨! 🎉\n`;
      } else {
        resultText += `${index + 1}번: ${matched.join(', ')} (${matched.length}개 일치)\n`;
      }
    });
  
    if (isJackpot) {
      resultText += '\n 축하합니다! 당첨입니다!₍ᐢ⑅•ᴗ•⑅ᐢ₎♡';
    } else {
      resultText += '\n아쉽지만 당첨 실패입니다. 다음 기회에 ʕ⑅●᷄ᴈ●᷅⑅ʔ ';
    }
  
    document.getElementById('match-result').textContent = resultText.trim();
  });
  