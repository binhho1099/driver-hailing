export const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const STATUS_COLOR = {
  pending: 'yellow',
  in_progress: 'blue',
  completed: 'green',
  canceled: 'red',
};

export const STATUS_TEXT = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  canceled: 'Canceled',
};
