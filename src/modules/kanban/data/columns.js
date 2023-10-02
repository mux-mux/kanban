const columns = {
  todo: {
    items: [
      { name: 'Plan a day', deadline: '2024-09-19', pomodoro: false, sessions: 0, time: '' },
      { name: 'Make a coffee', deadline: '2024-09-19', pomodoro: false, sessions: 0, time: '' },
    ],
  },
  inprogress: {
    items: [
      { name: 'Do workout', deadline: '2024-09-19', pomodoro: false, sessions: 0, time: '' },
      { name: 'Listen to music', deadline: '2024-09-19', pomodoro: false, sessions: 0, time: '' },
    ],
  },
  done: {
    items: [
      {
        name: 'Check LinkedIn messages',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        done: '2024-09-19',
      },
      {
        name: 'Check emails',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        done: '2024-09-19',
      },
    ],
  },
};

const columnNames = Object.keys(columns);

export { columns, columnNames };
