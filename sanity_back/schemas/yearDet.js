export default {
  name: 'yearDet',
  title: 'Year Details',
  type: 'document',
  fields: [
    {
      name: 'sem',
      title: 'Sem',
      type: 'string',
      options: {
        list: [
          {
            title: 'Semester 1',
            value: 'Semester 1',
          },
          {
            title: 'Semester 2',
            value: 'Semester 2',
          },
          {
            title: 'Semester 3',
            value: 'Semester 3',
          },
          {
            title: 'Semester 4',
            value: 'Semester 4',
          },
          {
            title: 'Semester 5',
            value: 'Semester 5',
          },
          {
            title: 'Semester 6',
            value: 'Semester 6',
          },
          {
            title: 'Semester 7',
            value: 'Semester 7',
          },
          {
            title: 'Semester 8',
            value: 'Semester 8',
          },
        ],
      },
    },
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
    },

    {
      name: 'subject',
      title: 'Subject',
      type: 'array',
      of: [{ type: 'subjectDetails' }],
    },
  ],
};
