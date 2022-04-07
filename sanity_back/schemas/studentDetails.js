export default {
  name: 'studentDetails',
  title: 'Student Details',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'collage',
      title: 'Collage',
      type: 'string',
    },
  ],
};
