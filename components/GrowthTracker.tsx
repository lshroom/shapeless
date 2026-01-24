import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ACTIVISM_DESCRIPTION, GROWTH_TRACKER_GIF } from '../constants';
import Button from './Button';
import * as d3 from 'd3'; // Import d3 for advanced charting if needed, recharts is simpler for this.

// Helper function for exponential growth: each person adds 2 more, so the group size triples each week.
const calculateGrowth = (initialMembers: number, weeks: number): number => {
  return initialMembers * Math.pow(3, weeks);
};

const GrowthTracker: React.FC = () => {
  const [initialMembers, setInitialMembers] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(0); // Simulate progress over time
  const [targetWeeks, setTargetWeeks] = useState(12); // Project for 12 weeks
  const [liveMembers, setLiveMembers] = useState(initialMembers); // State for displaying live members

  useEffect(() => {
    // Simulate growth over time
    const interval = setInterval(() => {
      setCurrentWeek((prevWeek) => {
        const nextWeek = prevWeek + 1;
        // Optionally cap the simulation or reset after a period
        if (nextWeek > targetWeeks) return 0; // Reset for continuous display
        return nextWeek;
      });
    }, 5000); // Update every 5 seconds (simulating a week passing)

    return () => clearInterval(interval);
  }, [targetWeeks]);

  useEffect(() => {
    // Update live members based on simulated currentWeek
    setLiveMembers(calculateGrowth(initialMembers, currentWeek));
  }, [initialMembers, currentWeek]);

  const growthData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= targetWeeks; i++) {
      data.push({
        week: `Week ${i}`,
        members: calculateGrowth(initialMembers, i),
      });
    }
    return data;
  }, [initialMembers, targetWeeks]);

  const handleInitialMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setInitialMembers(value);
      setCurrentWeek(0); // Reset simulation
    }
  };

  const handleTargetWeeksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setTargetWeeks(value);
    }
  };

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-neon-purple border border-[#9d81ff]">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9d81ff] to-[#b69eff] mb-6 text-center neon-text-light">
        The Wave of Change
      </h2>
      <div
        className="text-lg text-gray-300 mb-8 leading-relaxed prose prose-invert max-w-none text-center"
        dangerouslySetInnerHTML={{ __html: ACTIVISM_DESCRIPTION }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
        <div className="flex-1 text-center lg:text-left">
          <img src={GROWTH_TRACKER_GIF} alt="Growth Visualization" className="mx-auto rounded-xl shadow-lg border border-[#9d81ff]" />
        </div>
        <div className="flex-1 bg-gray-900 p-6 rounded-xl shadow-inner border border-gray-700">
          <h3 className="text-2xl font-bold text-[#9d81ff] mb-4">Movement Statistics</h3>
          <p className="text-xl text-white mb-2">
            Current Members: <span className="font-extrabold text-green-400 text-3xl">{liveMembers.toLocaleString()}</span>
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Projected in {targetWeeks} weeks: <span className="font-bold text-[#b69eff]">
              {calculateGrowth(initialMembers, targetWeeks).toLocaleString()}
            </span>
          </p>

          <div className="mb-4">
            <label htmlFor="initialMembers" className="block text-sm font-medium text-gray-400 mb-1">
              Starting Members:
            </label>
            <input
              type="number"
              id="initialMembers"
              value={initialMembers}
              onChange={handleInitialMembersChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#9d81ff] focus:border-[#9d81ff]"
              min="1"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="targetWeeks" className="block text-sm font-medium text-gray-400 mb-1">
              Projection Weeks:
            </label>
            <input
              type="number"
              id="targetWeeks"
              value={targetWeeks}
              onChange={handleTargetWeeksChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#9d81ff] focus:border-[#9d81ff]"
              min="1"
            />
          </div>
          <Button variant="outline" className="w-full" onClick={() => setCurrentWeek(0)}>
            Reset Simulation
          </Button>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#9d81ff] mb-4 text-center">Growth Projection Chart</h3>
      <div className="h-80 w-full bg-gray-900 rounded-xl p-4 border border-gray-700">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
            <XAxis dataKey="week" stroke="#a0a0a0" />
            <YAxis stroke="#a0a0a0" tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', borderColor: '#9d81ff', color: '#e0e0f0' }}
              labelStyle={{ color: '#9d81ff' }}
              formatter={(value: number) => [value.toLocaleString(), 'Members']}
            />
            <Line type="monotone" dataKey="members" stroke="#00ffaa" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthTracker;