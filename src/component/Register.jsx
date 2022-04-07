import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { client } from '../client';
import bcrypt from 'bcryptjs';
import { userCheck } from '../query';
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  // console.log(bcrypt.compareSync('123', hash));
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  // navigate('/', { replace: true });
  const onSub = (e) => {
    e.preventDefault();
    setLoading(true);
    const dat = {
      _type: 'studentDetails',
      email,
      password: hash,
      name,
    };

    const quy = userCheck(email);
    if (password.length < 6) {
      setStatus(true);
      setMsg('Password should be atleast 6 digit');
    } else {
      client.fetch(quy).then((data) => {
        //   console.log(data);
        if (data.length > 0) {
          setStatus(true);
          setMsg('Email already present,Pls Login');
        } else {
          client.create(dat).then(() => {
            navigate('/login', { replace: true });
          });
        }
      });
    }

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
                      type="text"
                      placeholder="Enter Name"
                      class="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                      Register
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

export default Register;
