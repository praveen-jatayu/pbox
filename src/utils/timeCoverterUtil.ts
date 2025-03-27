export const formatTimeTo12Hour = (time: string): string => {
    const [hourStr, minute] = time.split(':');
    const hour = parseInt(hourStr, 10);
  
    if (isNaN(hour) || !minute) {
      throw new Error("Invalid time format. Expected format: 'HH:MM'");
    }
  
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 or 12 to 12
  
    return `${formattedHour}:${minute} ${period}`;
  };
  