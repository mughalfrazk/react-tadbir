const alice = {
  name: 'Alicia James',
  image: 'https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg'
}

const john = {
  name: 'John Doe',
  image:
    'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
}

const tags = {
  frontend: {
    name: 'Frontend',
    color: '#2196f3'
  },
  backend: {
    name: 'Backend',
    color: '#f44336'
  },
  job: {
    name: 'Job',
    color: '#7986cb'
  },
  notification: {
    name: 'Notification',
    color: '#009688'
  },
  auth: {
    name: 'Auth',
    color: '#43a047'
  },
  user: {
    name: 'User',
    color: '#c2185b'
  },
  invoice: {
    name: 'Invoice',
    color: '#ff6f00'
  }
}

export const sampleBoard = [
  {
    id: '1',
    column_name: 'Backlog',
    color: '#33691e',
    tasks: [
      {
        id: '2',
        title: 'Supplier should be added while creating purchases',
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description:
          'Added while creating purchases, Supplier should be added while creating purchases',
        tags: [tags.backend, tags.frontend],
        priority: false,
        assingee: [john, alice]
      },
      {
        id: '3',
        title: 'When job status is changed to delivered invoice should be automatically opened',
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description:
          'Changed to delivered invoice should be automatically opened. When job status is changed to delivered invoice should be automatically opened',
        tags: [tags.frontend, tags.invoice],
        priority: true,
        assingee: [alice]
      }
    ]
  },
  {
    id: '4',
    column_name: 'In Progress',
    color: '#33691e',
    tasks: [
      {
        id: '5',
        title:
          'When anyone adds a comment into a job, all the users associated with that job should get a notification.',
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.notification, tags.frontend],
        priority: false,
        assingee: [alice]
      },
      {
        id: '6',
        title: "'Open User' should be 'Open Invoice' for purchases in expense table.",
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.frontend],
        priority: true,
        assingee: [alice]
      },
      {
        id: '7',
        title: "Job status should be updated to 'In Progress' when assigned to other staff",
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.backend, tags.job],
        priority: false,
        assingee: [john]
      },
      {
        id: '11',
        title: "Job status should be updated to 'In Progress' when assigned to other staff",
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.backend, tags.job],
        priority: false,
        assingee: [john]
      },
      {
        id: '12',
        title: "Job status should be updated to 'In Progress' when assigned to other staff",
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.backend, tags.job],
        priority: false,
        assingee: [john]
      }
    ]
  },
  {
    id: '8',
    column_name: 'Deployed to Dev Environment',
    color: '#33691e',
    tasks: [
      {
        id: '9',
        title: 'Staff should not be able to see invoice tab',
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.auth, tags.backend],
        priority: true,
        assingee: [john]
      },
      {
        id: '10',
        title: 'User editing and saving for email and password is not working.',
        start_date: '2025-03-01T22:53:25.069Z',
        end_date: '2025-03-01T22:53:25.069Z',
        description: '',
        tags: [tags.auth, tags.frontend, tags.backend],
        priority: true,
        assingee: [alice, john]
      }
    ]
  }
]

export type ColumnType = (typeof board)[0]
export type TaskType = {
  id: string
  title: string
  start_date: string
  end_date: string
  description: string
  tags: (typeof tags.frontend)[]
  priority: boolean
  assingee: (typeof john)[]
}

export const board = [
  {
    id: '80e1d6e2-1cdd-4f59-9746-4fd048f59de1',
    name: 'Backlog',
    sort: 0,
    project_id: 8,
    created_at: '2025-05-23T23:12:29.438874+00:00',
    tasks: [
      {
        id: 'e9c1a977-b694-4fa9-989b-3eabea60ef8d',
        title: 'Authentication',
        description: null,
        start_date: null,
        end_date: null,
        priority: false,
        created_at: '2025-05-23T23:12:48.635467+00:00'
      }
    ]
  },
  {
    id: 'cb8cb871-85b8-42f1-9add-24017e0c1b85',
    name: 'In Progress',
    sort: 1,
    project_id: 8,
    created_at: '2025-05-23T23:12:41.015117+00:00',
    tasks: []
  }
]
