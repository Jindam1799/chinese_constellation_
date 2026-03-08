/**
 * [중국어 별자리 퍼즐 - 메인 게임 엔진]
 */

let currentStageIdx = 0;

function getClearedStages() {
  const saved = localStorage.getItem('chineseConstellationProgress');
  return saved ? JSON.parse(saved) : [];
}

function saveStageClear(idx) {
  let cleared = getClearedStages();
  if (!cleared.includes(idx)) {
    cleared.push(idx);
    localStorage.setItem(
      'chineseConstellationProgress',
      JSON.stringify(cleared),
    );
  }
}

function createLobby() {
  const grid = document.getElementById('stage-grid');
  grid.innerHTML = '';
  const cleared = getClearedStages();

  for (let i = 0; i < TOTAL_STAGES; i++) {
    const btn = document.createElement('button');
    btn.className = 'stage-btn';
    if (cleared.includes(i)) {
      btn.classList.add('completed');
      btn.innerText = '✔';
    } else {
      btn.innerText = i + 1;
    }
    if (STAGES[i]) btn.onclick = () => startStage(i);
    grid.appendChild(btn);
  }
}

function showLobby() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('lobby-screen').classList.remove('hidden');
  clearAllTiles();
  createLobby();
}

function startStage(idx) {
  currentStageIdx = idx;
  document.getElementById('lobby-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  initStage(idx);
}

function clearAllTiles() {
  document.getElementById('node-container').innerHTML = '';
  document.getElementById('constellation-svg').innerHTML = '';
  document.getElementById('dock-inner').innerHTML = '';
  document.querySelectorAll('.star-tile').forEach((t) => t.remove());
}

function initStage(idx) {
  const stage = STAGES[idx];
  if (!stage) return;

  clearAllTiles();

  const titleText = stage.title
    ? `STAGE ${idx + 1}<br><span style="font-size:16px; opacity:0.8;">${stage.title}</span>`
    : `STAGE ${String(idx + 1).padStart(2, '0')}`;
  document.getElementById('stage-num').innerHTML = titleText;
  document.getElementById('victory-overlay').classList.add('hidden');

  const hasAnyStart = stage.nodes.some(
    (node) => !stage.paths.some((p) => p.to === node.id),
  );

  stage.nodes.forEach((n) => {
    const div = document.createElement('div');
    div.className = 'node';
    div.style.left = n.x + '%';
    div.style.top = n.y + '%';
    div.dataset.id = n.id;

    let isStartNode = !stage.paths.some((p) => p.to === n.id);
    if (!hasAnyStart && n.id === 'n1') isStartNode = true;

    if (n.customHint) {
      if (n.customHint.includes('A/B') || n.customHint.includes('공통')) {
        div.classList.add('start-common');
        div.innerHTML = `<span class="hint-text hint-common">${n.customHint}</span>`;
      } else if (n.customHint.includes('A')) {
        div.classList.add('start-a');
        div.innerHTML = `<span class="hint-text hint-a">${n.customHint}</span>`;
      } else if (n.customHint.includes('B')) {
        div.classList.add('start-b');
        div.innerHTML = `<span class="hint-text hint-b">${n.customHint}</span>`;
      } else {
        div.classList.add('start-b');
        div.innerHTML = `<span class="hint-text hint-b">${n.customHint}</span>`;
      }
    } else if (isStartNode) {
      div.classList.add('start-node');
      div.innerHTML = '<span class="hint-text">시작</span>';
    }

    document.getElementById('node-container').appendChild(div);
  });

  const svg = document.getElementById('constellation-svg');
  svg.innerHTML = `
        <defs>
            <marker id="arrow-default" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255, 255, 255, 0.4)" /></marker>
            <marker id="arrow-active" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676" style="filter: drop-shadow(0 0 3px #00e676);" /></marker>
            <marker id="arrow-default-a" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255, 138, 128, 0.4)" /></marker>
            <marker id="arrow-active-a" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff5252" style="filter: drop-shadow(0 0 3px #ff5252);" /></marker>
            <marker id="arrow-default-b" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255, 213, 79, 0.4)" /></marker>
            <marker id="arrow-active-b" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ffc107" style="filter: drop-shadow(0 0 3px #ffc107);" /></marker>
            <marker id="arrow-default-common" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(225, 190, 231, 0.4)" /></marker>
            <marker id="arrow-active-common" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="40" refY="5" markerWidth="14" markerHeight="14" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ba68c8" style="filter: drop-shadow(0 0 3px #ba68c8);" /></marker>
        </defs>
    `;

  stage.paths.forEach((p) => {
    const from = stage.nodes.find((n) => n.id === p.from);
    const to = stage.nodes.find((n) => n.id === p.to);
    if (from && to) {
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line',
      );
      line.setAttribute('x1', from.x + '%');
      line.setAttribute('y1', from.y + '%');
      line.setAttribute('x2', to.x + '%');
      line.setAttribute('y2', to.y + '%');
      line.setAttribute('id', `l-${p.from}-${p.to}`);
      line.setAttribute('class', p.type ? `path path-${p.type}` : 'path');
      line.dataset.type = p.type || 'default';

      let markerId = 'arrow-default';
      if (p.type === 'a') markerId = 'arrow-default-a';
      if (p.type === 'b') markerId = 'arrow-default-b';
      if (p.type === 'common') markerId = 'arrow-default-common';

      line.setAttribute('marker-end', `url(#${markerId})`);
      svg.appendChild(line);
    }
  });

  const shuffledPool = [...stage.pool].sort(() => Math.random() - 0.5);

  shuffledPool.forEach((id) => {
    const data = TILE_DATA[id];
    if (!data) return;
    const tile = document.createElement('div');
    tile.className = 'star-tile';
    tile.innerHTML = `<span class="hanzi">${data.hanzi}</span><span class="pinyin">${data.pinyin}</span>`;
    tile.dataset.id = id;
    makeDraggable(tile);
    document.getElementById('dock-inner').appendChild(tile);
  });
}

