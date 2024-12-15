import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { format, startOfMonth, endOfMonth, getDay } from 'date-fns';

const MealPlannerView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Current month

  // Function to generate days in the current month
  const generateDaysInMonth = (date: Date): Date[] => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days: Date[] = [];
    for (let current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
      days.push(new Date(current));
    }
    return days;
  };

  const daysInMonth: Date[] = generateDaysInMonth(selectedDate);

  // Adjusted weekDays array to start with Monday
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate how many blank cells are needed before the 1st of the month
  const getMondayBasedOffset = (date: Date): number => {
    const dayIndex = getDay(date); // Default: 0 (Sunday) to 6 (Saturday)
    return dayIndex === 0 ? 6 : dayIndex - 1; // Shift Sunday (0) to the end of the week
  };

  const offset = getMondayBasedOffset(startOfMonth(selectedDate));

  // Handle month/year change
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = Number(event.target.value);
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), newMonth));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const newYear = Number(event.target.value);
    setSelectedDate((prevDate) => new Date(newYear, prevDate.getMonth()));
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Meal Planner
      </Typography>

      {/* Month and Year Selector */}
      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={currentMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {format(new Date(currentYear, i), 'MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value={currentYear} onChange={handleYearChange}>
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={currentYear - 2 + i}>
                {currentYear - 2 + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Calendar */}
      <Box>
        {/* Days of the week */}
        <Grid container spacing={1} textAlign="center">
          {weekDays.map((day) => (
            <Grid key={day} item xs={12 / 7}>
              <Typography variant="subtitle1" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar Days */}
        <Grid container spacing={1} textAlign="center">
          {/* Add blank cells for days before the 1st */}
          {Array.from({ length: offset }).map((_, index) => (
            <Grid key={`empty-${index}`} item xs={12 / 7}></Grid>
          ))}

          {/* Display all days of the month */}
          {daysInMonth.map((day) => (
            <Grid key={day.toString()} item xs={12 / 7}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  backgroundColor: '#f9f9f9',
                  '&:hover': { backgroundColor: '#e0f7fa' },
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {format(day, 'd')}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MealPlannerView;
