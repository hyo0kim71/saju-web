/* 사주 운세 웹앱 — saju-fortune 패키지 + 쉬운 풀이 엔진 */
(function () {
  "use strict";

  const CATEGORY = {
    career: { label: "사업운", icon: "💼" },
    love: { label: "연애운", icon: "💕" },
    wealth: { label: "재물운", icon: "💰" }
  };

  const PERIOD = {
    daily: { label: "매일 운세", suggest: "오늘" },
    month: { label: "월간 운세", suggest: "이번 달" },
    year: { label: "한해 운세", suggest: "올해" }
  };

  /* 오행을 누구나 아는 말로 풀이 */
  const ELEMENT_INFO = {
    wood:  { ko: "목", emoji: "🌱", name: "나무", desc: "새로운 시작과 성장의 기운",      trait: "도전하고 시작하는 힘",   habit: "식물 키우기·새로운 취미 시작·아침 산책" },
    fire:  { ko: "화", emoji: "🔥", name: "불",   desc: "열정과 활력의 기운",            trait: "표현하고 끌어가는 힘",   habit: "따뜻한 식사·운동으로 몸에 활력·사람과의 대화" },
    earth: { ko: "토", emoji: "⛰️", name: "흙",   desc: "안정과 신뢰의 기운",            trait: "묵묵히 기반을 다지는 힘", habit: "규칙적인 생활·집 정리·자연 속에서 시간 보내기" },
    metal: { ko: "금", emoji: "⚔️", name: "쇠",   desc: "판단과 원칙의 기운",            trait: "결정하고 정리하는 힘",   habit: "물건 정리정돈·계획표 쓰기·결정 연습" },
    water: { ko: "수", emoji: "🌊", name: "물",   desc: "지혜와 유연함의 기운",          trait: "상황에 맞게 흐르는 힘",  habit: "충분한 수분·책 읽기·감정 일기 쓰기" }
  };

  const ELEMENT_COLORS = {
    wood: "#52b788",
    fire: "#f72585",
    earth: "#f2c14e",
    metal: "#c0c5d9",
    water: "#4cc9f0"
  };

  const $ = (sel) => document.querySelector(sel);

  const inputCard = $("#inputCard");
  const resultCard = $("#resultCard");
  const errorMsg = $("#errorMsg");

  function todayLabel() {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }

  function readForm() {
    const birthDate = $("#birthDate").value;
    const birthTime = $("#birthTime").value || undefined;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const category = document.querySelector('input[name="category"]:checked').value;
    const period = document.querySelector('input[name="period"]:checked').value;
    return { birthDate, birthTime, gender, category, period };
  }

  function analyze(input) {
    const now = new Date();
    const options = { analysisType: "fortune", fortuneType: input.category };

    if (input.period === "year") {
      options.targetYear = now.getFullYear();
    }

    const result = SajuFortune.analyzeSaju(
      {
        birthDate: input.birthDate,
        birthTime: input.birthTime,
        calendar: "solar",
        gender: input.gender
      },
      options
    );

    return { result, input };
  }

  /* ---------- 쉬운 풀이 엔진 ---------- */

  function buildPersonalityText(result) {
    const dm = result.dayMaster;
    const dmInfo = ELEMENT_INFO[dm.element];
    const strong = result.dominantElements;
    const weak = result.weakElements;

    const strongKo = strong.map((e) => `${ELEMENT_INFO[e].emoji} ${ELEMENT_INFO[e].name}(${ELEMENT_INFO[e].ko})`).join(" · ");
    const weakKo = weak.map((e) => `${ELEMENT_INFO[e].emoji} ${ELEMENT_INFO[e].name}(${ELEMENT_INFO[e].ko})`).join(" · ");

    let out = `사주를 한 문장으로 정리하면 <b>${dmInfo.emoji} ${dmInfo.name}(${dmInfo.ko})</b> 같은 성향이 중심이에요. ${dmInfo.desc}을 타고난 편이죠.`;
    out += ` 사주에 가장 많이 담긴 기운은 <b>${strongKo}</b>예요. ${strong.map((e) => ELEMENT_INFO[e].trait).join("과 ")}이 몸에 배어 있어서, ${strong.map((e) => ELEMENT_INFO[e].desc).join("과 ")}을 살리면 일이 잘 풀려요.`;
    out += ` 반대로 <b>${weakKo}</b> 기운은 상대적으로 적어요. ${weak.map((e) => ELEMENT_INFO[e].trait).join("과 ")}이 부족할 수 있으니, ${weak.map((e) => ELEMENT_INFO[e].desc).join("과 ")}을 일상에 조금씩 더해보면 균형이 맞아요.`;
    return out;
  }

  function buildFortunePlain(result, input) {
    const strong = result.dominantElements;
    const weak = result.weakElements;
    const dm = result.dayMaster;
    const dmInfo = ELEMENT_INFO[dm.element];
    const strongName = strong.map((e) => ELEMENT_INFO[e].name).join("과 ");
    const weakName = weak.map((e) => ELEMENT_INFO[e].name).join("과 ");

    const map = {
      career: {
        head: `사업운을 쉽게 말하면, <b>${dmInfo.name}(${dmInfo.ko})처럼 중심을 잡고 ${strongName} 기운을 일의 성과로 바꾸는 시기</b>예요.`,
        body: `강한 ${strongName} 기운은 일을 밀어붙이는 추진력이 돼요. 다만 ${weakName} 기운이 부족해서, 마무리·점검·균형 잡기에는 힘이 덜 실릴 수 있어요. 작은 목표라도 빠르게 끝내는 습관이 사업운을 가장 크게 올려줍니다.`,
        focus: "작은 목표 1개를 정하고 '오늘 안에 끝내기'를 반복해보세요. 완료의 경험이 사업운을 키웁니다."
      },
      love: {
        head: `연애운을 쉽게 말하면, <b>${dmInfo.name}(${dmInfo.ko}) 성향이 매력으로 드러나는 시기</b>예요.`,
        body: `강한 ${strongName} 기운은 사람을 끌어당기는 힘이 되지만, 너무 강하면 상대를 압박할 수도 있어요. 부족한 ${weakName} 기운을 의식해서 상대의 속도에 맞춰주면 관계가 훨씬 편안해져요.`,
        focus: "표현은 선명하게, 관계의 결정은 천천히. 이것만 기억해도 연애운이 달라져요."
      },
      wealth: {
        head: `재물운을 쉽게 말하면, <b>${strongName} 기운을 돈의 규칙으로 바꾸는 시기</b>예요.`,
        body: `충동적인 큰 결정보다 반복되는 작은 규칙(저축·기록)이 재물운을 가장 잘 살려요. ${weakName} 기운이 부족한 만큼, 돈의 흐름을 눈으로 직접 확인하는 습관이 특히 필요해요.`,
        focus: "번 돈의 10%를 먼저 떼어 저축하는 규칙부터 시작해보세요. 작은 규칙이 큰 변화를 만듭니다."
      }
    };

    return map[input.category];
  }

  function buildSuggestions(result, input) {
    const periodKo = PERIOD[input.period].suggest;
    const list = [];
    const strong = result.dominantElements[0];
    const weak = result.weakElements[0];

    if (input.category === "career") {
      list.push({ icon: "🎯", text: `${periodKo} 가장 중요한 일 1개를 골라 끝까지 마무리해보세요. 완료가 최고의 동기부여예요.` });
      list.push({ icon: "🤝", text: "협업하는 사람과의 소통을 주 1회 이상 짧게라도 유지하세요." });
      list.push({ icon: "📚", text: "배워두고 싶은 기술이나 업무가 있다면 지금 시작하세요. 이 시기가 성장의 타이밍이에요." });
      list.push({ icon: "📝", text: "내가 한 일을 기록하고 주 단위로 돌아보세요. 기록이 다음 기회를 만들어줍니다." });
    } else if (input.category === "love") {
      list.push({ icon: "💌", text: "호감 표현은 선명하게, 관계 결정은 천천히 하세요." });
      list.push({ icon: "👂", text: "상대의 이야기를 끝까지 들어주는 시간을 가져보세요. 듣는 것이 가장 큰 애정 표현이에요." });
      list.push({ icon: "🍀", text: "새로운 사람을 만날 기회(모임·약속·취미)에 적극 참여해보세요." });
      list.push({ icon: "☕", text: "가까운 관계에는 작은 감사 표현이 가장 효과적이에요. 오늘 한마디 건네보세요." });
    } else {
      list.push({ icon: "🏦", text: `매달 자동이체로 저축을 시작해보세요. 금액보다 '꾸준함'이 중요해요.` });
      list.push({ icon: "🧾", text: `${periodKo} 지출을 기록해서 한눈에 파악해보세요. 보이면 줄일 수 있어요.` });
      list.push({ icon: "⏳", text: "큰 결제나 투자는 하루 이틀 숙고한 뒤 결정하세요. 충동이 가장 큰 손실의 원인이에요." });
      list.push({ icon: "💡", text: "수입이 들어오면 그중 10%를 먼저 떼어두는 습관을 만드세요." });
    }

    // 오행 기반 실천 (강한 기운 살리기 + 부족한 기운 채우기)
    list.push({
      icon: ELEMENT_INFO[strong].emoji,
      text: `강한 <b>${ELEMENT_INFO[strong].name}(${ELEMENT_INFO[strong].ko})</b> 기운은 ${ELEMENT_INFO[strong].trait}이에요. ${ELEMENT_INFO[strong].desc}을 살리는 행동을 더해보세요.`
    });
    list.push({
      icon: ELEMENT_INFO[weak].emoji,
      text: `부족한 <b>${ELEMENT_INFO[weak].name}(${ELEMENT_INFO[weak].ko})</b> 기운은 ${ELEMENT_INFO[weak].trait}이에요. <b>${ELEMENT_INFO[weak].habit}</b> 같은 습관으로 채워보세요.`
    });

    return list;
  }

  /* ---------- 렌더링 ---------- */

  function renderResult({ result, input }) {
    const now = new Date();
    const periodContext = {
      daily: `${todayLabel()} 기준 오늘의 운세`,
      month: `${now.getFullYear()}년 ${now.getMonth() + 1}월 월간 운세`,
      year: `${now.getFullYear()}년 한해 운세`
    }[input.period];

    $("#resultKicker").textContent = `${CATEGORY[input.category].label} · ${PERIOD[input.period].label}`;
    $("#resultTitle").textContent = `${CATEGORY[input.category].icon} ${CATEGORY[input.category].label}`;
    $("#resultPeriod").textContent = periodContext;

    renderPillars(result.pillars);

    // 1) 쉬운 사주 설명
    $("#plainPersonality").innerHTML = buildPersonalityText(result);
    const plainNote = $("#plainNote");
    if (result.timeAccuracy === "unknown") {
      plainNote.hidden = false;
      plainNote.textContent = "※ 태어난 시간을 몰라서 시주(時柱) 없이 연·월·일만 보고 풀이했어요. 시간을 알면 더 정확해져요.";
    } else {
      plainNote.hidden = true;
    }

    // 2) 쉬운 운세 풀이
    const plain = buildFortunePlain(result, input);
    $("#readingTitle").textContent = `${CATEGORY[input.category].label} · 쉽게 풀이`;
    $("#readingPlainHead").innerHTML = plain.head;
    $("#readingPlainBody").innerHTML = plain.body;
    $("#focusText").innerHTML = plain.focus;

    // 3) 실천 제안
    $("#suggestTitle").textContent = PERIOD[input.period].suggest;
    const suggestions = buildSuggestions(result, input);
    const listWrap = $("#suggestionList");
    listWrap.innerHTML = "";
    suggestions.forEach((item) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.innerHTML = `<span class="suggestion-icon">${item.icon}</span><span class="suggestion-text">${item.text}</span>`;
      listWrap.appendChild(div);
    });

    // 4) 자세한 데이터 (접힌 상태)
    renderElements(result.fiveElements, result.dominantElements, result.weakElements);
    renderDayMaster(result.dayMaster, result.yongsin);
    const fortune = result.fortune || {};
    $("#technicalSummary").textContent = fortune.summary ? `${fortune.label} 원문 해석: ${fortune.summary}` : "";

    $("#readingCaveat").textContent = fortune.caveat || "사주 풀이는 재미와 자기점검용 참고 자료입니다.";

    const limits = $("#limitations");
    const limitItems = [];
    (result.limitations || []).forEach((l) => {
      if (!limitItems.includes(l)) limitItems.push(l);
    });
    if (limitItems.length) {
      limits.hidden = false;
      limits.textContent = "⚠️ " + limitItems.join(" ");
    } else {
      limits.hidden = true;
    }

    inputCard.hidden = true;
    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth" });
  }

  function renderPillars(pillars) {
    const wrap = $("#pillars");
    wrap.innerHTML = "";

    const cells = [
      { key: "year", label: "연주" },
      { key: "month", label: "월주" },
      { key: "day", label: "일주" },
      { key: "hour", label: "시주" }
    ];

    cells.forEach((cell) => {
      const p = pillars[cell.key];
      const div = document.createElement("div");
      div.className = "pillar";

      if (!p) {
        div.classList.add("pillar-missing");
        div.innerHTML = `<div class="pillar-label">${cell.label}</div><div class="pillar-hanja">—</div><div class="pillar-extra">시간 미상</div>`;
        wrap.appendChild(div);
        return;
      }

      const extraBits = [];
      if (p.branchAnimal) extraBits.push(p.branchAnimal + "띠");
      if (p.stemElementKo) extraBits.push(p.stemElementKo + "기운");

      div.innerHTML = `
        <div class="pillar-label">${cell.label}</div>
        <div class="pillar-hanja">${p.hanja}</div>
        <div class="pillar-ganzi">${p.label}</div>
        <div class="pillar-extra">${extraBits.join(" · ")}</div>
      `;
      wrap.appendChild(div);
    });
  }

  function renderElements(fiveElements, dominant, weak) {
    const wrap = $("#elements");
    wrap.innerHTML = "";

    const max = Math.max(1, ...Object.values(fiveElements));

    Object.entries(fiveElements).forEach(([element, count]) => {
      const row = document.createElement("div");
      row.className = "element-row";

      const tags = [];
      if (dominant.includes(element)) tags.push('<span class="tag tag-strong">왕</span>');
      if (weak.includes(element)) tags.push('<span class="tag tag-weak">약</span>');

      const nameKo = ELEMENT_INFO[element].ko;

      row.innerHTML = `
        <span class="element-name">${nameKo}</span>
        <div class="element-bar-wrap">
          <div class="element-bar" style="width:${(count / max) * 100}%; background:${ELEMENT_COLORS[element]}"></div>
        </div>
        <span class="element-count">${count}</span>
        <span>${tags.join("")}</span>
      `;
      wrap.appendChild(row);
    });
  }

  function renderDayMaster(dayMaster, yongsin) {
    const wrap = $("#daymaster");
    const elementKo = dayMaster.elementKo || "";
    const yinYang = dayMaster.yinYang === "yang" ? "양" : "음";
    const strengthMap = { strong: "신강(강함)", weak: "신약(약함)", balanced: "중화(균형)" };

    wrap.innerHTML = `
      <div class="daymaster-row"><span class="k">일간</span><span class="v">${dayMaster.stem} (${elementKo})</span></div>
      <div class="daymaster-row"><span class="k">음양</span><span class="v">${yinYang}</span></div>
      <div class="daymaster-row"><span class="k">강약</span><span class="v">${strengthMap[dayMaster.strength] || dayMaster.strength}</span></div>
      <div class="daymaster-row"><span class="k">용신</span><span class="v">${yongsin ? yongsin.primaryKo + " · " + yongsin.secondaryKo : "—"}</span></div>
    `;
  }

  /* ---------- 이벤트 ---------- */

  $("#analyzeBtn").addEventListener("click", () => {
    errorMsg.hidden = true;

    const input = readForm();
    if (!input.birthDate) {
      errorMsg.textContent = "양력 생일을 선택해주세요.";
      errorMsg.hidden = false;
      return;
    }

    try {
      const payload = analyze(input);
      renderResult(payload);
    } catch (err) {
      errorMsg.textContent = err && err.message ? err.message : "운세를 계산하지 못했습니다.";
      errorMsg.hidden = false;
    }
  });

  $("#backBtn").addEventListener("click", () => {
    resultCard.hidden = true;
    inputCard.hidden = false;
    inputCard.scrollIntoView({ behavior: "smooth" });
  });

  // 최대 생일 = 오늘 (미래 생일 방지)
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  $("#birthDate").setAttribute("max", todayStr);
})();
