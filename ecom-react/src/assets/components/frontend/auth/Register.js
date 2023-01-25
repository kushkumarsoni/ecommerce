import React,{useState} from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

const Register = () =>{
	const history = useHistory();
	const [registerInput,setRegister] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		error_list: [],
	});

	const handleInput = (e) =>{
		e.persist();
		setRegister({...registerInput,[e.target.name]: e.target.value});
	}

	const registerSubmit = (e)=>{
		e.preventDefault();
		const data = {
			name: registerInput.name,
			email: registerInput.email,
			password: registerInput.password,
			password_confirmation: registerInput.password_confirmation,
		};

		axios.get('/sanctum/csrf-cookie').then(response => {
			axios.post('/api/register', data).then(res =>{
				if(res.data.status === 200)
				{
					localStorage.setItem('auth_token',res.data.token);
					localStorage.setItem('auth_name',res.data.username);
					swal("Success",res.data.message,"success");
					history.push("/");
				}
				else
				{
					setRegister({...registerInput, error_list:res.data.validator_errors
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
								<h4>Register</h4>
							</div>
							<div className="card-body">
								<form onSubmit={registerSubmit} >
									<div className="form-group mb-3">
										<label>Full Name</label>
										<input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" placeholder="Enter Full Name"/>
										<span className="text-danger">{registerInput.error_list.name}</span>
									</div>
									<div className="form-group mb-3">
										<label>Email</label>
										<input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Enter Email"/>
										<span className="text-danger">{registerInput.error_list.email}</span>
									</div>
									<div className="form-group mb-3">
										<label>Password</label>
										<input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" placeholder="Enter Password"/>
										<span className="text-danger">{registerInput.error_list.password}</span>
									</div>
									<div className="form-group mb-3">
										<label>Password</label>
										<input type="password" name="password_confirmation" onChange={handleInput} value={registerInput.password_confirmation} className="form-control" placeholder="Enter Confirm Password"/>
										<span className="text-danger">{registerInput.error_list.password_confirmation}</span>
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

export default Register;