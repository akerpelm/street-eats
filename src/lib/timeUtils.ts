export function normalizeTimeString(timeStr: string | null | undefined): string | null {
  if (!timeStr) return null;
  
  try {
    // Handle various time formats
    const cleaned = timeStr.toLowerCase().replace(/\s/g, '');
    
    // Special handling for midnight
    if (cleaned === '00:00' || cleaned === '24:00' || cleaned === '12:00am') {
      return '23:59'; // Treat midnight as 23:59 for comparison purposes
    }
    
    // Convert 12-hour format to 24-hour
    const [time, modifier] = cleaned.split(/([ap]m)/);
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'pm' && hours < 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;
    
    // Return in 24-hour format HH:mm
    return `${hours.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
  } catch (e) {
    console.error(`Error normalizing time: ${timeStr}`, e);
    return null;
  }
}

export function isOpenNow(hours: Record<string, { start: string; end: string }>) {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  // Map full day names to your data structure's keys
  const dayMap: Record<string, string> = {
    'sunday': 'sunday',
    'monday': 'monday',
    'tuesday': 'tuesday',
    'wednesday': 'wednesday',
    'thursday': 'thursday',
    'friday': 'friday',
    'saturday': 'saturday'
  };

  const todayHours = hours[dayMap[dayOfWeek]];
  if (!todayHours?.start || !todayHours?.end) return false;

  const normalizedStart = normalizeTimeString(todayHours.start);
  const normalizedEnd = normalizeTimeString(todayHours.end);

  if (!normalizedStart || !normalizedEnd) return false;

  // Handle midnight case
  if (normalizedEnd === '23:59') {
    return currentTime >= normalizedStart || currentTime <= '00:00';
  }

  console.log({
    currentTime,
    start: normalizedStart,
    end: normalizedEnd,
  });

  return currentTime >= normalizedStart && currentTime <= normalizedEnd;
}

export function isClosingSoon(
  hours: Record<string, { start: string; end: string }>,
  thresholdMinutes: number = 60
) {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const dayMap: Record<string, string> = {
    'sunday': 'sunday',
    'monday': 'monday',
    'tuesday': 'tuesday',
    'wednesday': 'wednesday',
    'thursday': 'thursday',
    'friday': 'friday',
    'saturday': 'saturday'
  };

  const todayHours = hours[dayMap[dayOfWeek]];
  if (!todayHours?.end || !isOpenNow(hours)) return false;

  const normalizedEnd = normalizeTimeString(todayHours.end);
  if (!normalizedEnd) return false;

  // Handle midnight case
  const endTime = normalizedEnd === '23:59' ? '00:00' : normalizedEnd;
  
  // Convert times to minutes for comparison
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const currentMinutes = currentHour * 60 + currentMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  // Handle midnight crossing
  const minutesUntilClose = normalizedEnd === '23:59' 
    ? (24 * 60 - currentMinutes) // Minutes until midnight
    : endMinutes - currentMinutes;

  return minutesUntilClose <= thresholdMinutes && minutesUntilClose > 0;
}