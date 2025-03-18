export const formatTimeTo12Hour = (time) => {
    let [hour, minute] = time.split(':');
    hour = parseInt(hour, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Handle 12 AM and 12 PM cases
    return `${hour}:${minute} ${period}`;
};