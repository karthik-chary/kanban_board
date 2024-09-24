export const fetchTickets = async () => {
  const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
  if (!response.ok) {
    throw new Error("Failed to fetch tickets.");
  }
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }
  const data = await response.json();
  // Assuming that users come as part of the API response
  return data.users;
};
