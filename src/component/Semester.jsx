import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import { examQuery } from '../query';
const Semester = () => {
  const [semester, setSemester] = useState('');
  const [inputFields, setInputFields] = useState([
    {
      uniqueId: uuidv4(),
      subject: '',
      marks: '',
      _type: 'subjectDetails',
      _key: uuidv4(),
    },
  ]);

  const User =
    localStorage.getItem('user_sanity') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user_sanity'))
      : localStorage.clear();
  // console.log(User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate(`/login`, { replace: true });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   semester,
    //   inputFields,
    // };
    // console.log(data);

    const doc = {
      _type: 'yearDet',

      userId: User?._id,
      sem: semester,
      subject: [...inputFields],
    };
    // console.log(doc);
    client.create(doc).then((dat) => {
      navigate(`/dashboard/${User?._id}`, { replace: true });
    });
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.uniqueId) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.uniqueId === id),
      1
    );
    setInputFields(values);
  };
  const handleAddFields = (e) => {
    e.preventDefault();
    // console.log('hii');
    setInputFields([
      ...inputFields,
      {
        uniqueId: uuidv4(),
        subject: '',
        marks: '',
        _type: 'subjectDetails',
        _key: uuidv4(),
      },
    ]);
  };

  // useEffect(() => {
  //   getSem();
  // }, []);

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9 col-12 mx-auto mb-3">
              <br />
              <div className="card p-3">
                <h2 className="newtex">Upload Semester Marks</h2>
                <br />
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="sel1">Select Semester:</label>
                    <select
                      class="form-control"
                      name="semester"
                      id="sel1"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      required
                    >
                      <option hidden selected value="">
                        Choose One
                      </option>
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </select>
                  </div>
                  {inputFields.map((val) => (
                    <div key={val.id} className="subbox">
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <input
                            type="text"
                            class="form-control"
                            name="subject"
                            placeholder="Enter Subject"
                            value={val.subject}
                            onChange={(e) => handleChangeInput(val.uniqueId, e)}
                            required
                          />
                        </div>
                        <div class="form-group col-md-5">
                          <input
                            type="number"
                            class="form-control"
                            name="marks"
                            placeholder="Enter Marks"
                            value={val.marks}
                            onChange={(e) => handleChangeInput(val.uniqueId, e)}
                            required
                          />
                        </div>
                        <div class="form-group col-md-1 col-1">
                          <button
                            className={
                              inputFields.length === 1
                                ? 'dis box btn'
                                : 'box btn'
                            }
                            disabled={inputFields.length === 1}
                            onClick={() => handleRemoveFields(val.uniqueId)}
                          >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="btn btn-success mt-2"
                    onClick={(e) => handleAddFields(e)}
                  >
                    + Add
                  </button>

                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Semester;