function makeDraggable(tile) {
  let offsetX, offsetY;

  function startDrag(e) {
    if (tile.classList.contains('locked')) return;
    tile.classList.add('dragging');

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    const rect = tile.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    tile.style.position = 'fixed';
    tile.style.left = rect.left + 'px';
    tile.style.top = rect.top + 'px';
    document.body.appendChild(tile);

    if (e.type.includes('touch')) {
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', endDrag);
    } else {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);
    }
  }

  function onDrag(e) {
    if (e.type.includes('touch')) e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    tile.style.left = clientX - offsetX + 'px';
    tile.style.top = clientY - offsetY + 'px';
    checkHover(tile);
  }

  function endDrag(e) {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);

    tile.classList.remove('dragging');
    if (!trySnap(tile)) {
      tile.style.position = 'static';
      tile.style.transform = 'none';
      document.getElementById('dock-inner').appendChild(tile);
    }
  }

  tile.addEventListener('mousedown', startDrag);
  tile.addEventListener('touchstart', startDrag, { passive: false });
  tile.ondragstart = () => false;
}

function checkHover(tile) {
  const tRect = tile.getBoundingClientRect();
  const tx = tRect.left + tRect.width / 2;
  const ty = tRect.top + tRect.height / 2;
  document.querySelectorAll('.node').forEach((node) => {
    const nRect = node.getBoundingClientRect();
    const dist = Math.hypot(
      tx - (nRect.left + nRect.width / 2),
      ty - (nRect.top + nRect.height / 2),
    );

    // [패치] 호버 인식 범위 증가 (75)
    if (dist < 75 && !node.classList.contains('filled'))
      node.classList.add('highlight');
    else node.classList.remove('highlight');
  });
}

function trySnap(tile) {
  const tRect = tile.getBoundingClientRect();
  const tx = tRect.left + tRect.width / 2;
  const ty = tRect.top + tRect.height / 2;
  let snapped = false;

  document.querySelectorAll('.node').forEach((node) => {
    if (snapped || node.classList.contains('filled')) return;
    const nRect = node.getBoundingClientRect();
    const dist = Math.hypot(
      tx - (nRect.left + nRect.width / 2),
      ty - (nRect.top + nRect.height / 2),
    );

    // [패치] 스냅(자석) 범위 대폭 증가 (65)
    if (dist < 65) {
      const stage = STAGES[currentStageIdx];
      const nodeData = stage.nodes.find((n) => n.id === node.dataset.id);

      // [패치] 시스템 방어 코드: 단어가 누락되어 있어도 게임이 튕기지 않음
      const expectedData = TILE_DATA[nodeData.expect];
      const tileData = TILE_DATA[tile.dataset.id];

      if (expectedData && tileData && expectedData.hanzi === tileData.hanzi) {
        node.classList.remove('highlight');
        node.classList.add('filled');
        tile.classList.add('locked');
        tile.style.left = nRect.left + nRect.width / 2 + 'px';
        tile.style.top = nRect.top + nRect.height / 2 + 'px';
        tile.style.transform = 'translate(-50%, -50%)';
        snapped = true;
        updatePaths();
        checkVictory();
      }
    }
  });
  return snapped;
}

function updatePaths() {
  STAGES[currentStageIdx].paths.forEach((p) => {
    const fromNode = document.querySelector(`.node[data-id="${p.from}"]`);
    const toNode = document.querySelector(`.node[data-id="${p.to}"]`);
    if (
      fromNode &&
      toNode &&
      fromNode.classList.contains('filled') &&
      toNode.classList.contains('filled')
    ) {
      const line = document.getElementById(`l-${p.from}-${p.to}`);
      if (line) {
        line.classList.add('active');

        let markerId = 'arrow-active';
        if (line.dataset.type === 'a') markerId = 'arrow-active-a';
        if (line.dataset.type === 'b') markerId = 'arrow-active-b';
        if (line.dataset.type === 'common') markerId = 'arrow-active-common';

        line.setAttribute('marker-end', `url(#${markerId})`);
      }
    }
  });
}

function checkVictory() {
  const total = STAGES[currentStageIdx].nodes.length;
  const filled = document.querySelectorAll('.node.filled').length;
  if (total === filled) {
    saveStageClear(currentStageIdx);

    const stage = STAGES[currentStageIdx];
    const answerDiv = document.getElementById('victory-answer');
    if (answerDiv) {
      answerDiv.innerHTML = stage.answer || '완성된 문장입니다!';
    }

    setTimeout(
      () =>
        document.getElementById('victory-overlay').classList.remove('hidden'),
      500,
    );
  }
}

function loadNextStage() {
  if (currentStageIdx < STAGES.length - 1) {
    currentStageIdx++;
    initStage(currentStageIdx);
  } else {
    alert('위대한 여정의 끝! 30개의 별자리를 모두 완성하셨습니다!');
    showLobby();
  }
}

window.onload = () => createLobby();
