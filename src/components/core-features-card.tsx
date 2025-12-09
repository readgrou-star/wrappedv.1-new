"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCard {
  id: number;
  name: string;
  content: ReactNode;
}

interface CoreFeaturesCardProps {
  cards: FeatureCard[];
}

export default function CoreFeaturesCard({ cards: initialCards }: CoreFeaturesCardProps) {

  const [cards, setCards] = useState(initialCards);

  const moveToEnd = (index: number) => {
    setCards(prev => [...prev.slice(index + 1), ...prev.slice(0, index + 1)]);
  };

  const moveToFront = (index: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const [selectedCard] = newCards.splice(index, 1);
      return [selectedCard, ...newCards];
    });
  };

  const offset = 40;
  const scaleStep = 0.03;
  const spring = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 26
  };



  return (
    <div className="absolute left-16 top-1/2 -translate-y-[45%] z-10">
      <div className="relative w-[280px] h-[480px]">
        <ul className="relative w-full h-full m-0 p-0">
          {cards.map((card, i) => {
            const isFront = i === 0;
            const brightness = Math.max(0.9, 1 - i * 0.05);

            return (
              <motion.li
                key={card.id}
                className="absolute w-full list-none"
                style={{
                  cursor: isFront ? 'grab' : 'pointer',
                  touchAction: 'none'
                }}
                animate={{
                  top: `${i * -offset}px`,
                  scale: 1 - i * scaleStep,
                  filter: `brightness(${brightness})`,
                  zIndex: cards.length - i
                }}
                transition={spring}
                drag={isFront ? 'y' : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  if (info.offset.y < -50) {
                    moveToEnd(i);
                  }
                }}
                whileDrag={
                  isFront
                    ? {
                        zIndex: cards.length + 10,
                        cursor: 'grabbing',
                        scale: 1 - i * scaleStep + 0.02,
                        rotate: 2
                      }
                    : {}
                }
              >
                {/* Card dengan Header dan Body */}
                <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Card Header - Selalu Keliatan - Klik untuk bawa ke depan */}
                  <div
                    className={`w-full px-4 py-3 font-bold transition ${
                      isFront
                        ? "text-base text-slate-900 cursor-default"
                        : "text-sm text-slate-700 hover:text-slate-900 cursor-pointer hover:bg-slate-50"
                    }`}
                    onClick={() => !isFront && moveToFront(i)}
                  >
                    {card.name}
                  </div>

                  {/* Card Body - Semua card punya body dengan scroll */}
                  <div className="w-[280px] h-[420px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {isFront ? card.content : <div className="bg-slate-50 h-full" />}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
