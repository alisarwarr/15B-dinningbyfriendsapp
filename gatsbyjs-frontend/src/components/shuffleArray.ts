export default function shuffleArray(arr: any) {
    return arr?.sort(() => Math.random() - 0.5);
}