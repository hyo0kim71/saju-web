var SajuFortune = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // ../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/constants.js
  var require_constants = __commonJS({
    "../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/constants.js"(exports, module) {
      var STEMS = [
        { korean: "\uAC11", hanja: "\u7532", element: "wood", elementKo: "\uBAA9", yinYang: "yang" },
        { korean: "\uC744", hanja: "\u4E59", element: "wood", elementKo: "\uBAA9", yinYang: "yin" },
        { korean: "\uBCD1", hanja: "\u4E19", element: "fire", elementKo: "\uD654", yinYang: "yang" },
        { korean: "\uC815", hanja: "\u4E01", element: "fire", elementKo: "\uD654", yinYang: "yin" },
        { korean: "\uBB34", hanja: "\u620A", element: "earth", elementKo: "\uD1A0", yinYang: "yang" },
        { korean: "\uAE30", hanja: "\u5DF1", element: "earth", elementKo: "\uD1A0", yinYang: "yin" },
        { korean: "\uACBD", hanja: "\u5E9A", element: "metal", elementKo: "\uAE08", yinYang: "yang" },
        { korean: "\uC2E0", hanja: "\u8F9B", element: "metal", elementKo: "\uAE08", yinYang: "yin" },
        { korean: "\uC784", hanja: "\u58EC", element: "water", elementKo: "\uC218", yinYang: "yang" },
        { korean: "\uACC4", hanja: "\u7678", element: "water", elementKo: "\uC218", yinYang: "yin" }
      ];
      var BRANCHES = [
        { korean: "\uC790", hanja: "\u5B50", animal: "\uC950", element: "water", elementKo: "\uC218", yinYang: "yang", hourLabel: "23:00-01:00" },
        { korean: "\uCD95", hanja: "\u4E11", animal: "\uC18C", element: "earth", elementKo: "\uD1A0", yinYang: "yin", hourLabel: "01:00-03:00" },
        { korean: "\uC778", hanja: "\u5BC5", animal: "\uD638\uB791\uC774", element: "wood", elementKo: "\uBAA9", yinYang: "yang", hourLabel: "03:00-05:00" },
        { korean: "\uBB18", hanja: "\u536F", animal: "\uD1A0\uB07C", element: "wood", elementKo: "\uBAA9", yinYang: "yin", hourLabel: "05:00-07:00" },
        { korean: "\uC9C4", hanja: "\u8FB0", animal: "\uC6A9", element: "earth", elementKo: "\uD1A0", yinYang: "yang", hourLabel: "07:00-09:00" },
        { korean: "\uC0AC", hanja: "\u5DF3", animal: "\uBC40", element: "fire", elementKo: "\uD654", yinYang: "yin", hourLabel: "09:00-11:00" },
        { korean: "\uC624", hanja: "\u5348", animal: "\uB9D0", element: "fire", elementKo: "\uD654", yinYang: "yang", hourLabel: "11:00-13:00" },
        { korean: "\uBBF8", hanja: "\u672A", animal: "\uC591", element: "earth", elementKo: "\uD1A0", yinYang: "yin", hourLabel: "13:00-15:00" },
        { korean: "\uC2E0", hanja: "\u7533", animal: "\uC6D0\uC22D\uC774", element: "metal", elementKo: "\uAE08", yinYang: "yang", hourLabel: "15:00-17:00" },
        { korean: "\uC720", hanja: "\u9149", animal: "\uB2ED", element: "metal", elementKo: "\uAE08", yinYang: "yin", hourLabel: "17:00-19:00" },
        { korean: "\uC220", hanja: "\u620C", animal: "\uAC1C", element: "earth", elementKo: "\uD1A0", yinYang: "yang", hourLabel: "19:00-21:00" },
        { korean: "\uD574", hanja: "\u4EA5", animal: "\uB3FC\uC9C0", element: "water", elementKo: "\uC218", yinYang: "yin", hourLabel: "21:00-23:00" }
      ];
      var REQUIRED_INTERVIEW_FIELDS = ["birthDate", "birthTime", "gender"];
      var ANALYSIS_TYPES = /* @__PURE__ */ new Set(["basic", "fortune", "yongsin", "school_compare", "yongsin_method"]);
      var FORTUNE_TYPES = /* @__PURE__ */ new Set(["general", "career", "wealth", "health", "love"]);
      var GENDERS = /* @__PURE__ */ new Set(["male", "female"]);
      var CALENDARS = /* @__PURE__ */ new Set(["solar", "lunar"]);
      var UNSUPPORTED_LUNAR_CONVERSION_MESSAGE = "lunar calendar conversion is not supported without a verified manse calendar table. Enter a solar/Gregorian birthDate or convert the lunar date before analysis.";
      var ELEMENT_KO = {
        wood: "\uBAA9",
        fire: "\uD654",
        earth: "\uD1A0",
        metal: "\uAE08",
        water: "\uC218"
      };
      var ELEMENT_LABELS = {
        wood: "\uBAA9(\u6728)",
        fire: "\uD654(\u706B)",
        earth: "\uD1A0(\u571F)",
        metal: "\uAE08(\u91D1)",
        water: "\uC218(\u6C34)"
      };
      var ELEMENT_CYCLE = ["wood", "fire", "earth", "metal", "water"];
      var UNKNOWN_TIME_LIMITATION = "\uD0DC\uC5B4\uB09C \uC2DC\uAC04\uC774 \uC5C6\uC5B4 \uC2DC\uC8FC\uB294 \uD655\uC815\uD558\uC9C0 \uC54A\uACE0 \uC5F0\xB7\uC6D4\xB7\uC77C \uC911\uC2EC\uC73C\uB85C \uBCF4\uC218\uC801\uC73C\uB85C \uD574\uC11D\uD569\uB2C8\uB2E4.";
      module.exports = {
        ANALYSIS_TYPES,
        BRANCHES,
        CALENDARS,
        ELEMENT_CYCLE,
        ELEMENT_KO,
        ELEMENT_LABELS,
        FORTUNE_TYPES,
        GENDERS,
        REQUIRED_INTERVIEW_FIELDS,
        STEMS,
        UNKNOWN_TIME_LIMITATION,
        UNSUPPORTED_LUNAR_CONVERSION_MESSAGE
      };
    }
  });

  // ../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/input.js
  var require_input = __commonJS({
    "../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/input.js"(exports, module) {
      var {
        CALENDARS,
        GENDERS,
        REQUIRED_INTERVIEW_FIELDS,
        UNSUPPORTED_LUNAR_CONVERSION_MESSAGE
      } = require_constants();
      function getMissingInterviewFields(input = {}) {
        return REQUIRED_INTERVIEW_FIELDS.filter((field) => !input[field]);
      }
      function normalizeBirthInput(input) {
        if (!input || typeof input !== "object") {
          throw new Error("birth input is required.");
        }
        const birthDate = normalizeString(input.birthDate);
        const birthTime = normalizeString(input.birthTime);
        const gender = normalizeString(input.gender);
        const calendar = normalizeString(input.calendar) || "solar";
        if (!birthDate) {
          throw new Error("birthDate is required.");
        }
        if (!isValidDate(birthDate)) {
          throw new Error("birthDate must be YYYY-MM-DD.");
        }
        if (birthTime && !isValidTime(birthTime)) {
          throw new Error("birthTime must be HH:mm.");
        }
        if (!gender || !GENDERS.has(gender)) {
          throw new Error("gender must be male or female.");
        }
        if (!CALENDARS.has(calendar)) {
          throw new Error("calendar must be solar or lunar.");
        }
        return {
          name: normalizeString(input.name) || void 0,
          hanjaName: normalizeString(input.hanjaName) || void 0,
          birthDate,
          birthTime: birthTime || void 0,
          calendar,
          isLeapMonth: Boolean(input.isLeapMonth),
          gender,
          birthCity: normalizeString(input.birthCity) || void 0
        };
      }
      function convertCalendar(args) {
        const date = normalizeString(args.date);
        const fromCalendar = normalizeString(args.fromCalendar);
        const toCalendar = normalizeString(args.toCalendar);
        if (!date || !isValidDate(date)) {
          throw new Error("date must be YYYY-MM-DD.");
        }
        if (!CALENDARS.has(fromCalendar) || !CALENDARS.has(toCalendar)) {
          throw new Error("fromCalendar and toCalendar must be solar or lunar.");
        }
        if (fromCalendar === toCalendar) {
          return {
            originalDate: date,
            originalCalendar: fromCalendar,
            convertedDate: date,
            convertedCalendar: toCalendar,
            isLeapMonth: Boolean(args.isLeapMonth),
            note: "\uB3D9\uC77C\uD55C \uB2EC\uB825 \uCCB4\uACC4\uB77C \uBCC0\uD658\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
          };
        }
        throw new Error(UNSUPPORTED_LUNAR_CONVERSION_MESSAGE);
      }
      function rejectUnsupportedLunarInput(input) {
        if (input.calendar === "lunar") {
          throw new Error(UNSUPPORTED_LUNAR_CONVERSION_MESSAGE);
        }
      }
      function normalizeString(value) {
        return typeof value === "string" ? value.trim() : "";
      }
      function parseDate(value) {
        const [year, month, day] = value.split("-").map(Number);
        return { year, month, day };
      }
      function parseTime(value) {
        const [hour, minute] = value.split(":").map(Number);
        return { hour, minute };
      }
      function isValidDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return false;
        }
        const { year, month, day } = parseDate(value);
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
      }
      function isValidTime(value) {
        if (!/^\d{2}:\d{2}$/.test(value)) {
          return false;
        }
        const { hour, minute } = parseTime(value);
        return hour >= 0 && hour < 24 && minute >= 0 && minute < 60;
      }
      function todayIsoDate() {
        return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      }
      module.exports = {
        convertCalendar,
        getMissingInterviewFields,
        normalizeBirthInput,
        normalizeString,
        parseDate,
        parseTime,
        rejectUnsupportedLunarInput,
        todayIsoDate
      };
    }
  });

  // ../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/pillars.js
  var require_pillars = __commonJS({
    "../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/pillars.js"(exports, module) {
      var { BRANCHES, STEMS } = require_constants();
      function calculatePillars(dateParts, timeParts) {
        const year = calculateYearPillar(dateParts);
        const month = calculateMonthPillar(dateParts, year);
        const day = calculateDayPillar(dateParts);
        const hour = timeParts ? calculateHourPillar(timeParts, day) : null;
        return { year, month, day, hour };
      }
      function calculateYearPillar({ year, month, day }) {
        const sajuYear = month < 2 || month === 2 && day < 4 ? year - 1 : year;
        return makePillar(mod(sajuYear - 4, 10), mod(sajuYear - 4, 12));
      }
      function calculateMonthPillar({ month, day }, yearPillar) {
        const monthIndex = getSolarTermMonthIndex(month, day);
        const branchIndex = mod(monthIndex + 2, 12);
        const yearStemIndex = yearPillar.stemIndex;
        let monthStemStart;
        if (yearStemIndex === 0 || yearStemIndex === 5) {
          monthStemStart = 2;
        } else if (yearStemIndex === 1 || yearStemIndex === 6) {
          monthStemStart = 4;
        } else if (yearStemIndex === 2 || yearStemIndex === 7) {
          monthStemStart = 6;
        } else if (yearStemIndex === 3 || yearStemIndex === 8) {
          monthStemStart = 8;
        } else {
          monthStemStart = 0;
        }
        const monthOffset = branchIndex >= 2 ? branchIndex - 2 : branchIndex + 10;
        return makePillar(mod(monthStemStart + monthOffset, 10), branchIndex);
      }
      function calculateDayPillar({ year, month, day }) {
        const base = Date.UTC(1900, 0, 1, 12);
        const birth = Date.UTC(year, month - 1, day, 12);
        const diffDays = Math.round((birth - base) / 864e5);
        return makePillar(mod(diffDays, 10), mod(10 + diffDays, 12));
      }
      function calculateHourPillar({ hour }, dayPillar) {
        const branchIndex = hour >= 23 || hour < 1 ? 0 : Math.floor((hour + 1) / 2);
        const stemIndex = mod(dayPillar.stemIndex * 2 + branchIndex, 10);
        return makePillar(stemIndex, branchIndex);
      }
      function makePillar(stemIndex, branchIndex) {
        const stem = STEMS[stemIndex];
        const branch = BRANCHES[branchIndex];
        return {
          label: `${stem.korean}${branch.korean}`,
          hanja: `${stem.hanja}${branch.hanja}`,
          stem: stem.korean,
          stemHanja: stem.hanja,
          stemElement: stem.element,
          stemElementKo: stem.elementKo,
          branch: branch.korean,
          branchHanja: branch.hanja,
          branchAnimal: branch.animal,
          branchElement: branch.element,
          branchElementKo: branch.elementKo,
          yinYang: stem.yinYang,
          stemIndex,
          branchIndex
        };
      }
      function getSolarTermMonthIndex(month, day) {
        const starts = [
          [2, 4],
          [3, 6],
          [4, 5],
          [5, 6],
          [6, 6],
          [7, 7],
          [8, 8],
          [9, 8],
          [10, 8],
          [11, 7],
          [12, 7],
          [1, 6]
        ];
        const value = month * 100 + day;
        for (let index = 10; index >= 0; index -= 1) {
          const [startMonth, startDay] = starts[index];
          if (value >= startMonth * 100 + startDay) {
            return index;
          }
        }
        return 11;
      }
      function mod(value, divisor) {
        return (value % divisor + divisor) % divisor;
      }
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }
      module.exports = {
        calculatePillars,
        clamp,
        mod
      };
    }
  });

  // ../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/readings.js
  var require_readings = __commonJS({
    "../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/readings.js"(exports, module) {
      var {
        BRANCHES,
        ELEMENT_CYCLE,
        ELEMENT_KO,
        ELEMENT_LABELS,
        STEMS,
        UNKNOWN_TIME_LIMITATION
      } = require_constants();
      var { getMissingInterviewFields, normalizeString } = require_input();
      var { clamp, mod } = require_pillars();
      function countFiveElements(pillars) {
        const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        for (const pillar of Object.values(pillars)) {
          if (!pillar) {
            continue;
          }
          counts[pillar.stemElement] += 1;
          counts[pillar.branchElement] += 1;
        }
        return counts;
      }
      function getDominantElements(counts) {
        const max = Math.max(...Object.values(counts));
        return ELEMENT_CYCLE.filter((element) => counts[element] === max && max > 0);
      }
      function getWeakElements(counts) {
        const min = Math.min(...Object.values(counts));
        return ELEMENT_CYCLE.filter((element) => counts[element] === min);
      }
      function estimateDayMasterStrength(pillars, counts) {
        const dayElement = pillars.day.stemElement;
        const supporting = counts[dayElement] + counts[getGeneratingElement(dayElement)] * 0.7;
        if (supporting >= 3.5) {
          return "strong";
        }
        if (supporting <= 1.5) {
          return "weak";
        }
        return "balanced";
      }
      function selectUsefulElements(dayMaster, counts) {
        const weakElements = getWeakElements(counts);
        const controlling = getControllingElement(dayMaster.element);
        const generated = getGeneratedElement(dayMaster.element);
        const primary = dayMaster.strength === "strong" ? controlling : getGeneratingElement(dayMaster.element);
        const secondary = weakElements.includes(generated) ? generated : weakElements[0];
        return {
          primary,
          primaryKo: formatElement(primary),
          secondary,
          secondaryKo: formatElement(secondary),
          reasoning: `${dayMaster.elementKo} \uC77C\uAC04\uC758 \uAC15\uC57D\uACFC \uC624\uD589 \uBD84\uD3EC\uB97C \uD568\uAED8 \uBCF4\uC544 ${formatElement(primary)} \uAE30\uC6B4\uC744 \uC6B0\uC120 \uC870\uC728\uC810\uC73C\uB85C \uB461\uB2C8\uB2E4.`
        };
      }
      function buildFortuneReading(result, fortuneType, targetYear) {
        const dominant = result.dominantElements.map(formatElement).join(", ");
        const weak = result.weakElements.map(formatElement).join(", ");
        const topicMap = {
          general: {
            label: "\uC885\uD569\uC6B4",
            summary: `${dominant} \uAE30\uC6B4\uC774 \uAC15\uD558\uAC8C \uB4DC\uB7EC\uB098\uBBC0\uB85C \uC7A5\uC810\uC740 \uC0B4\uB9AC\uACE0 \uBD80\uC871\uD55C ${weak} \uAE30\uC6B4\uC744 \uC0DD\uD65C \uB8E8\uD2F4\uC73C\uB85C \uBCF4\uC644\uD558\uB294 \uD574\uC11D\uC774 \uC88B\uC2B5\uB2C8\uB2E4.`,
            guidance: ["\uAC15\uD55C \uAE30\uC6B4\uC774 \uACFC\uD574\uC9C0\uB294 \uC0C1\uD669\uC744 \uBA3C\uC800 \uC0B4\uD54D\uB2C8\uB2E4.", "\uBD80\uC871\uD55C \uC624\uD589\uC744 \uC0AC\uB78C\xB7\uD658\uACBD\xB7\uC2B5\uAD00\uC73C\uB85C \uBCF4\uC644\uD569\uB2C8\uB2E4."]
          },
          career: {
            label: "\uC9C1\uC5C5\uC6B4",
            summary: `${result.dayMaster.elementKo} \uC77C\uAC04\uC740 \uCC45\uC784\uC758 \uC911\uC2EC\uC744 \uC7A1\uC744 \uB54C \uC9C1\uC5C5\uC6B4\uC774 \uC548\uC815\uB429\uB2C8\uB2E4. \uAC15\uD55C ${dominant} \uAE30\uC6B4\uC744 \uC131\uACFC \uC5B8\uC5B4\uB85C \uBC14\uAFB8\uB294 \uC804\uB7B5\uC774 \uC88B\uC2B5\uB2C8\uB2E4.`,
            guidance: ["\uC5ED\uD560\uACFC \uCC45\uC784 \uBC94\uC704\uB97C \uBA85\uD655\uD788 \uC7A1\uC73C\uC138\uC694.", "\uC131\uACFC \uAE30\uB85D\uACFC \uD53C\uB4DC\uBC31 \uC8FC\uAE30\uB97C \uC9E7\uAC8C \uB450\uC138\uC694."]
          },
          wealth: {
            label: "\uC7AC\uBB3C\uC6B4",
            summary: `\uC7AC\uBB3C\uC6B4\uC740 \uAC15\uD55C ${dominant} \uAE30\uC6B4\uC744 \uD604\uAE08\uD750\uB984 \uADDC\uCE59\uC73C\uB85C \uBB36\uC744 \uB54C \uC88B\uC544\uC9D1\uB2C8\uB2E4. \uCDA9\uB3D9\uC801 \uD655\uC7A5\uBCF4\uB2E4 \uBC18\uBCF5 \uAC00\uB2A5\uD55C \uC800\uCD95\xB7\uD22C\uC790 \uC6D0\uCE59\uC774 \uD575\uC2EC\uC785\uB2C8\uB2E4.`,
            guidance: ["\uD070 \uACB0\uC815\uBCF4\uB2E4 \uBC18\uBCF5 \uAC00\uB2A5\uD55C \uC608\uC0B0 \uADDC\uCE59\uC744 \uBA3C\uC800 \uC138\uC6B0\uC138\uC694.", "\uC218\uC785\uC6D0\uACFC \uC9C0\uCD9C \uD56D\uBAA9\uC744 \uBD84\uB9AC\uD574 \uD750\uB984\uC744 \uBCF4\uC138\uC694."]
          },
          health: {
            label: "\uAC74\uAC15\uC6B4",
            summary: `\uAC74\uAC15\uC6B4\uC740 \uBD80\uC871\uD55C ${weak} \uAE30\uC6B4\uC744 \uBCF4\uC644\uD558\uB294 \uC218\uBA74, \uC2DD\uC0AC, \uC6C0\uC9C1\uC784\uC758 \uADE0\uD615\uC5D0\uC11C \uBD05\uB2C8\uB2E4. \uC0AC\uC8FC \uD574\uC11D\uC740 \uC758\uB8CC \uC9C4\uB2E8\uC744 \uB300\uC2E0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`,
            guidance: ["\uBB34\uB9AC\uD55C \uD574\uC11D\uBCF4\uB2E4 \uCEE8\uB514\uC158 \uAE30\uB85D\uC744 \uC6B0\uC120\uD558\uC138\uC694.", "\uC99D\uC0C1\uC774 \uC788\uC73C\uBA74 \uC758\uB8CC \uC804\uBB38\uAC00\uC5D0\uAC8C \uD655\uC778\uD558\uC138\uC694."]
          },
          love: {
            label: "\uC5F0\uC560\uC6B4",
            summary: `\uC5F0\uC560\uC6B4\uC740 \uAD00\uACC4\uC5D0\uC11C \uD45C\uD604\uC758 \uC18D\uB3C4\uC640 \uC548\uC815\uAC10\uC744 \uB9DE\uCD94\uB294 \uCABD\uC73C\uB85C \uD480\uC774\uD569\uB2C8\uB2E4. \uAC15\uD55C ${dominant} \uAE30\uC6B4\uC740 \uB9E4\uB825\uC774\uC9C0\uB9CC \uACFC\uD558\uBA74 \uACE0\uC9D1\uC73C\uB85C \uBCF4\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4.`,
            guidance: ["\uD638\uAC10 \uD45C\uD604\uC740 \uC120\uBA85\uD558\uAC8C, \uACB0\uB860\uC740 \uCC9C\uCC9C\uD788 \uC7A1\uC73C\uC138\uC694.", "\uC0C1\uB300\uC758 \uBC18\uC751 \uC18D\uB3C4\uB97C \uC874\uC911\uD558\uBA74 \uAD00\uACC4 \uC548\uC815\uAC10\uC774 \uCEE4\uC9D1\uB2C8\uB2E4."]
          }
        };
        const caveats = ["\uC0AC\uC8FC \uD480\uC774\uB294 \uACB0\uC815\uB860\uC774\uB098 \uBCF4\uC7A5\uC774 \uC544\uB2C8\uB77C \uC790\uAE30\uC810\uAC80\uC744 \uB3D5\uB294 \uC804\uD1B5 \uD574\uC11D\uC785\uB2C8\uB2E4."];
        if (result.timeAccuracy === "unknown") {
          caveats.push(UNKNOWN_TIME_LIMITATION);
        }
        return {
          type: fortuneType,
          label: topicMap[fortuneType].label,
          targetYear: targetYear ? Number(targetYear) : void 0,
          summary: topicMap[fortuneType].summary,
          guidance: topicMap[fortuneType].guidance,
          caveat: caveats.join(" ")
        };
      }
      function buildInterviewState(input) {
        return {
          missingFields: getMissingInterviewFields(input),
          optionalFields: ["name", "hanjaName", "calendar", "isLeapMonth", "birthCity", "topic"],
          suggestedQuestions: [
            "\uC591\uB825/\uC74C\uB825, \uC0DD\uB144\uC6D4\uC77C, \uD0DC\uC5B4\uB09C \uC2DC\uAC04\uC744 \uC54C\uB824\uC8FC\uC138\uC694.",
            "\uC131\uBCC4\uACFC \uD0DC\uC5B4\uB09C \uC2DC\uAD70\uAD6C\uB97C \uC54C\uB824\uC8FC\uBA74 \uACBD\uB3C4 \uBCF4\uC815\uC744 \uB354 \uBCF4\uC218\uC801\uC73C\uB85C \uBC18\uC601\uD560 \uC218 \uC788\uC5B4\uC694.",
            "\uC5F0\uC560\uC6B4, \uC7AC\uBB3C\uC6B4, \uC9C1\uC5C5\uC6B4, \uAC74\uAC15\uC6B4, \uD55C\uD574 \uC6B4\uC138 \uC911 \uBB34\uC5C7\uC744 \uBA3C\uC800 \uBCFC\uAE4C\uC694?"
          ]
        };
      }
      function buildReadingGuide() {
        return [
          "\uBA3C\uC800 \uC0AC\uC8FC\uD314\uC790\uC640 \uC624\uD589 \uBD84\uD3EC\uB97C \uC9E7\uAC8C \uD655\uC778\uD55C\uB2E4.",
          "\uC0AC\uC6A9\uC790\uAC00 \uACE0\uB978 \uC8FC\uC81C\uC5D0 \uB9DE\uCDB0 \uAC15\uD55C \uAE30\uC6B4\uACFC \uBD80\uC871\uD55C \uAE30\uC6B4\uC744 \uC5F0\uACB0\uD55C\uB2E4.",
          "\uB2E8\uC815 \uB300\uC2E0 \uAC00\uB2A5\uC131, \uC8FC\uC758\uC810, \uC2E4\uCC9C \uC870\uC5B8\uC744 \uAD6C\uBD84\uD574 \uB9D0\uD55C\uB2E4.",
          "\uAC74\uAC15\xB7\uD22C\uC790\xB7\uAD00\uACC4\uC758 \uC911\uB300 \uACB0\uC815\uC740 \uC804\uBB38\uAC00 \uD310\uB2E8\uC744 \uB300\uC2E0\uD558\uC9C0 \uC54A\uB294\uB2E4\uACE0 \uBC1D\uD78C\uB2E4."
        ];
      }
      function buildYongsinReading(result) {
        return `${result.yongsin.primaryKo}\uC744 \uC6B0\uC120 \uC870\uC728\uC810\uC73C\uB85C \uBCF4\uACE0, ${result.yongsin.secondaryKo}\uC744 \uBCF4\uC870 \uAE30\uC6B4\uC73C\uB85C \uC0BC\uC544 \uACFC\uD55C \uAE30\uC6B4\uC744 \uB204\uADF8\uB7EC\uB728\uB9AC\uB294 \uD750\uB984\uC785\uB2C8\uB2E4.`;
      }
      function buildSchoolComparison(result) {
        return [
          { school: "ziping", summary: `${result.dayMaster.elementKo} \uC77C\uAC04\uACFC \uC6D4\uC9C0\uB97C \uC911\uC2EC\uC73C\uB85C \uAC15\uC57D\uC744 \uBD05\uB2C8\uB2E4.` },
          { school: "modern", summary: "\uD604\uB300 \uD574\uC11D\uC5D0\uC11C\uB294 \uC131\uD5A5, \uAD00\uACC4, \uC2E4\uD589 \uC2B5\uAD00\uC73C\uB85C \uBC88\uC5ED\uD574 \uC548\uB0B4\uD569\uB2C8\uB2E4." },
          { school: "shensha", summary: "\uC2E0\uC0B4\uC740 \uBCF4\uC870 \uB2E8\uC11C\uB85C\uB9CC \uC0AC\uC6A9\uD558\uACE0 \uD575\uC2EC \uD310\uB2E8\uC744 \uB300\uCCB4\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }
        ];
      }
      function buildDaeUn(result, args) {
        const limit = clamp(Number(args.limit || 10), 1, 12);
        const startAge = result.input.gender === "male" ? 7 : 8;
        const cycles = [];
        for (let index = 0; index < limit; index += 1) {
          const age = startAge + index * 10;
          const stem = STEMS[mod(result.pillars.month.stemIndex + index + 1, 10)];
          const branch = BRANCHES[mod(result.pillars.month.branchIndex + index + 1, 12)];
          cycles.push({ age, label: `${stem.korean}${branch.korean}`, hanja: `${stem.hanja}${branch.hanja}` });
        }
        return { input: result.input, cycles, note: "\uB300\uC6B4 \uC2DC\uC791 \uB098\uC774\uB294 \uB85C\uCEEC \uADFC\uC0AC\uAC12\uC785\uB2C8\uB2E4. \uC815\uBC00 \uD574\uC11D\uC740 \uC808\uAE30 \uAE30\uC900 \uACC4\uC0B0\uACFC \uD568\uAED8 \uBCF4\uC218\uC801\uC73C\uB85C \uC548\uB0B4\uD558\uC138\uC694." };
      }
      function buildPeriodFortune(result, args) {
        const periodType = normalizeString(args.periodType) || "year";
        return {
          input: result.input,
          periodType,
          target: normalizeString(args.target) || String((/* @__PURE__ */ new Date()).getFullYear()),
          fortune: buildFortuneReading(result, "general", args.target),
          note: "\uAE30\uAC04\uC6B4\uC740 \uAE30\uBCF8 \uC0AC\uC8FC \uAD6C\uC870\uC5D0 \uD574\uB2F9 \uAE30\uAC04\uC758 \uC9C8\uBB38 \uB9E5\uB77D\uC744 \uB367\uBD99\uC5EC \uB300\uD654\uD615\uC73C\uB85C \uD480\uC774\uD558\uC138\uC694."
        };
      }
      function summarizePerson(result) {
        return {
          name: result.input.name,
          dayMaster: result.dayMaster,
          dominantElements: result.dominantElements,
          weakElements: result.weakElements,
          timeAccuracy: result.timeAccuracy,
          pillars: {
            year: result.pillars.year.label,
            month: result.pillars.month.label,
            day: result.pillars.day.label,
            hour: result.pillars.hour ? result.pillars.hour.label : null
          }
        };
      }
      function getGeneratingElement(element) {
        return ELEMENT_CYCLE[mod(ELEMENT_CYCLE.indexOf(element) - 1, ELEMENT_CYCLE.length)];
      }
      function getGeneratedElement(element) {
        return ELEMENT_CYCLE[mod(ELEMENT_CYCLE.indexOf(element) + 1, ELEMENT_CYCLE.length)];
      }
      function getControllingElement(element) {
        const map = { wood: "metal", fire: "water", earth: "wood", metal: "fire", water: "earth" };
        return map[element];
      }
      function formatElement(element) {
        return ELEMENT_LABELS[element] || element;
      }
      module.exports = {
        buildDaeUn,
        buildFortuneReading,
        buildInterviewState,
        buildPeriodFortune,
        buildReadingGuide,
        buildSchoolComparison,
        buildYongsinReading,
        countFiveElements,
        estimateDayMasterStrength,
        formatElement,
        getDominantElements,
        getWeakElements,
        selectUsefulElements,
        summarizePerson
      };
    }
  });

  // ../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/index.js
  var require_index = __commonJS({
    "../../AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64/node_modules/saju-fortune/src/index.js"(exports, module) {
      var {
        ANALYSIS_TYPES,
        ELEMENT_CYCLE,
        ELEMENT_KO,
        FORTUNE_TYPES,
        UNKNOWN_TIME_LIMITATION
      } = require_constants();
      var {
        convertCalendar,
        getMissingInterviewFields,
        normalizeBirthInput,
        normalizeString,
        parseDate,
        parseTime,
        rejectUnsupportedLunarInput,
        todayIsoDate
      } = require_input();
      var { calculatePillars, clamp } = require_pillars();
      var {
        buildDaeUn,
        buildFortuneReading,
        buildInterviewState,
        buildPeriodFortune,
        buildReadingGuide,
        buildSchoolComparison,
        buildYongsinReading,
        countFiveElements,
        estimateDayMasterStrength,
        formatElement,
        getDominantElements,
        getWeakElements,
        selectUsefulElements,
        summarizePerson
      } = require_readings();
      function analyzeSaju(birthInput, options = {}) {
        const input = normalizeBirthInput(birthInput);
        const analysisType = normalizeString(options.analysisType) || "basic";
        const fortuneType = normalizeString(options.fortuneType) || "general";
        if (!ANALYSIS_TYPES.has(analysisType)) {
          throw new Error("analysisType must be basic, fortune, yongsin, school_compare, or yongsin_method.");
        }
        if (analysisType === "fortune" && !FORTUNE_TYPES.has(fortuneType)) {
          throw new Error("fortuneType must be general, career, wealth, health, or love.");
        }
        rejectUnsupportedLunarInput(input);
        const dateParts = parseDate(input.birthDate);
        const timeParts = input.birthTime ? parseTime(input.birthTime) : null;
        const pillars = calculatePillars(dateParts, timeParts);
        const fiveElements = countFiveElements(pillars);
        const dominantElements = getDominantElements(fiveElements);
        const weakElements = getWeakElements(fiveElements);
        const timeAccuracy = input.birthTime ? "known" : "unknown";
        const dayMaster = {
          stem: pillars.day.stem,
          element: pillars.day.stemElement,
          elementKo: ELEMENT_KO[pillars.day.stemElement],
          yinYang: pillars.day.yinYang,
          strength: estimateDayMasterStrength(pillars, fiveElements)
        };
        const result = {
          input,
          pillars,
          timeAccuracy,
          limitations: timeAccuracy === "unknown" ? [UNKNOWN_TIME_LIMITATION] : [],
          dayMaster,
          fiveElements,
          dominantElements,
          weakElements,
          yongsin: selectUsefulElements(dayMaster, fiveElements),
          interview: buildInterviewState(input),
          readingGuide: buildReadingGuide(),
          sources: ["saju-fortune-local-calculation", "fortuneteller-mcp-tool-model"]
        };
        if (analysisType === "fortune") {
          result.fortune = buildFortuneReading(result, fortuneType, options.targetYear);
        } else if (analysisType === "yongsin" || analysisType === "yongsin_method") {
          result.yongsin.analysis = buildYongsinReading(result);
        } else if (analysisType === "school_compare") {
          result.schoolComparison = buildSchoolComparison(result);
        }
        return result;
      }
      function callSajuTool(name, args = {}) {
        switch (name) {
          case "analyze_saju":
            return analyzeSaju(args, args);
          case "check_compatibility":
            return checkCompatibility(args);
          case "get_daily_fortune":
            return {
              ...analyzeSaju(args, { analysisType: "fortune", fortuneType: "general" }),
              targetDate: normalizeString(args.targetDate) || todayIsoDate()
            };
          case "get_dae_un":
            return buildDaeUn(analyzeSaju(args), args);
          case "get_fortune_by_period":
            return buildPeriodFortune(analyzeSaju(args), args);
          case "convert_calendar":
            return convertCalendar(args);
          case "manage_settings":
            return {
              preset: normalizeString(args.preset) || "balanced",
              note: "saju-fortune\uB294 \uB85C\uCEEC \uD328\uD0A4\uC9C0\uC774\uBBC0\uB85C MCP \uC11C\uBC84 \uC124\uC815\uC744 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            };
          default:
            throw new Error(`Unknown saju tool: ${name}`);
        }
      }
      function checkCompatibility(args) {
        if (!args || !args.person1 || !args.person2) {
          throw new Error("person1 and person2 are required.");
        }
        const first = analyzeSaju(args.person1);
        const second = analyzeSaju(args.person2);
        const shared = ELEMENT_CYCLE.filter((element) => first.dominantElements.includes(element) && second.dominantElements.includes(element));
        const complementary = ELEMENT_CYCLE.filter((element) => first.weakElements.includes(element) && second.dominantElements.includes(element));
        const reverseComplementary = ELEMENT_CYCLE.filter((element) => second.weakElements.includes(element) && first.dominantElements.includes(element));
        const sameDayElement = first.dayMaster.element === second.dayMaster.element;
        const score = clamp(
          50 + shared.length * 8 + (complementary.length + reverseComplementary.length) * 10 + (sameDayElement ? 8 : 0),
          0,
          100
        );
        const focusAreas = buildCompatibilityFocusAreas(shared, complementary, reverseComplementary);
        return {
          people: [summarizePerson(first), summarizePerson(second)],
          score,
          sharedElements: shared,
          complementaryElements: [.../* @__PURE__ */ new Set([...complementary, ...reverseComplementary])],
          focusAreas,
          summary: `\uB450 \uC0AC\uB78C\uC758 \uAD81\uD569\uC740 ${score}\uC810 \uC218\uC900\uC73C\uB85C, \uAD00\uACC4\uC758 \uC7A5\uC810\uACFC \uC870\uC728 \uD3EC\uC778\uD2B8\uB97C \uD568\uAED8 \uBCF4\uB294 \uD574\uC11D\uC774 \uC801\uC808\uD569\uB2C8\uB2E4.`,
          sources: ["saju-fortune-local-calculation", "fortuneteller-mcp-tool-model"]
        };
      }
      function buildCompatibilityFocusAreas(shared, complementary, reverseComplementary) {
        const focusAreas = [];
        if (shared.length) {
          focusAreas.push(`\uACF5\uD1B5\uC73C\uB85C \uAC15\uD55C ${shared.map(formatElement).join(", ")} \uAE30\uC6B4\uC740 \uACF5\uAC10\uB300\uAC00 \uB418\uC9C0\uB9CC \uACE0\uC9D1\uB3C4 \uAC19\uC774 \uCEE4\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.`);
        }
        if (complementary.length || reverseComplementary.length) {
          focusAreas.push("\uC11C\uB85C \uBD80\uC871\uD55C \uC624\uD589\uC744 \uBCF4\uC644\uD558\uB294 \uC9C0\uC810\uC774 \uC788\uC5B4 \uC5ED\uD560 \uBD84\uB2F4\uC744 \uC758\uC2DD\uD558\uBA74 \uAD00\uACC4\uAC00 \uC548\uC815\uB429\uB2C8\uB2E4.");
        }
        if (!focusAreas.length) {
          focusAreas.push("\uB450 \uC0AC\uC8FC\uC758 \uC911\uC2EC \uAE30\uC6B4\uC774 \uB2EC\uB77C \uC18D\uB3C4\uC640 \uD45C\uD604 \uBC29\uC2DD\uC744 \uB9DE\uCD94\uB294 \uB300\uD654\uAC00 \uC911\uC694\uD569\uB2C8\uB2E4.");
        }
        focusAreas.push("\uAD81\uD569\uC740 \uACB0\uC815\uB860\uC774 \uC544\uB2C8\uB77C \uAD00\uACC4\uB97C \uB3CC\uC544\uBCF4\uB294 \uB300\uD654 \uC7AC\uB8CC\uB85C\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.");
        return focusAreas;
      }
      module.exports = {
        analyzeSaju,
        callSajuTool,
        checkCompatibility,
        getMissingInterviewFields,
        normalizeBirthInput
      };
    }
  });
  return require_index();
})();
