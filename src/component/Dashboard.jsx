import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Semester from './Semester';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../client';
import { examQuery, userQuery } from '../query';

const Dashboard = () => {
  const [status, setStatus] = useState(false);
  const [marksitem, setMarksItem] = useState([]);

  const [msg, setMsg] = useState('');
  const User =
    localStorage.getItem('user_sanity') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user_sanity'))
      : localStorage.clear();

  useEffect(() => {
    if (!User) {
      neg('/login', { replace: true });
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const [cname, setCName] = useState();
  const [phone, setPhone] = useState('');
  const neg = useNavigate();
  const [imageAsset, setImageAsset] = useState('');
  const [avatar, setAvatar] = useState('');

  // console.log(User);

  // const [inputFields, setInputFields] = useState([
  //   { id: uuidv4(), firstName: '', lastName: '' },
  // ]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('InputFields', inputFields);
  // };

  // const handleChangeInput = (id, event) => {
  //   const newInputFields = inputFields.map((i) => {
  //     if (id === i.id) {
  //       i[event.target.name] = event.target.value;
  //     }
  //     return i;
  //   });

  //   setInputFields(newInputFields);
  // };

  // const handleAddFields = () => {
  //   setInputFields([
  //     ...inputFields,
  //     { id: uuidv4(), firstName: '', lastName: '' },
  //   ]);
  // };

  const handelImg = async (e) => {
    const { files } = e.target;
    const selectedFile = e.target.files[0];
    if (files.length > 0) {
      if (
        selectedFile.type === 'image/png' ||
        selectedFile.type === 'image/svg' ||
        selectedFile.type === 'image/jpeg' ||
        selectedFile.type === 'image/gif' ||
        selectedFile.type === 'image/tiff'
      ) {
        if (files[0].size > 1024 * 1024 * 1024) {
          setStatus(true);
          setMsg('File Size is Too Large');
        } else {
          setLoading(true);
          client.assets
            .upload('image', selectedFile, {
              contentType: selectedFile.type,
              filename: selectedFile.name,
            })
            .then((document) => {
              setImageAsset(document);
              setAvatar(document.url);
              // console.log(document);
              setLoading(false);
            })
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        }
      } else {
        setStatus(true);
        setMsg('Only PNG, JPEG, JPG,svg,gif,tiff');
      }
    }
  };

  const getSem = async () => {
    const quy = examQuery(User?._id);
    client.fetch(quy).then((data) => {
      console.log(data);
      setMarksItem(data);
      // if (data.length > 0) {
      //   setPhone(data[0].phone);
      //   setCName(data[0].collage);
      //   setAvatar(urlFor(data[0].image.asset));
      // }
    });
  };

  useEffect(() => {
    const quy = userQuery(User?._id);
    client.fetch(quy).then((data) => {
      // console.log(data);
      if (data.length > 0) {
        setPhone(data[0].phone);
        setCName(data[0].collage);
        setAvatar(urlFor(data[0].image.asset));
      }
    });

    getSem();
  }, []);

  const onSub = async (e) => {
    setLoading(true);
    e.preventDefault();
    client
      .patch(User?._id)
      .set({
        collage: cname,
        phone,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
      })
      .commit()
      .then((dat) => {
        //
        // setLoading(false);
        // alert('Update Done');
        // window.location.reload();
        setStatus(true);
        setMsg('Your profile will update within few minutes');
        setPhone(dat[0].phone);
        setCName(dat[0].collage);
        setAvatar(urlFor(dat[0].image.asset));
        // console.log('hii');
        // console.log(dat);
        // setSavingPost(false);
      });
    setLoading(false);
  };

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9 col-12 mx-auto mb-3">
              <div className="card p-2">
                {status ? (
                  <>
                    <div class="alert alert-warning alert-dismissible">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12 mx-auto mb-2">
                    <div className="imgbox">
                      <div className="imgboxinr ">
                        {loading ? (
                          <div className="text-center p-2">
                            <CircularProgress size={35} />
                          </div>
                        ) : (
                          <>
                            <img
                              src={
                                avatar
                                  ? avatar
                                  : 'https://res.cloudinary.com/pigeon/image/upload/v1636969376/company-nologo_afvvvp.png'
                              }
                              alt="logo"
                              className="postim"
                            />
                          </>
                        )}
                      </div>
                      <div className="text-center mt-3">
                        <label htmlFor="file">
                          <p className="textb">Upload Logo</p>
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="file"
                            onChange={handelImg}
                            accept=".png,.jpeg,.jpg"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-12 mx-auto mb-2">
                    <form onSubmit={onSub} className="p-3">
                      <div class="form-group">
                        <input
                          type="text"
                          placeholder="Enter Collage Name"
                          class="form-control"
                          name="collage"
                          value={cname}
                          onChange={(e) => setCName(e.target.value)}
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="tel"
                          placeholder="Enter Phone"
                          class="form-control"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={loading}
                        >
                          Update Profile
                        </button>
                      </div>
                      {loading && (
                        <div className="text-center p-2">
                          <CircularProgress size={55} />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="card p-3">
                <div className="text-left">
                  <NavLink
                    to="/dashboard/upload_marks"
                    className="btn btn-success"
                  >
                    Upload Marks
                  </NavLink>
                  <NavLink
                    to="/dashboard/note"
                    className="btn btn-success ml-2"
                  >
                    Note
                  </NavLink>
                </div>

                <div className="p-2">
                  {marksitem?.map((mak) => (
                    <>
                      <h5 className="mt-4">{mak.sem}</h5>

                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Subject</th>

                            <th>Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mak.subject?.map((vl) => (
                            <>
                              <tr>
                                <td>{vl.subject}</td>

                                <td>{vl.marks}</td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
