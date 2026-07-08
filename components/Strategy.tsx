"use client"

import React, { useState } from 'react';

const Strategy = () => {
  const [activeTab, setActiveTab] = useState('martingale');

  // Input state strings to allow smooth decimal typing without cursor jumping
  const [bankrollStr, setBankrollStr] = useState("67.00");
  const [baseNetStr, setBaseNetStr] = useState("0.30");
  const [oddsAStr, setOddsAStr] = useState("0.50");
  const [oddsBStr, setOddsBStr] = useState("0.50");
  const [trueProbPctStr, setTrueProbPctStr] = useState("65"); // 65% True Win Probability for Kelly
  const [baseHedgeStr, setBaseHedgeStr] = useState("1.00");
  const [baseMainStr, setBaseMainStr] = useState("1.30");

  // Parse numerical values for calculations
  const bankroll = parseFloat(bankrollStr) || 0;
  const baseNet = parseFloat(baseNetStr) || 0;
  const oddsA = parseFloat(oddsAStr) || 0.50;
  const oddsB = parseFloat(oddsBStr) || 0.50;
  const trueProb = (parseFloat(trueProbPctStr) || 50) / 100;
  const baseHedge = parseFloat(baseHedgeStr) || 0;

  // Helper: Calculate Main Bet required to achieve net profit given share price PA
  const calcMainBet = (net, hedge, pA) => {
    if (pA <= 0 || pA >= 1) return 0;
    return ((net + hedge) * pA) / (1 - pA);
  };

  // Linked handlers to maintain exact Polymarket payout relationships
  const handleNetChange = (e) => {
    const val = e.target.value;
    setBaseNetStr(val);
    const netNum = parseFloat(val) || 0;
    const calcMain = calcMainBet(netNum, baseHedge, oddsA);
    setBaseMainStr(calcMain.toFixed(2));
  };

  const handleOddsAChange = (e) => {
    const val = e.target.value;
    setOddsAStr(val);
    const pA = parseFloat(val) || 0.50;
    if (pA > 0 && pA < 1) {
      const calcMain = calcMainBet(baseNet, baseHedge, pA);
      setBaseMainStr(calcMain.toFixed(2));
    }
  };

  const handleOddsBChange = (e) => {
    setOddsBStr(e.target.value);
  };

  const handleHedgeChange = (e) => {
    const val = e.target.value;
    setBaseHedgeStr(val);
    const hedgeNum = parseFloat(val) || 0;
    const calcMain = calcMainBet(baseNet, hedgeNum, oddsA);
    setBaseMainStr(calcMain.toFixed(2));
  };

  const handleMainChange = (e) => {
    const val = e.target.value;
    setBaseMainStr(val);
    const mainNum = parseFloat(val) || 0;
    if (oddsA > 0 && oddsA < 1) {
      // Net Target = Main * ((1 - PA) / PA) - Hedge
      const calcNet = mainNum * ((1 - oddsA) / oddsA) - baseHedge;
      setBaseNetStr(calcNet.toFixed(2));
    }
  };

  // Safe odds bounds for loop execution
  const pA = oddsA > 0 && oddsA < 1 ? oddsA : 0.50;
  const pB = oddsB > 0 && oddsB <= 1 ? oddsB : 0.50;

  // 1. Capped Step-5 Loop (Martingale - Existing)
  const generateMartingale = () => {
    let steps = [];
    let netRisk = baseNet;
    let prevLoss = 0;
    for (let i = 1; i <= 5; i++) {
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let profitOnWin = netRisk - prevLoss;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = prevLoss + stepLoss;
      let availBal = bankroll - prevLoss;
      
      steps.push({ step: i, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      prevLoss += stepLoss;
      netRisk *= 2;
    }
    return steps;
  };

  // 2. Hedged D'Alembert (Linear - Existing)
  const generateDalembert = () => {
    let steps = [];
    let prevLoss = 0;
    for (let i = 1; i <= 50; i++) {
      let netRisk = baseNet * i;
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let profitOnWin = netRisk - prevLoss;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = prevLoss + stepLoss;
      let availBal = bankroll - prevLoss;
      
      if (upfront > availBal) break;
      steps.push({ step: i, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      prevLoss += stepLoss;
    }
    return steps;
  };

  // 3. Hedged Fibonacci (Parabolic - Existing)
  // current sequence adjusted for a account less than $100
  const generateFibonacci = () => {
    const fib = [1, 2.6, 5.9, 12.8, 27.2, 42, 49.7, 55, 79, 89, 144, 233, 377];
    let steps = [];
    let prevLoss = 0;
    for (let i = 0; i < fib.length; i++) {
      let netRisk = baseNet * fib[i];
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let profitOnWin = netRisk - prevLoss;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = prevLoss + stepLoss;
      let availBal = bankroll - prevLoss;
      
      if (upfront > availBal) break;
      steps.push({ step: i + 1, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      prevLoss += stepLoss;
    }
    return steps;
  };

  // 4. Labouchère (Split-Recovery System - NEW)
  const generateLabouchere = () => {
    let steps = [];
    let seq = [baseNet * 0.5, baseNet * 0.5]; // Initial split sequence
    let prevLoss = 0;
    for (let i = 1; i <= 30; i++) {
      if (seq.length === 0) break;
      let netRisk = seq[0] + (seq.length > 1 ? seq[seq.length - 1] : 0);
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = prevLoss + stepLoss;
      let availBal = bankroll - prevLoss;
      let profitOnWin = netRisk - prevLoss;

      if (upfront > availBal) break;
      steps.push({ step: i, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      
      // On loss, append the step loss to the end of the sequence
      seq.push(stepLoss);
      prevLoss += stepLoss;
    }
    return steps;
  };

  // 5. 1-3-2-6 System (Positive Momentum Progression - NEW)
  const generate1326 = () => {
    const multipliers = [1, 3, 2, 6, 1, 3, 2, 6, 1, 3, 2, 6]; // 3 full cycles
    let steps = [];
    let cumWinProfit = 0;
    for (let i = 0; i < multipliers.length; i++) {
      let netRisk = baseNet * multipliers[i];
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let stepLoss = upfront - (baseHedge / pB);
      
      // In positive progression, previous wins act as a buffer against loss
      let lossIfLost = stepLoss - cumWinProfit;
      let availBal = bankroll + cumWinProfit;
      let profitOnWin = cumWinProfit + netRisk;

      if (upfront > availBal) break;
      steps.push({ step: i + 1, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      cumWinProfit += netRisk; // Compound gains on win
    }
    return steps;
  };

  // 6. Oscar's Grind (Variance-Bounded Capital Preservation - NEW)
  const generateOscars = () => {
    let steps = [];
    let prevLoss = 0;
    for (let i = 1; i <= 30; i++) {
      let netRisk = baseNet; // Flat bet size during losing streaks
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = prevLoss + stepLoss;
      let availBal = bankroll - prevLoss;
      let profitOnWin = netRisk - prevLoss;

      if (upfront > availBal) break;
      steps.push({ step: i, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss });
      prevLoss += stepLoss;
    }
    return steps;
  };

  // 7. Hedged Kelly Criterion (Probabilistic Edge - NEW)
  const generateKelly = () => {
    const bA = pA > 0 && pA < 1 ? (1 - pA) / pA : 1; // Payout multiplier for Side A
    const fStar = (bA * trueProb - (1 - trueProb)) / bA; // Full Kelly fraction
    
    const kellyTiers = [
      { name: "1 (0.10x - Defensive)", mult: 0.10 },
      { name: "2 (0.20x - Cautious)", mult: 0.20 },
      { name: "3 (0.25x - Quarter Kelly)", mult: 0.25 },
      { name: "4 (0.33x - Third Kelly)", mult: 0.33 },
      { name: "5 (0.50x - Half Kelly ⭐)", mult: 0.50 },
      { name: "6 (0.66x - Two-Thirds)", mult: 0.66 },
      { name: "7 (0.75x - Three-Quarters)", mult: 0.75 },
      { name: "8 (1.00x - Full Kelly)", mult: 1.00 },
      { name: "9 (1.25x - Aggressive)", mult: 1.25 },
      { name: "10 (1.50x - Hyper-Growth)", mult: 1.50 },
    ];

    return kellyTiers.map((tier) => {
      let netRisk = fStar > 0 ? bankroll * (fStar * tier.mult) : 0;
      let mainBet = calcMainBet(netRisk, baseHedge, pA);
      let upfront = mainBet + baseHedge;
      let stepLoss = upfront - (baseHedge / pB);
      let lossIfLost = stepLoss; // Kelly evaluates risk per individual trade
      let availBal = bankroll - stepLoss;
      let profitOnWin = netRisk;

      return { step: tier.name, mainBet, hedgeBet: baseHedge, netRisk, upfront, availBal, profitOnWin, lossIfLost, stepLoss };
    });
  };

  const strategies = {
    martingale: generateMartingale(),
    dalembert: generateDalembert(),
    fibonacci: generateFibonacci(),
    labouchere: generateLabouchere(),
    '1326': generate1326(),
    oscars: generateOscars(),
    kelly: generateKelly(),
  };

  // Helper function to colorize profit/loss text
  const formatPL = (amount) => {
    if (amount > 0.001) return <span className="text-emerald-400 font-bold">+${amount.toFixed(2)}</span>;
    if (amount < -0.001) return <span className="text-rose-400 font-bold">-${Math.abs(amount).toFixed(2)}</span>;
    return <span className="text-gray-400 font-bold"> $0.00</span>;
  };

  const renderTable = (data) => {
    const totalLoss = data.length > 0 ? Math.max(0, data[data.length - 1].lossIfLost) : 0;
    const remainingBal = bankroll - totalLoss;
    const totalSteps = data.length;

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-900 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3">Step</th>
              <th className="px-4 py-3 text-emerald-400">Main Bet (Side A)</th>
              <th className="px-4 py-3 text-rose-400">Hedge Bet (Side B)</th>
              <th className="px-4 py-3 text-blue-400">Net Risk</th>
              <th className="px-4 py-3">Upfront Cost</th>
              <th className="px-4 py-3">Net P/L If Won</th>
              <th className="px-4 py-3 text-amber-400">Cum. Loss (If Lost)</th>
              <th className="px-4 py-3">Avail. Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{row.step}</td>
                <td className="px-4 py-3 text-emerald-400">${row.mainBet.toFixed(2)}</td>
                <td className="px-4 py-3 text-rose-400">${row.hedgeBet.toFixed(2)}</td>
                <td className="px-4 py-3 font-bold text-blue-400">${row.netRisk.toFixed(2)}</td>
                <td className="px-4 py-3">${row.upfront.toFixed(2)}</td>
                <td className="px-4 py-3 bg-gray-900/50">{formatPL(row.profitOnWin)}</td>
                <td className="px-4 py-3 font-semibold bg-gray-900/30">
                  {row.lossIfLost < -0.001 ? (
                    <span className="text-emerald-400">+{Math.abs(row.lossIfLost).toFixed(2)} (Profit Locked)</span>
                  ) : (
                    <span className="text-amber-400/90">-${row.lossIfLost.toFixed(2)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  ${row.availBal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Cumulative Loss Summary Section (Active Across All Tabs) */}
        <div className="bg-gray-900/95 border-t border-gray-700 p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-sm">
            
            <div className="flex items-center space-x-2.5">
              <span className="flex h-3 w-3 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="font-bold tracking-wide text-gray-200">
                {activeTab === 'martingale' && '🛑 STEP-5 HARD CIRCUIT BREAKER LIMIT'}
                {activeTab === 'dalembert' && '⚠️ MARGIN EXHAUSTION LIMIT (MAX LINEAR SURVIVAL)'}
                {activeTab === 'fibonacci' && '⚠️ MARGIN EXHAUSTION LIMIT (MAX PARABOLIC SURVIVAL)'}
                {activeTab === 'labouchere' && '🛡️ SPLIT-RECOVERY EXHAUSTION LIMIT (MULTI-STEP RECOVERY)'}
                {activeTab === '1326' && '🚀 POSITIVE MOMENTUM CYCLE (STREAK COMPOUNDING LIMIT)'}
                {activeTab === 'oscars' && '⚓ VARIANCE-BOUNDED CAPITAL PRESERVATION (FLAT DRAWDOWN)'}
                {activeTab === 'kelly' && '🧠 PROBABILISTIC EDGE SCALING (KELLY OPTIMIZATION TIERS)'}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm">
              <div className="bg-gray-950 px-3 py-1.5 rounded border border-gray-800 flex items-center gap-1.5">
                <span className="text-gray-400">Max Steps: </span>
                <span className="font-bold text-white">{totalSteps}</span>
              </div>
              
              <div className="bg-rose-950/50 px-3 py-1.5 rounded border border-rose-900/60 flex items-center gap-1.5 shadow-inner">
                <span className="text-gray-300">Total Cum. Loss (If Lost): </span>
                <span className="font-bold text-rose-400">-${totalLoss.toFixed(2)}</span>
              </div>

              <div className="bg-gray-950 px-3 py-1.5 rounded border border-gray-800 flex items-center gap-1.5">
                <span className="text-gray-400">Remaining Balance: </span>
                <span className="font-bold text-emerald-400">${Math.max(0, remainingBal).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-800/80 leading-relaxed">
            {activeTab === 'martingale' && `System Action: If Step 5 fails, accept the total -$${totalLoss.toFixed(2)} cumulative drawdown as a cost of business and immediately hard-reset back to Step 1 to protect your remaining $${Math.max(0, remainingBal).toFixed(2)} capital.`}
            {activeTab === 'dalembert' && `System Action: If your streak hits Step ${totalSteps} and fails, your total cumulative drawdown reaches -$${totalLoss.toFixed(2)}. Upfront margin required for Step ${totalSteps + 1} will exceed your remaining $${Math.max(0, remainingBal).toFixed(2)} bankroll, forcing a sequence termination.`}
            {activeTab === 'fibonacci' && `System Action: If your streak hits Step ${totalSteps} and fails, your total cumulative drawdown reaches -$${totalLoss.toFixed(2)}. Upfront margin required for Step ${totalSteps + 1} will exceed your remaining $${Math.max(0, remainingBal).toFixed(2)} bankroll, forcing a sequence termination.`}
            {activeTab === 'labouchere' && `System Action: Losses are appended to your recovery sequence rather than multiplied in a single step. Surmounting Step ${totalSteps} requires upfront margin exceeding available bankroll ($${Math.max(0, remainingBal).toFixed(2)} remaining). Reset sequence upon clearing all split units.`}
            {activeTab === '1326' && `System Action: This is a positive progression streak model. You advance steps ONLY after a win. A loss at ANY step immediately breaks the streak, caps your risk, and triggers a hard-reset back to Step 1. Completing Step 4 locks in max compounding profit.`}
            {activeTab === 'oscars' && `System Action: Bet size remains strictly flat at 1 unit during losing streaks to preserve capital against choppy variance. After any winning trade, bet size increases by +1 unit—capped at reaching exactly +1 unit of total net profit for the entire series, then resets.`}
            {activeTab === 'kelly' && `System Action: Position sizes are dynamically calculated from the divergence between your Estimated True Win Prob (${(trueProb * 100).toFixed(0)}%) and Polymarket Implied Odds (${(pA * 100).toFixed(0)}%). Half Kelly (Tier 5) is recommended for long-term geometric bankroll compounding without excessive volatility.`}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 font-sans text-gray-100">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Interactive Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-gray-800 pb-6 gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Polymarket Execution Engine</h1>
            <p className="text-sm text-gray-400">Synthetic fractional sizing & implied probability hedging.</p>
          </div>
          
          {/* Header Input Grid (7-Column Layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            
            {/* Bankroll Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-emerald-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Bankroll</label>
              <div className="flex items-center text-emerald-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="1.00"
                  value={bankrollStr} 
                  onChange={(e) => setBankrollStr(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Max Capital</span>
            </div>

            {/* Net Target Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-blue-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Net Target</label>
              <div className="flex items-center text-blue-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="0.10"
                  value={baseNetStr} 
                  onChange={handleNetChange}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Base Profit</span>
            </div>

            {/* Side A Odds Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-emerald-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">Side A Odds ($)</label>
              <div className="flex items-center text-emerald-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0.01"
                  max="0.99"
                  value={oddsAStr} 
                  onChange={handleOddsAChange}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-emerald-500/80 font-mono">
                {oddsA > 0 && oddsA < 1 ? `(${(1/oddsA).toFixed(2)}x Payout)` : 'Invalid Odds'}
              </span>
            </div>

            {/* True Win Probability Input (For Kelly Strategy) */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-purple-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/80">True Win Prob (Side A)</label>
              <div className="flex items-center text-purple-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">%</span>
                <input 
                  type="number" 
                  step="1"
                  min="1"
                  max="99"
                  value={trueProbPctStr} 
                  onChange={(e) => setTrueProbPctStr(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-purple-500/80 font-mono">
                {trueProb > oddsA ? `+${((trueProb - oddsA) * 100).toFixed(0)}% Kelly Edge` : 'No Edge (<= Odds)'}
              </span>
            </div>

            {/* Side B Odds Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-rose-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-rose-400/80">Side B Odds ($)</label>
              <div className="flex items-center text-rose-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0.01"
                  max="0.99"
                  value={oddsBStr} 
                  onChange={handleOddsBChange}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-rose-500/80 font-mono">
                {oddsB > 0 && oddsB <= 1 ? `(${(1/oddsB).toFixed(2)}x Payout)` : 'Invalid Odds'}
              </span>
            </div>

            {/* Hedge Bet Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-rose-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Hedge Bet (Side B)</label>
              <div className="flex items-center text-rose-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="0.50"
                  value={baseHedgeStr} 
                  onChange={handleHedgeChange}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Fixed Hedge</span>
            </div>

            {/* Main Bet Input */}
            <div className="flex flex-col rounded-md bg-gray-900 px-3 py-1.5 border border-gray-700 focus-within:border-emerald-500 transition-colors justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Main Bet (Side A)</label>
              <div className="flex items-center text-emerald-400 font-bold mt-0.5">
                <span className="mr-1 text-sm">$</span>
                <input 
                  type="number" 
                  step="0.10"
                  value={baseMainStr} 
                  onChange={handleMainChange}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none" 
                />
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Auto-Calculated</span>
            </div>

          </div>
        </div>

        {/* Navigation Tabs (All 7 Strategies) */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          {['martingale', 'dalembert', 'fibonacci', 'labouchere', '1326', 'oscars', 'kelly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab === 'martingale' && 'Capped Loop (Step-5)'}
              {tab === 'dalembert' && "D'Alembert (Linear)"}
              {tab === 'fibonacci' && 'Fibonacci (Parabolic)'}
              {tab === 'labouchere' && 'Labouchère (Split)'}
              {tab === '1326' && '1-3-2-6 (Momentum)'}
              {tab === 'oscars' && "Oscar's Grind (Flat)"}
              {tab === 'kelly' && 'Hedged Kelly (Edge)'}
            </button>
          ))}
        </div>

        {/* Active Strategy Data */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'martingale' && renderTable(strategies.martingale)}
          {activeTab === 'dalembert' && renderTable(strategies.dalembert)}
          {activeTab === 'fibonacci' && renderTable(strategies.fibonacci)}
          {activeTab === 'labouchere' && renderTable(strategies.labouchere)}
          {activeTab === '1326' && renderTable(strategies['1326'])}
          {activeTab === 'oscars' && renderTable(strategies.oscars)}
          {activeTab === 'kelly' && renderTable(strategies.kelly)}
        </div>
        
      </div>
    </div>
  );
};

export default Strategy;