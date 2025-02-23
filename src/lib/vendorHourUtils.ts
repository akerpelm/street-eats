export function getCurrentDayHours(hours: Record<string, { start: string; end: string }>) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[new Date().getDay()];
    return hours ? hours[currentDay] : null;
  }
  
  export function isOpenNow(hours: Record<string, { start: string; end: string }>) {
    const currentHours = getCurrentDayHours(hours);
    if (!currentHours) return false;
  
    const now = new Date();
    const start = new Date();
    const end = new Date();
  
    const [startHour, startPeriod] = currentHours.start.split(/(am|pm)/);
    const [endHour, endPeriod] = currentHours.end.split(/(am|pm)/);
  
    start.setHours(parseInt(startHour) + (startPeriod === 'pm' && startHour !== '12' ? 12 : 0));
    start.setMinutes(0);
  
    end.setHours(parseInt(endHour) + (endPeriod === 'pm' && endHour !== '12' ? 12 : 0));
    end.setMinutes(0);
  
    return now >= start && now <= end;
  }
  
  export function isClosingSoon(hours: Record<string, { start: string; end: string }>) {
    const currentHours = getCurrentDayHours(hours);
    if (!currentHours) return false;
  
    const now = new Date();
    const end = new Date();
  
    const [endHour, endPeriod] = currentHours.end.split(/(am|pm)/);
  
    end.setHours(parseInt(endHour) + (endPeriod === 'pm' && endHour !== '12' ? 12 : 0));
    end.setMinutes(0);
  
    const oneHourBeforeEnd = new Date(end.getTime() - 60 * 60 * 1000);
  
    return now >= oneHourBeforeEnd && now <= end;
  }