import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

function HouseBingo() {
  const defaultSituations = [
    "House pops a Vicodin",
    "House insults a colleague",
    "House sexually harasses Cuddy",
    "Patient gets worse when doctors arrive",
    "Patient has a seizure out of nowhere",
    "An MRI reveals something unexpected",
    "House uses an unconventional treatment",
    "Wilson tries to reason with House",
    "Foreman complains about House’s methods",
    "Chase flirts with a nurse",
    "Teenager patient with a rare disease",
    "Cameron stands up to House",
    "House has a sarcastic remark",
    "House's team breaks into a patient's home",
    "Patient has an allergic reaction",
    "Symptoms suddenly disappear then return worse",
    "House uses a whiteboard to map out ideas",
    "A patient's spouse tries to hide information",
    "The team tests for Lupus (it's never Lupus!)",
    "Patient lies about their history",
    "House blackmails someone for a test or a favor",
    "Extended differential diagnosis conversation",
    "Patient has a psychological meltdown",
    "Someone mentions House is a genius",
    "House eavesdrops or spies on someone",
    "The patient defies doctor's orders",
    "A security guard or policeman is involved",
    "A compromise has to be made with the hospital budget",
    "Cuddy keeps reminding House about clinic hours",
    "Someone references House’s cane",
    "Wilson tries to lighten the mood",
    "House tests a hypothesis without waiting for approval",
    "An intense final revelation saves the patient's life",
    "Someone from the team gets emotional and storms out",
    "House is told to follow protocol but ignores it",
    "Blood test reveals a contradiction",
    "The team tries but fails to outrule an odd symptom",
    "House makes a bet about the diagnosis",
    "Patient’s family drama complicates things",
    "A mega-dramatic code blue occurs",
    "Patient conceals drug use or an affair",
    "Mysterious rash or swelling appears",
    "House manipulates a colleague into doing something",
    "The patient collapses unexpectedly",
    "A last-minute test reveals the real cause",
    "Chase’s accent is noticed or teased",
    "House breaks hospital policy",
    "A random idea from a side comment cracks the case",
    "House uses another doctor’s ID or credentials",
    "Someone references money problems or lawsuits",
    "House humiliates someone publicly"
  ];

  const [situations, setSituations] = useState(defaultSituations);
  const [board, setBoard] = useState([]);
  const [hasBingo, setHasBingo] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateBoard = (allSituations) => {
    const shuffled = [...allSituations].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 24);
    const newBoard = [];
    let i = 0;
    for (let cellIndex = 0; cellIndex < 25; cellIndex++) {
      if (cellIndex === 12) {
        newBoard.push({
          id: cellIndex,
          text: "FREE",
          marked: true,
        });
      } else {
        newBoard.push({
          id: cellIndex,
          text: selected[i],
          marked: false,
        });
        i++;
      }
    }
    return newBoard;
  };

  useEffect(() => {
    setBoard(generateBoard(situations));
  }, []);
  const checkBingo = (b) => {
    const matrix = [];
    for (let r = 0; r < 5; r++) {
      matrix[r] = b.slice(r * 5, r * 5 + 5);
    }

    for (let r = 0; r < 5; r++) {
      if (matrix[r].every((cell) => cell.marked)) {
        return true;
      }
    }

    for (let c = 0; c < 5; c++) {
      let columnAllMarked = true;
      for (let r = 0; r < 5; r++) {
        if (!matrix[r][c].marked) {
          columnAllMarked = false;
          break;
        }
      }
      if (columnAllMarked) {
        return true;
      }
    }

    let diag1 = true;
    for (let i = 0; i < 5; i++) {
      if (!matrix[i][i].marked) {
        diag1 = false;
        break;
      }
    }
    if (diag1) return true;

    let diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!matrix[i][4 - i].marked) {
        diag2 = false;
        break;
      }
    }
    if (diag2) return true;

    return false;
  };

  const handleCellClick = (id) => {
    if (hasBingo) return;

    const updatedBoard = board.map((cell) => {
      if (cell.id === id && cell.text !== "FREE") {
        return { ...cell, marked: !cell.marked };
      }
      return cell;
    });

    setBoard(updatedBoard);

    const gotBingo = checkBingo(updatedBoard);
    setHasBingo(gotBingo);
  };

  const handleReset = () => {
    const newBoard = generateBoard(situations);
    setBoard(newBoard);
    setHasBingo(false);
  };

  const [newSituation, setNewSituation] = useState("");
  const handleAddSituation = () => {
    if (newSituation.trim() === "") return;
    setSituations((prev) => [...prev, newSituation.trim()]);
    setNewSituation("");
  };

  const handleRemoveSituation = (item) => {
    setSituations((prev) => prev.filter((sit) => sit !== item));
  };

  const Confetti = () => {
    const confettiPieces = Array.from({ length: 30 }, (_, idx) => idx);
    return (
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {confettiPieces.map((piece) => {
            const randomX = Math.random() * 100; // 0 to 100vw
            const randomDelay = Math.random();   // 0 to 1
            const size = Math.random() < 0.5 ? 2 : 3; // a small or bigger piece

            return (
              <motion.div
                key={piece}
                initial={{ y: -10, x: `${randomX}vw`, opacity: 1 }}
                animate={{
                  y: "110vh",
                  x: `${randomX + (Math.random() * 10 - 5)}vw`,
                  rotate: 360 * Math.random(),
                  opacity: 1,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: randomDelay,
                  ease: "easeInOut"
                }}
                exit={{ opacity: 0 }}
                className={`absolute top-0 left-0 bg-pink-500 rounded-${Math.random() < 0.5 ? 'full' : 'sm'} 
                  w-${size} h-${size}`}
              />
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-yellow-100 p-4 flex flex-col">
      {hasBingo && (
        <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true}
            numberOfPieces={200}
            gravity={0.3}
        />
        )}

      <h1 className="text-3xl font-bold mb-4 text-center">House MD Bingo</h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        <div className="mx-auto">
          <div className="grid grid-cols-5 grid-rows-5 gap-1">
            {board.map((cell) => (
              <div
                key={cell.id}
                onClick={() => handleCellClick(cell.id)}
                className={`relative flex items-center justify-center 
                  cursor-pointer border border-yellow-500 p-4 text-center 
                  transition-colors duration-200 
                  hover:bg-yellow-700
                  ${
                    cell.marked
                      ? 'bg-yellow-800 line-through text-gray-300'
                      : 'bg-yellow-600'
                  }`}
                style={{ minWidth: '60px', minHeight: '60px' }}
              >
                <span>{cell.text}</span>
                {cell.marked && (
                  <span
                    className="absolute text-4xl font-extrabold text-red-600"
                    style={{ transform: 'rotate(-20deg)' }}
                  >
                    X
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-yellow-700 hover:bg-yellow-800 px-4 py-2 rounded text-yellow-50 font-semibold"
            onClick={handleReset}
          >
            Reset & Shuffle Board
          </button>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <h2 className="text-xl font-bold mb-2">Manage Situations</h2>
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 px-2 py-1 rounded bg-neutral-800 text-yellow-50 placeholder-gray-400"
              type="text"
              placeholder="New situation..."
              value={newSituation}
              onChange={(e) => setNewSituation(e.target.value)}
            />
            <button
              className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-white font-semibold"
              onClick={handleAddSituation}
            >
              Add
            </button>
          </div>

          <ul className="max-h-72 overflow-auto bg-neutral-800 p-2 rounded">
            {situations.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm border-b border-neutral-600 py-1"
              >
                <span>{item}</span>
                <button
                  className="text-red-400 hover:text-red-600 text-xs ml-2"
                  onClick={() => handleRemoveSituation(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HouseBingo;