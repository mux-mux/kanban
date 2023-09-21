const columns = {
  todo: {
    items: [
      { name: 'Plan a day', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
      { name: 'Make a coffee', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
    ],
  },
  inprogress: {
    items: [
      { name: 'Do workout', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
      { name: 'Listen to music', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
    ],
  },
  done: {
    items: [
      { name: 'Check LinkedIn messages', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
      { name: 'Check emails', deadline: '2024-09-19', pomodoro: false, sessions: 0 },
    ],
  },
};

const columnNames = Object.keys(columns);

export { columns, columnNames };
