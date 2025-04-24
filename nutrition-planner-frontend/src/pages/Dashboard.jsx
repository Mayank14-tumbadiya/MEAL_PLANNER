import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Leaf, ChevronUp, ChevronDown } from 'lucide-react';
import { useMealPlan } from '../context/MealPlanContext';
import { RefreshCcw } from "lucide-react"

const Dashboard = () => {
  // Get data from context
  const { dashboardData } = useMealPlan();
  
  // UI State
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('calories');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [showNotification, setShowNotification] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsChartVisible(true);
      
      
      setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }, 1000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
 
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    setIsLoading(true);
    
   
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  
  const toggleMealDetails = (index) => {
    setSelectedMeal(selectedMeal === index ? null : index);
  };
  
  // Progress bar component
  const ProgressBar = ({ percent, color }) => {
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setWidth(percent);
      }, 300);
      return () => clearTimeout(timer);
    }, [percent]);
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    );
  };
  
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-100 h-64 rounded-lg mb-8"></div>
          <div className="bg-gray-100 h-96 rounded-lg"></div>
        </div>
        <div className="space-y-8">
          <div className="bg-gray-100 h-64 rounded-lg"></div>
          <div className="bg-gray-100 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  // Empty state for meal plan
  const EmptyMealPlan = () => (
    <div className="p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <Leaf className="h-8 w-8 text-green-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No meals planned yet</h3>
      <p className="text-gray-500 mb-6">Generate your first meal plan to see your nutrition data here.</p>
      <Link 
        to="/meal-planner"
        className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md shadow-sm text-green-600 bg-white  hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-300"

      >
        Create Meal Plan
      </Link>
    </div>
  );
  
  // Empty state for recommended recipes
  const EmptyRecommendations = () => (
    <div className="p-4 text-center">
      <p className="text-gray-500">No recipe recommendations available yet.</p>
      <p className="text-sm text-gray-400 mt-2">Complete your meal plan to get personalized recommendations.</p>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header with logo and navigation */}
      {/* <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-xl ml-2 text-gray-800">MealMaster</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Meal Plans', 'Recipes', 'About'].map((item, index) => (
              <div key={index}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-green-500">
                  {item}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer" onClick={() => setShowNotification(!showNotification)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </div>
            
            <div>
              <Link to="/meal-planner" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                Meal Planner
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      {/* {showNotification && (
        <div className="fixed top-5 right-5 z-50 bg-white rounded-lg shadow-lg p-4 max-w-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">Meal plan updated!</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your nutrition targets have been adjusted based on your new meal plan.
              </p>
              <div className="mt-2">
                <button onClick={() => setShowNotification(false)} className="text-sm text-green-500 font-medium hover:text-green-600">
                  View Details
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-auto text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )} */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex space-x-4">
  <button 
    className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition duration-300 flex items-center mr-5"
    onClick={() => {
      // Simulate refresh
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }, 1000);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    Refresh
  </button>
  
  <Link
    to="/meal-planner"
    className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-2 rounded-md transition duration-300 pl-4 mr-2"
  >
    Update Meal Plan
  </Link>
</div>

        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  title: 'Daily Calories', 
                  current: dashboardData.stats.dailyCalories.current, 
                  target: dashboardData.stats.dailyCalories.target, 
                  percent: dashboardData.stats.dailyCalories.percent, 
                  color: 'bg-green-500', 
                  badge: 'bg-yellow-100 text-yellow-800',
                  
                },
                { 
                  title: 'Water Intake', 
                  current: dashboardData.stats.waterIntake.current, 
                  target: dashboardData.stats.waterIntake.target, 
                  unit: 'L', 
                  percent: dashboardData.stats.waterIntake.percent, 
                  color: 'bg-blue-500', 
                  badge: 'bg-blue-100 text-blue-800',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                { 
                  title: 'Protein', 
                  current: dashboardData.stats.protein.current, 
                  target: dashboardData.stats.protein.target, 
                  unit: 'g', 
                  percent: dashboardData.stats.protein.percent, 
                  color: 'bg-purple-500', 
                  badge: 'bg-purple-100 text-purple-800',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Activity', 
                  current: dashboardData.stats.activity.current, 
                  target: dashboardData.stats.activity.target, 
                  percent: dashboardData.stats.activity.percent, 
                  color: 'bg-orange-500', 
                  badge: 'bg-orange-100 text-orange-800',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden relative"
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  {isHovering === index && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-gray-50 opacity-50"></div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        {stat.icon}
                        <p className="text-sm text-gray-500 ml-2">{stat.title}</p>
                      </div>
                      <h3 className="text-2xl font-bold flex items-end">
                        {stat.current}
                        {/* <span className="text-gray-500 text-lg ml-1">/ {stat.target}{stat.unit ? ` ${stat.unit}` : ''}</span> */}
                      </h3>
                    </div>
                    <span className={`${stat.badge} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                      {stat.percent}% of goal
                    </span>
                  </div>
                  <ProgressBar percent={stat.percent} color={stat.color} />
                  
                  {isHovering === index && (
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
                      <span>Yesterday: {stat.current - Math.floor(Math.random() * 100)}{stat.unit}</span>
                      <button className="text-green-500 hover:text-green-600">View History</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Weekly Progress */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-xl font-semibold mb-2 sm:mb-0">Progress Overview</h2>
                    <div className="flex space-x-4">
                      <div className="flex rounded-md overflow-hidden border border-green-200">
                        {[
                          { id: 'calories', label: 'Calories' },
                          { id: 'nutrition', label: 'Nutrition' },
                          { id: 'activity', label: 'Activity' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            className={`px-3 py-1 text-sm ${activeTab === tab.id ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
                            onClick={() => handleTabChange(tab.id)}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex rounded-md overflow-hidden border border-green-200">
                        {['week', 'month', 'year'].map((timeframe) => (
                          <button
                            key={timeframe}
                            className={`px-3 py-1 text-sm ${selectedTimeframe === timeframe ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
                            onClick={() => handleTimeframeChange(timeframe)}
                          >
                            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {activeTab === 'calories' && dashboardData.calorieData.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardData.calorieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="#8884d8" />
                          <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : activeTab === 'calories' && (
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <Leaf className="h-10 w-10 text-green-300 mx-auto mb-2" />
                        <p className="text-gray-500">No calorie data available yet</p>
                        <p className="text-sm text-gray-400 mt-1">Create a meal plan to see your progress</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'nutrition' && dashboardData.nutritionGoals.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboardData.nutritionGoals}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="current" fill="#8884d8" />
                          <Bar dataKey="target" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : activeTab === 'nutrition' && (
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <Leaf className="h-10 w-10 text-green-300 mx-auto mb-2" />
                        <p className="text-gray-500">No nutrition data available yet</p>
                        <p className="text-sm text-gray-400 mt-1">Create a meal plan to see your progress</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && dashboardData.monthlyProgress.macroDistribution.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dashboardData.monthlyProgress.macroDistribution}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                          >
                            {dashboardData.monthlyProgress.macroDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : activeTab === 'activity' && (
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <Leaf className="h-10 w-10 text-green-300 mx-auto mb-2" />
                        <p className="text-gray-500">No activity data available yet</p>
                        <p className="text-sm text-gray-400 mt-1">Create a meal plan to see your progress</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meal Plan Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Today's Meal Plan</h2>
                  {dashboardData.mealPlan.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.mealPlan.map((meal, index) => (
                        <div
                          key={meal.id}
                          className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
                          onClick={() => toggleMealDetails(index)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{meal.meal}</h3>
                              <p className="text-sm text-gray-500">{meal.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{meal.calories} kcal</p>
                              <p className="text-xs text-gray-400">{meal.protein}g protein, {meal.carbs}g carbs, {meal.fat}g fat</p>
                            </div>
                          </div>
                          {selectedMeal === index && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <img src={meal.image} alt={meal.meal} className="w-full h-32 object-cover rounded-lg mb-4" />
                              <div className="flex justify-between">
                                <div className="bg-green-50 rounded-lg p-2 text-center flex-1 mr-2">
                                  <p className="text-xs text-gray-500">Protein</p>
                                  <p className="font-bold text-green-700">{meal.protein}g</p>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-2 text-center flex-1 mr-2">
                                  <p className="text-xs text-gray-500">Carbs</p>
                                  <p className="font-bold text-blue-700">{meal.carbs}g</p>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-2 text-center flex-1">
                                  <p className="text-xs text-gray-500">Fat</p>
                                  <p className="font-bold text-yellow-700">{meal.fat}g</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyMealPlan />
                  )}
                </div>
              </div>

              {/* Right Column - Recommended Recipes and Achievements */}
              <div className="space-y-8">
                {/* Recommended Recipes */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Recommended Recipes</h2>
                  {dashboardData.recommendedRecipes.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.recommendedRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
                        >
                          <img src={recipe.image} alt={recipe.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <h3 className="font-medium">{recipe.name}</h3>
                            <p className="text-sm text-gray-500">{recipe.time} • {recipe.calories}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyRecommendations />
                  )}
                </div>

                {/* Achievements */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Achievements</h2>
                  {dashboardData.monthlyProgress.achievements.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.monthlyProgress.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <h3 className="font-medium">{achievement.name}</h3>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-500">No achievements yet.</p>
                      <p className="text-sm text-gray-400 mt-2">Complete your meal plans to earn achievements.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;