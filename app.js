/* 사주 운세 웹앱 — saju-fortune 패키지 연동 */
(function () {
  "use strict";

  const CATEGORY = {
    career: { label: "사업운", icon: "💼" },
    love: { label: "연애운", icon: "💕" },
    wealth: { label: "재물운", icon: "💰" }
  };

  const PERIOD = {
    daily: { label: "매일 운세" },
    month: { label: "월간 운세" },
    year: { label: "한해 운세" }
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
    renderElements(result.fiveElements, result.dominantElements, result.weakElements);
    renderDayMaster(result.dayMaster, result.yongsin);

    const fortune = result.fortune || {};
    $("#readingTitle").textContent = `${fortune.label || CATEGORY[input.category].label} 풀이`;
    $("#readingSummary").textContent = fortune.summary || "운세 해석을 준비하지 못했습니다.";

    const guide = $("#readingGuidance");
    guide.innerHTML = "";
    (fortune.guidance || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      guide.appendChild(li);
    });

    $("#readingCaveat").textContent = fortune.caveat || "";

    const limits = $("#limitations");
    const limitItems = [];
    if (result.timeAccuracy === "unknown") limitItems.push("태어난 시간 미상 — 시주 없이 연·월·일 중심으로 해석했습니다.");
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

      const nameKo = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" }[element];

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
