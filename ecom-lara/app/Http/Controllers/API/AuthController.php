<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|min:2|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8|confirmed',
            ]);
        if($validator->fails()){
            return response()->json([
                'status' =>400,
                'validator_errors' => $validator->messages(),
            ],);
        }
        else
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

             return response()->json([
                'status' =>200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'You have registerd successfully'
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|max:191',
            'password' => 'required|min:8',
            ]);

        if($validator->fails()){
            return response()->json([
                'status' =>400,
                'validator_errors' => $validator->messages(),
            ]);
        }
        else
        {
            $user = User::where('email',$request->email)->first();
            if(!$user || ! Hash::check($request->password, $user->password))
            {   
                return response()->json([
                    'status' =>401,
                    'message' => 'Invalid Credentials',
                ]);
            }
            else
            {
                if($user->role_as == 1) { //1->admin
                    $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                }else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken; 
                }
               

                return response()->json([
                    'status' =>200,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Logged in successfully'
                ]);
            }
        }
    }
    
    public function logout(Request $request)
    {
        try
        {
            auth()->user()->tokens()->delete();
            return response()->json([
                'status' =>200,
                'message' => 'Logged out successfully'
            ]); 
        }
        catch(\Exception $e)
        {
           return response()->json([
                'status' =>500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
