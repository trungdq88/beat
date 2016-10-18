const BEAT_PER_MINUTE = 130;
const BEATS = 4;
const BEEPS_PER_BEAT = BEATS * 2;
const KEY = 'Giang_score';

const INTERVAL = (60 / BEAT_PER_MINUTE / (BEEPS_PER_BEAT / BEATS)) * 1000;

const $ = document.querySelector.bind(document);

let isRunning = false;
let timer = 0;
let score = +localStorage[KEY] || 0;
let _beep = 0;
let _beat = 0;

const runner = () => {
  increaseBeep();
};

function increaseBeep() {
  _beep++;
  console.log('beep -', _beep);
  if (_beep >= BEEPS_PER_BEAT / BEATS) {
    _beep = 0;
  }
  if (_beep === 1) {
    increaseBeat();
  }
}

function increaseBeat() {
  _beat++;
  console.log('beat ----------', _beat);
  clearOn();
  $(`#light${_beat}`).classList.add('on');
  if (_beat >= BEATS) {
    _beat = 0;
  }
  if (_beat === 1) {
    increaseScore();
  }
}

function clearOn() {
  $('#light1').classList.remove('on');
  $('#light2').classList.remove('on');
  $('#light3').classList.remove('on');
  $('#light4').classList.remove('on');
}

function toggle() {
  isRunning = !isRunning;
  if (isRunning) {
    _beep = 0;
    _beat = 0;
    runner();
    $(`#light1`).classList.add('on');
    timer = setInterval(runner, INTERVAL);
    $('#start-btn').innerText = 'Stop ◼';
  } else {
    clearTimeout(timer);
    clearOn();
    $('#start-btn').innerText = 'Start ►';
  }
}

function increaseScore() {
  score += 1;
  localStorage[KEY] = score;
  $('#score').innerText = score;
}

$('#score').innerText = score;
