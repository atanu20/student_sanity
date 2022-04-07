export default {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User Id',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'time',
      title: 'Time',
      type: 'date',
    },
  ],
};
