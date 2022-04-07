export const userQuery = (userId) => {
  const query = `*[_type == "studentDetails" && _id == '${userId}']`;
  return query;
};

export const userCheck = (userEmail) => {
  const query = `*[_type == "studentDetails" && email == '${userEmail}']`;
  return query;
};

export const noteQuery = (userId) => {
  const query = `*[_type == "note" && userId == '${userId}'] | order(_createdAt desc)`;
  return query;
};

export const examQuery = (userId) => {
  const query = `*[_type == "yearDet" && userId=='${userId}'] | order(_createdAt desc)`;
  return query;
};
