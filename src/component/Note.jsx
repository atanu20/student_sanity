import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { noteQuery } from '../query';

const Note = () => {
  const User =
    localStorage.getItem('user_sanity') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user_sanity'))
      : localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate(`/login`, { replace: true });
    }
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const getNote = async () => {
    const quy = noteQuery(User?._id);
    client.fetch(quy).then((data) => {
      setNotes(data);
      // console.log(data);
    });
  };

  const onSub = async (e) => {
    setLoading(true);
    e.preventDefault();
    var today = new Date();
    var mo = today.getMonth() + 1;
    var da = today.getDate();
    if (mo < 10) {
      mo = '0' + mo;
    }
    if (da < 10) {
      da = '0' + da;
    }
    var date = today.getFullYear() + '-' + mo + '-' + da;
    const data = {
      _type: 'note',
      title,
      description,
      userId: User?._id,
      time: date,
    };

    client.create(data).then((dat) => {
      //   console.log(dat);
      //   getNote();

      setNotes([dat, ...notes]);

      setLoading(false);
      setDescription('');
      setTitle('');
    });
  };

  useEffect(() => {
    getNote();
  }, []);
  const deleteNote = async (id) => {
    client.delete(id).then(() => {
      //   window.location.reload();
      const not = notes?.filter((val) => val._id != id);
      setNotes(not);
    });
  };
  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12  mb-3">
              <div className="card p-2">
                <h5 className="text-center newtex">Upload Note</h5>
                <form onSubmit={onSub}>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      class="form-control"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Enter Description"
                      class="form-control"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn btn-success' : 'btn btn-success'
                      }
                      disabled={loading}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {notes?.map((val) => (
              <>
                <div className="col-lg-4 col-md-6 col-12  mb-3" key={val._id}>
                  <div className="card p-2">
                    <h5 className=" newtex">{val.title}</h5>
                    <p>{val.description}</p>
                    <div className="text-right">
                      <span>{new Date().toDateString(val.__createdAt)}</span>
                    </div>
                    <div className="text-right">
                      <button
                        className="box btn"
                        onClick={() => deleteNote(val._id)}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
