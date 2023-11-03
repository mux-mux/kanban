const columns = {
  todo: {
    items: [
      {
        name: 'Take a walk',
        add: '2024-09-18',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        break: false,
      },
      {
        name: 'Check emails',
        add: '2024-09-18',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        break: false,
      },
    ],
  },
  inprogress: {
    items: [
      {
        name: 'Plan a day',
        add: '2024-09-18',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        break: false,
      },
      {
        name: 'Listen to the music',
        add: '2024-09-18',
        deadline: '2024-09-19',
        pomodoro: false,
        sessions: 0,
        time: '',
        break: false,
      },
    ],
  },
  done: {
    items: [
      {
        name: 'Do workout',
        add: '2024-09-18',
        deadline: '2024-09-18',
        pomodoro: false,
        sessions: 1,
        time: '',
        done: '2024-09-19',
      },
      {
        name: 'Make a coffee',
        add: '2024-09-18',
        deadline: '2024-09-20',
        pomodoro: false,
        sessions: 5,
        time: '',
        done: '2024-09-19',
      },
    ],
  },
};

const columnNames = Object.keys(columns);

export { columns, columnNames };
