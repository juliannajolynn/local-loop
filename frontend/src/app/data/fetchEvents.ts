export async function fetchEvents(city: string) {
  const file = city === 'berkeley' ? '/berkactions.json' : '/oakactions.json';
  const res = await fetch(file);
  return await res.json();
}
