export default function getActualDate(): string {
    const date = new Date(Date.now() - 604800000);
    return date.toISOString();
}