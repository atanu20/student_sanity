import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { client } from '../client';
import bcrypt from 'bcryptjs';
import { userCheck } from '../query';
const Login = () => {
  const navigate = useNavigate();
  const User =
    localStorage.getItem('user_sanity') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user_sanity'))
      : localStorage.clear();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  // console.log(bcrypt.compareSync('123', hash));
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (User) {
      navigate(`/dashboard/${User._id}`, { replace: true });
    }
  }, []);
  // navigate('/', { replace: true });
  const onSub = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      _type: 'studentDetails',
      email,
      password: hash,
    };

    const quy = userCheck(email);

    client.fetch(quy).then((data) => {
      if (data.length > 0) {
        if (bcrypt.compareSync(password, data[0].password)) {
          // const save={

          // }
          // localStorage.setItem('user', JSON.stringify(response.profileObj));
          const save = {
            email: data[0].email,
            name: data[0].name,
            _createdAt: data[0]._createdAt,
            _id: data[0]._id,
            _rev: data[0]._rev,
            _type: data[0]._type,
            _updatedAt: data[0]._updatedAt,
          };

          localStorage.setItem('user_sanity', JSON.stringify(save));
          // window.location.reload();
          navigate(`/dashboard/${data[0]._id}`, { replace: true });
          window.location.reload();
        } else {
          setStatus(true);
          setMsg('Password Wrong');
        }
      } else {
        setStatus(true);
        setMsg('Email Not present');
      }
    });

    // console.log(data);
    setLoading(false);
  };
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 mx-auto mb-3">
              <div className="card p-3">
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
                <h3 className="text-center newtex pb-3">Student Box</h3>
                <br />
                <form onSubmit={onSub} className="">
                  <div class="form-group">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      class="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      class="form-control"
                      name="lname"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      Login
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
            <div className="col-md-6 mx-auto mb-3">
              <img src="../login.png" alt="" className="loginimg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
