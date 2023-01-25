import React,{useState} from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

const Login = () =>{
	const history = useHistory();
	const [loginInput,setLogin] = useState({
		email: '',
		password: '',
		error_list: [],
	});

	const handleInput = (e) =>{
		e.persist();
		setLogin({...loginInput,[e.target.name]: e.target.value});
	}

	const loginSubmit = (e)=>{
		e.preventDefault();
		const data = {
			email: loginInput.email,
			password: loginInput.password,
		};

		axios.get('/sanctum/csrf-cookie').then(response => {
			axios.post('/api/login', data).then(res =>{
				if(res.data.status == 200)
				{
					localStorage.setItem('auth_token',res.data.token);
					localStorage.setItem('auth_name',res.data.username);
					swal("Success",res.data.message,"success");
					history.push("/");
				}
				else if(res.data.status === 401)
				{
					swal("Warning",res.data.message,"warning");
				}
				else
				{
					setLogin({...loginInput, error_list:res.data.validator_errors
					});
				}
			})

		});
	}

	return (
		<div>
			<Navbar />
			<div className="container py-5">
				<div className="row">
					<div className="col-md-4 col-sm-12">
						<img className="rounded float-start h-78 mw-65" src="https://image.shutterstock.com/image-vector/isometric-artwork-concept-online-registration-600w-1319771138.jpg"/>
					</div>
					<div className="col-md-3 col-sm-12"></div>
					<div className="col-md-5 col-sm-12">
						<div className="card">
							<div className="card-header">
								<h4>Login</h4>
							</div>
							<div className="card-body">
								<form onSubmit={loginSubmit}>
									<div className="form-group mb-3">
										<label>Email</label>
										<input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" placeholder="Enter Email"/>
										<span className="text-danger">{loginInput.error_list.email}</span>
									</div>
									<div className="form-group mb-3">
										<label>Password</label>
										<input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" placeholder="Enter Password"/>
										<span className="text-danger">{loginInput.error_list.password}</span>
									</div>
									<div className="form-group mb-3">
										<button type="submit" className="btn btn-primary">Save</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;