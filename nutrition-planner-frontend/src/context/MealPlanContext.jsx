import React, { createContext, useContext, useState } from 'react';

// Create the context
const MealPlanContext = createContext();

// Custom hook to use the context
export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};

// Provider component
export const MealPlanProvider = ({ children }) => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      dailyCalories: { current: 0, target: 2000, percent: 0 },
      waterIntake: { current: 0, target: 2.5, percent: 0 },
      protein: { current: 0, target: 50, percent: 0 },
      activity: { current: 0, target: 30, percent: 0 }
    },
    calorieData: [],
    nutritionGoals: [],
    monthlyProgress: {
      macroDistribution: [],
      achievements: []
    },
    mealPlan: [],
    recommendedRecipes: []
  });

  // Function to update meal plan and dashboard data
  const updateMealPlan = (mealPlanData) => {
    if (!mealPlanData) return;

    // Extract nutrition data from the meal plan
    const { nutrients } = mealPlanData;
    
    // Calculate percentages for dashboard stats
    const caloriePercent = Math.min(Math.round((nutrients.calories / 2000) * 100), 100);
    const proteinPercent = Math.min(Math.round((nutrients.protein / 50) * 100), 100);
    
    // Create meal plan array from breakfast, lunch, dinner
    const allMeals = [
      ...mealPlanData.breakfast.map(meal => ({
        id: meal.id,
        meal: 'Breakfast',
        description: meal.title,
        calories: Math.round(nutrients.calories / 3),
        protein: Math.round(nutrients.protein / 3),
        carbs: Math.round(nutrients.carbohydrates / 3),
        fat: Math.round(nutrients.fat / 3),
        image: `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`
      })),
      ...mealPlanData.lunch.map(meal => ({
        id: meal.id,
        meal: 'Lunch',
        description: meal.title,
        calories: Math.round(nutrients.calories / 3),
        protein: Math.round(nutrients.protein / 3),
        carbs: Math.round(nutrients.carbohydrates / 3),
        fat: Math.round(nutrients.fat / 3),
        image: `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`
      })),
      ...mealPlanData.dinner.map(meal => ({
        id: meal.id,
        meal: 'Dinner',
        description: meal.title,
        calories: Math.round(nutrients.calories / 3),
        protein: Math.round(nutrients.protein / 3),
        carbs: Math.round(nutrients.carbohydrates / 3),
        fat: Math.round(nutrients.fat / 3),
        image: `https://spoonacular.com/recipeImages/${meal.id}-556x370.${meal.imageType}`
      }))
    ];

    // Create calorie data for the chart
    const calorieData = [
      { name: 'Mon', actual: Math.round(nutrients.calories * 0.9), target: 2000 },
      { name: 'Tue', actual: Math.round(nutrients.calories * 0.95), target: 2000 },
      { name: 'Wed', actual: Math.round(nutrients.calories * 1.05), target: 2000 },
      { name: 'Thu', actual: Math.round(nutrients.calories * 0.85), target: 2000 },
      { name: 'Fri', actual: Math.round(nutrients.calories), target: 2000 },
      { name: 'Sat', actual: 0, target: 2000 },
      { name: 'Sun', actual: 0, target: 2000 }
    ];

    // Create nutrition goals data for the chart
    const nutritionGoals = [
      { name: 'Protein', current: nutrients.protein, target: 50 },
      { name: 'Carbs', current: nutrients.carbohydrates, target: 300 },
      { name: 'Fat', current: nutrients.fat, target: 65 },
      { name: 'Fiber', current: nutrients.fiber, target: 25 }
    ];

    // Create macro distribution data for the pie chart
    const macroDistribution = [
      { name: 'Protein', value: Math.round((nutrients.protein * 4 / nutrients.calories) * 100) },
      { name: 'Carbs', value: Math.round((nutrients.carbohydrates * 4 / nutrients.calories) * 100) },
      { name: 'Fat', value: Math.round((nutrients.fat * 9 / nutrients.calories) * 100) }
    ];

    // Update dashboard data
    setDashboardData({
      stats: {
        dailyCalories: { 
          current: Math.round(nutrients.calories), 
          target: 2000, 
          percent: caloriePercent 
        },
        waterIntake: { 
          current: 1.5, 
          target: 2.5, 
          percent: 60 
        },
        protein: { 
          current: Math.round(nutrients.protein), 
          target: 50, 
          percent: proteinPercent 
        },
        activity: { 
          current: 20, 
          target: 30, 
          percent: 67 
        }
      },
      calorieData,
      nutritionGoals,
      monthlyProgress: {
        macroDistribution,
        achievements: [
          { 
            icon: '🏆', 
            name: 'Balanced Diet', 
            description: 'Your meal plan has a good balance of macronutrients' 
          },
          { 
            icon: '🥦', 
            name: 'Fiber Champion', 
            description: `You're getting ${nutrients.fiber.toFixed(1)}g of fiber daily` 
          }
        ]
      },
      mealPlan: allMeals,
      recommendedRecipes: [
        {
          id: 715538,
          name: 'Healthy Quinoa Bowl',
          time: '30 min',
          calories: '420 kcal',
          image: 'https://spoonacular.com/recipeImages/715538-312x231.jpg'
        },
        {
          id: 716429,
          name: 'Pasta with Garlic',
          time: '25 min',
          calories: '380 kcal',
          image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg'
        }
      ]
    });
  };

  // Value to be provided by the context
  const value = {
    dashboardData,
    updateMealPlan
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
};