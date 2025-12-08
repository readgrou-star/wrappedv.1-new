

'use client';
import { LandingBlock } from '@/types';
import React from 'react';

// This is a simplified display-only version of the builder's inline text editor
const StaticText = ({
  value,
  className,
  tagName = 'div',
}: {
  value: string;
  className?: string;
  tagName: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) => {
  const Tag = tagName;
  return <Tag className={className}>{value}</Tag>;
};

interface LandingPageViewProps {
  blocks: LandingBlock[];
  formTitle: string;
}

export function LandingPageView({ blocks, formTitle }: LandingPageViewProps) {

  return (
    <div className="relative">
      
      <div className="pb-24 pt-4">
      {blocks.length === 0 ? (
          <div className="p-20 text-center text-slate-400">
              <h2 className="text-2xl font-bold mb-2">Welcome</h2>
              <p>Content will appear here.</p>
          </div>
      ) : blocks.map((block) => (
        <div
          key={block.id}
          className={`
              px-8 md:px-20 last:border-0
              ${block.style?.padding === 'sm' ? 'py-8' : block.style?.padding === 'lg' ? 'py-24' : 'py-16'}
              ${block.style?.backgroundColor === 'bg-white' ? 'bg-slate-50' : (block.style?.backgroundColor || 'bg-slate-50')}
              ${block.style?.textColor || 'text-slate-900'}
              ${block.style?.textAlign === 'center' ? 'text-center' : block.style?.textAlign === 'right' ? 'text-right' : 'text-left'}
          `}
        >
          {/* Block Content Renderers */}
          {block.type === 'hero' && (
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100/50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-200">
                Event Registration
              </span>
              <StaticText
                tagName="h1"
                value={block.title || 'Event'}
                className="text-5xl md:text-8xl font-black mb-8 stack-sans-headline leading-[0.9] tracking-tight"
              />
              <StaticText
                tagName="p"
                value={block.content || 'Desc'}
                className="text-xl md:text-2xl opacity-70 google-sans-flex max-w-2xl leading-relaxed mb-10 mx-auto font-medium"
              />
            </div>
          )}
          {block.type === 'text' && (
            <div className="max-w-3xl mx-auto">
              <StaticText
                tagName="h2"
                value={block.title || 'Title'}
                className="text-3xl md:text-4xl font-bold mb-6 stack-sans-headline"
              />
              <StaticText
                tagName="p"
                value={block.content || 'Content'}
                className="text-lg opacity-80 leading-relaxed google-sans-flex"
              />
            </div>
          )}
          {block.type === 'features' && (
            <div>
              <StaticText
                tagName="h2"
                value={block.title || 'Features'}
                className="text-3xl md:text-4xl font-bold mb-12 stack-sans-headline"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(block.items || []).map((item, i) => (
                  <div key={i} className="bg-white/50 p-8 rounded-2xl text-left shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-6 font-bold text-slate-400">
                      {i + 1}
                    </div>
                    <StaticText
                      tagName="h3"
                      value={item.title}
                      className="font-bold mb-3 text-xl text-slate-900 stack-sans-headline"
                    />
                    <StaticText
                      tagName="p"
                      value={item.desc}
                      className="text-slate-500 text-sm leading-relaxed google-sans-flex"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {block.type === 'speakers' && (
            <div>
              <StaticText
                tagName="h2"
                value={block.title || 'Speakers'}
                className="text-3xl md:text-4xl font-bold mb-12 stack-sans-headline"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="w-full aspect-square bg-slate-200 rounded-2xl mb-4 border border-slate-100"></div>
                    <h3 className="font-bold text-center">Speaker {i}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
