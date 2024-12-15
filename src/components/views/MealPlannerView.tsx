import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { format, startOfMonth, endOfMonth, getDay } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const MealPlannerView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Current month
  const [meals, setMeals] = useState<{ [date: string]: string[] }>({});
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [mealInput, setMealInput] = useState('');

  // Function to generate days in the current month
  const generateDaysInMonth = (date: Date): Date[] => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days: Date[] = [];
    for (
        let current = new Date(start);
        current <= end;
        current.setDate(current.getDate() + 1)
    ) {
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

  // New functions for handling meals
  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setMealInput(''); // Reset input
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
  };

  return (
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Meal Planner
        </Typography>

        {/* Month and Year Selector */}
        <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
                value={currentMonth}
                onChange={handleMonthChange}
                label="Month"
            >
              {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {format(new Date(currentYear, i), 'MMMM')}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
                value={currentYear}
                onChange={handleYearChange}
                label="Year"
            >
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
          <Box
              display="grid"
              gridTemplateColumns="repeat(7, 1fr)"
              gap={1}
              textAlign="center"
              mb={2}
          >
            {weekDays.map((day) => (
                <Box key={day} sx={{ fontWeight: 'bold', color: '#424242' }}>
                  {day}
                </Box>
            ))}
          </Box>

          {/* Calendar Days */}
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
            {/* Add blank cells for days before the 1st */}
            {Array.from({ length: offset }).map((_, index) => (
                <Box key={`empty-${index}`} sx={{ minHeight: '100px' }}></Box>
            ))}

            {/* Display all days of the month */}
            {daysInMonth.map((day) => {
              const dayMeals = meals[day.toDateString()] || [];
              const maxMealsToShow = 2;
              const mealsToShow = dayMeals.slice(0, maxMealsToShow);
              const extraMealsCount = dayMeals.length - maxMealsToShow;

              return (
                  <Box
                      key={day.toString()}
                      onClick={() => handleDayClick(day)}
                      sx={{
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: isToday(day) ? '#e3f2fd' : '#f9f9f9',
                        cursor: 'pointer',
                        padding: '4px',
                        '&:hover': { backgroundColor: '#bbdefb' },
                      }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {format(day, 'd')}
                    </Typography>
                    <Box
                        sx={{
                          mt: 0.5,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                        }}
                    >
                      {mealsToShow.map((meal, index) => (
                          <Tooltip key={index} title={meal}>
                            <Chip
                                label={meal}
                                size="small"
                                sx={{
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                            />
                          </Tooltip>
                      ))}
                      {extraMealsCount > 0 && (
                          <Tooltip
                              title={dayMeals
                                  .slice(maxMealsToShow)
                                  .map((meal) => meal)
                                  .join(', ')}
                          >
                            <Chip
                                label={`+${extraMealsCount} more`}
                                size="small"
                                sx={{ backgroundColor: '#ffcc80' }}
                            />
                          </Tooltip>
                      )}
                    </Box>
                  </Box>
              );
            })}
          </Box>
        </Box>

        {/* Meal Dialog */}
        <Dialog
            open={Boolean(selectedDay)}
            onClose={() => setSelectedDay(null)}
            fullWidth
        >
          <DialogTitle>
            {selectedDay ? format(selectedDay, 'do MMMM') : ''} - Add Meal
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              {(meals[selectedDay?.toDateString() || ''] || []).map(
                  (meal, index) => (
                      <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mb: 1 }}
                      >
                        <Typography>{meal}</Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              // Remove meal
                              const dateStr = selectedDay?.toDateString() || '';
                              setMeals((prevMeals) => {
                                const mealsForDate = prevMeals[dateStr].filter(
                                    (_, i) => i !== index
                                );
                                return {
                                  ...prevMeals,
                                  [dateStr]: mealsForDate,
                                };
                              });
                            }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                  )
              )}
            </Box>

            <Box display="flex" alignItems="center">
              <TextField
                  margin="dense"
                  label="Add Meal"
                  type="text"
                  fullWidth
                  value={mealInput}
                  onChange={(e) => setMealInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && mealInput.trim()) {
                      // Save meal
                      if (selectedDay) {
                        const dateStr = selectedDay.toDateString();
                        setMeals((prevMeals) => {
                          const mealsForDate = prevMeals[dateStr] || [];
                          return {
                            ...prevMeals,
                            [dateStr]: [...mealsForDate, mealInput],
                          };
                        });
                        setMealInput('');
                      }
                      e.preventDefault();
                    }
                  }}
              />
              <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => {
                    if (selectedDay && mealInput.trim()) {
                      const dateStr = selectedDay.toDateString();
                      setMeals((prevMeals) => {
                        const mealsForDate = prevMeals[dateStr] || [];
                        return {
                          ...prevMeals,
                          [dateStr]: [...mealsForDate, mealInput],
                        };
                      });
                      setMealInput('');
                    }
                  }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedDay(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default MealPlannerView;