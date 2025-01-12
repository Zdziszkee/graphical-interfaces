import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { format, startOfMonth, endOfMonth, getDay } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../../AppContext';

const MealPlannerView: React.FC = () => {
  const { recipes } = useAppContext();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
  const [meals, setMeals] = useState<{ [date: string]: string[] }>({});
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string>('');

  // Function to generate days in the selected month
  const generateDaysInMonth = (year: number, month: number): Date[] => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
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

  const daysInMonth: Date[] = generateDaysInMonth(selectedYear, selectedMonth);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getMondayBasedOffset = (date: Date): number => {
    const dayIndex = getDay(date);
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  const offset = getMondayBasedOffset(new Date(selectedYear, selectedMonth, 1));

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setSelectedMeal('');
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const handleAddMeal = () => {
    if (selectedDay && selectedMeal) {
      const dateStr = selectedDay.toDateString();
      setMeals((prevMeals) => {
        const mealsForDate = prevMeals[dateStr] || [];
        return {
          ...prevMeals,
          [dateStr]: [...mealsForDate, selectedMeal],
        };
      });
      setSelectedMeal('');
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Meal Planner
      </Typography>

      {/* Month and Year Selector */}
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
  <Box display="flex" flexDirection="column" alignItems="center">
    <FormControl
      sx={{
        minWidth: 120,
        border: '1px solid black', // Black border
        borderRadius: '4px', // Optional rounded corners
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove default outline
      }}
    >
      <Select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        sx={{
          textAlign: 'center',
        }}
      >
        {Array.from({ length: 12 }, (_, i) => i).map((month) => (
          <MenuItem key={month} value={month}>
            {format(new Date(selectedYear, month), 'MMMM')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'black' }}>
      Month
    </Typography>
  </Box>

  <Box display="flex" flexDirection="column" alignItems="center">
    <FormControl
      sx={{
        minWidth: 120,
        border: '1px solid black', // Black border
        borderRadius: '4px', // Optional rounded corners
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove default outline
      }}
    >
      <Select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        sx={{
          textAlign: 'center',
        }}
      >
        {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'black' }}>
      Year
    </Typography>
  </Box>
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
          {Array.from({ length: offset }).map((_, index) => (
            <Box key={`empty-${index}`} sx={{ minHeight: '100px' }}></Box>
          ))}

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
                  border: '1px solid black', // Black border
                  borderRadius: '8px', // Rounded corners
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

          <FormControl fullWidth margin="dense">
            <InputLabel>Select Meal</InputLabel>
            <Select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              label="Select Meal"
            >
              {recipes.map((recipe) => (
                <MenuItem key={recipe.id} value={recipe.name}>
                  {recipe.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMeal}
              disabled={!selectedMeal}
            >
              Add Meal
            </Button>
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

