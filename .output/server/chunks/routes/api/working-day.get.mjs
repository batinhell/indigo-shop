import { d as defineEventHandler, k as defineCachedFunction } from '../../nitro/nitro.mjs';
import 'better-auth';
import 'better-auth/plugins';
import 'kysely';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const fetchYearCalendar = defineCachedFunction(
  async (year) => {
    const response = await $fetch(`https://isdayoff.ru/${year}`, {
      responseType: "text"
    });
    return response;
  },
  {
    maxAge: 60 * 60 * 24,
    name: "isdayoff-calendar",
    getKey: (year) => `year-${year}`
  }
);
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1e3 * 60 * 60 * 24));
}
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const CLOSING_SOON_HOURS = 2;
const workingDay_get = defineEventHandler(async () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const hour = now.getHours();
  const dayIndex = getDayOfYear(now) - 1;
  let isDayOff;
  try {
    const calendar = await fetchYearCalendar(year);
    isDayOff = calendar[dayIndex] === "1";
  } catch {
    const day = now.getDay();
    isDayOff = day === 0 || day === 6;
  }
  let status;
  if (isDayOff) {
    status = "day-off";
  } else if (hour < WORK_START_HOUR || hour >= WORK_END_HOUR) {
    status = "after-hours";
  } else if (hour >= WORK_END_HOUR - CLOSING_SOON_HOURS) {
    status = "closing-soon";
  } else {
    status = "working";
  }
  let isTomorrowWorking = true;
  try {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowYear = tomorrow.getFullYear();
    const calendar = await fetchYearCalendar(tomorrowYear);
    const tomorrowIndex = getDayOfYear(tomorrow) - 1;
    isTomorrowWorking = calendar[tomorrowIndex] === "0";
  } catch {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = tomorrow.getDay();
    isTomorrowWorking = day !== 0 && day !== 6;
  }
  return {
    status,
    isTomorrowWorking
  };
});

export { workingDay_get as default };
//# sourceMappingURL=working-day.get.mjs.map
