const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckEmailPattern(pattern: string) {
  return emailPattern.test(pattern);
}
