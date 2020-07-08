export const calc = (start, charCount, words) => {
  const finish = Date.now();
  const elapsed = (finish - start) / 1000 / 60;

  const errors = words.length - words.filter((word) => word.correct).length;

  // ( all typed / 5 - incorrect ) / time (min)
  const wpm = (charCount / 5 - errors) / elapsed;
  const acc = errors / wordCount;

  return { wpm, acc };
};
