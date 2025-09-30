export function cleanWords(input: string): string {
  return (
    input
      // Replace punctuation/symbols with space
      .replace(/[!.,?:;'"()\[\]{}<>_\-*/\\|@#$%^&=+`~]/g, " ")
      // Collapse multiple spaces
      .replace(/\s+/g, " ")
      // Trim leading/trailing spaces
      .trim()
  );
}
