let score = 300;
let hiddenClueFound = false;

function updateScore(delta) {
  score = Math.max(0, score + delta);
  document.getElementById('score').innerText = score;
}

function showClue(title, body) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalBody').innerText = body;
  document.getElementById('modal').style.display = 'flex';
  
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function interrogate(name) {
  let title = "Interrogating " + name;
  let body = "";

  if (name === 'Mittra') {
    body = '"I was studying in the common room late! Yes, I\'m left-handed and assigned to Student Kit #1 in the CS Hardware Lab, but I would never sabotage AUW servers right before our exam!"';
  } else if (name === 'Lomi') {
    body = '"I was in my dorm room cramming video lectures online. I study Computer Science and I am right-handed—I don\'t even know how to use left-handed tools!"';
  } else if (name === 'Suvodra') {
    body = '"I left the library at 2:30 AM and went straight to my dorm to sleep. I study Computer Science and I am left-handed."';
  }

  showClue(title, body);
}

let hiddenSearchCount = 0;

function searchHiddenClue() {
  const corkboard = document.getElementById('corkboard');

  if (hiddenSearchCount === 0) {
    hiddenSearchCount = 1;
    updateScore(-100);

    const newCard1 = document.createElement('div');
    newCard1.className = 'evidence-card';
    newCard1.onclick = function() {
      showClue('Dropped Screwdriver', 'A precision screwdriver found under the server rack. The ergonomic grip is custom-molded exclusively for LEFT-HANDED users!');
    };
    
    newCard1.innerHTML = `
      <div class="pin"></div>
      <h4>Dropped Screwdriver</h4>
      <small style="color:var(--accent-red)">Hidden Evidence 1</small>
    `;
    corkboard.appendChild(newCard1);

    showClue('Hidden Clue #1 Found!', 'You searched under the server rack and found a precision screwdriver with an ergonomic grip made for a left-handed person!');

  } else if (hiddenSearchCount === 1) {
    hiddenSearchCount = 2;
    updateScore(-100);

    const newCard2 = document.createElement('div');
    newCard2.className = 'evidence-card';
    newCard2.onclick = function() {
      showClue('Pink Hair Strand', 'A careful sweep near the severed server cable reveals a single bright pink hair strand caught on the metal housing clip!');
    };
    
    newCard2.innerHTML = `
      <div class="pin"></div>
      <h4>Pink Hair Strand</h4>
      <small style="color:var(--accent-red)">Hidden Evidence 2</small>
    `;
    corkboard.appendChild(newCard2);

    showClue('Hidden Clue #2 Found!', 'You swept the floor near the severed cable and found a single strand of bright pink hair trapped on the metal casing!');

  } else {
    showClue('Search Result', 'No other hidden clues were found in the AUW server room.');
  }
}

function accuse() {
  const selected = document.getElementById('accuseSelect').value;
  if (!selected) {
    alert('Please select a suspect first!');
    return;
  }

  if (selected === 'Mittra') {
    showClue('CASE SOLVED!', `Great job, Detective! Mittra (Student 1) used her CS lab training, left-handed tools, and Kit #1 hardware to cut the AUW server wire at 3:00 AM to delay exam day. Final Score: ${score} points.`);
  } else {
    updateScore(-80);
    showClue('WRONG ACCUSATION!', `Incorrect! ${selected} is right-handed and has a verified dorm alibi for 3:00 AM. You lost 200 points. Keep searching!`);
  }
}