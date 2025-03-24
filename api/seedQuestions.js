import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const initialGameQuestions = [
    {
      question: "რა არის ეს სანთელი?",
      answer: "კალია/Dragonfly Doji",
      options: ["გრძელფეხა დოჯი", "სასიკვდილო დოჯი", "კალია/Dragonfly Doji"],
      image: "https://ta3bviqjtxy1kv7x.public.blob.vercel-storage.com/dragonfly-JW0AaWUPsWHwspdhPaFoKu6yzvH7qg.JPG",
      description: "დოჯის იშვიათი სტრუქტურა, ხშირად კალიას უწოდებენ, მისი სტრუქტურიდან გამომდინარე."
    },
    // Add more...
  ];
  const initialLearnQuestions = [
    {
      question: "რას ნიშნავს კალია/Dragonfly Doji?",
      image: "https://lqy3lriiybxcejon.public.blob.vercel-storage.com/BlYgTSuLAG9w/bb1-DKDv7KiUtOSstb5xsFG2mvRcqkWiNA.jpeg?aRUv",
      description: "ეს არის დოჯის ტიპი, რომელიც მიუთითებს პოტენციურ აღმავალ ტრენდზე."
    },
    // Add more...
  ];

  try {
    await kv.set('gameQuestions', initialGameQuestions);
    await kv.set('learnQuestions', initialLearnQuestions);
    res.status(200).json({ message: 'Questions seeded successfully' });
  } catch (error) {
    console.error('Error seeding questions:', error);
    res.status(500).json({ error: 'Failed to seed questions' });
  }
}