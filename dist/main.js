'use strict';

var BEAT_PER_MINUTE = 80;
var BEATS = 4;
var BEEPS_PER_BEAT = BEATS * 2;
var KEY = 'Giang_score';

var audioBeep = new Audio('sounds/beep.wav');
var audioBeat = new Audio('sounds/beat.wav');

var INTERVAL = 60 / BEAT_PER_MINUTE / (BEEPS_PER_BEAT / BEATS) * 1000;

var $ = document.querySelector.bind(document);

var isRunning = false;
var timer = 0;
var score = +localStorage[KEY] || 0;
var _beep = 0;
var _beat = 0;

var runner = function runner() {
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
  audioBeep.play();
}

function increaseBeat() {
  _beat++;
  console.log('beat ----------', _beat);
  clearOn();
  $('#light' + _beat).classList.add('on');
  if (_beat >= BEATS) {
    _beat = 0;
  }
  if (_beat === 1) {
    increaseScore();
    audioBeat.play();
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
    $('#light1').classList.add('on');
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