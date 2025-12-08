import type { StoryConfig, LandingConfig } from '@/types';

export const DEFAULT_STORY_CONFIG: StoryConfig = {
  backgroundColor: '#6366F1',
  elements: [
    {
      id: 'element-1',
      type: 'text',
      content: 'Thanks for registering,',
      x: 50,
      y: 30,
      style: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
    {
      id: 'element-2',
      type: 'text',
      content: '{Full Name}',
      isDynamic: true,
      x: 50,
      y: 40,
      style: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
    {
      id: 'element-3',
      type: 'text',
      content: 'for the event!',
      x: 50,
      y: 50,
      style: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'normal',
        textAlign: 'center',
      },
    },
  ],
};

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  blocks: [],
  formStyle: {
    shadow: 'xl',
    borderRadius: 'xl',
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  }
};
